/*-----------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the EPL v2.0 License. See LICENSE file in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerExplorer = void 0;
const vscode_1 = require("vscode");
const extension_1 = require("./extension");
const rsp_client_1 = require("rsp-client");
const serverEditorAdapter_1 = require("./serverEditorAdapter");
const utils_1 = require("./utils/utils");
const telemetry_1 = require("./telemetry");
const vscode_wizard_1 = require("@redhat-developer/vscode-wizard");
var deploymentStatus;
(function (deploymentStatus) {
    deploymentStatus["file"] = "File";
    deploymentStatus["exploded"] = "Exploded";
})(deploymentStatus || (deploymentStatus = {}));
class ServerExplorer {
    constructor() {
        this._onDidChangeTreeData = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.serverOutputChannels = new Map();
        this.runStateEnum = new Map();
        this.publishStateEnum = new Map();
        this.serverAttributes = new Map();
        this.RSPServersStatus = new Map();
        this.viewer = vscode_1.window.createTreeView('servers', { treeDataProvider: this });
        this.viewer.onDidChangeVisibility(this.changeViewer, this);
        this.runStateEnum
            .set(0, 'Unknown')
            .set(1, 'Starting')
            .set(2, 'Started')
            .set(3, 'Stopping')
            .set(4, 'Stopped');
        this.publishStateEnum
            .set(1, 'Synchronized')
            .set(2, 'Publish Required')
            .set(3, 'Full Publish Required')
            .set(4, '+ Publish Required')
            .set(5, '- Publish Required')
            .set(6, 'Unknown');
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ServerExplorer();
        }
        return this.instance;
    }
    initRSPNode(rspId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClientByRSP(rspId);
            if (client) {
                const servers = yield client.getOutgoingHandler().getServerHandles();
                for (const serverHandle of servers) {
                    const state = yield client.getOutgoingHandler().getServerState(serverHandle);
                    const serverNode = this.convertToServerStateNode(rspId, state);
                    this.RSPServersStatus.get(rspId).state.serverStates.push(serverNode);
                }
            }
            this.refresh(this.RSPServersStatus.get(rspId).state);
        });
    }
    insertServer(rspId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClientByRSP(rspId);
            if (client) {
                const state = yield client.getOutgoingHandler().getServerState(event);
                const serverNode = this.convertToServerStateNode(rspId, state);
                if (serverNode) {
                    this.RSPServersStatus.get(rspId).state.serverStates.push(serverNode);
                    this.refresh(this.RSPServersStatus.get(rspId).state);
                    this.selectNode(Object.assign({ rsp: rspId }, state));
                }
            }
        });
    }
    updateRSPServer(rspId, state) {
        this.RSPServersStatus.get(rspId).state.state = state;
        this.refresh(this.RSPServersStatus.get(rspId).state);
    }
    updateServer(rspId, event) {
        const indexServer = this.RSPServersStatus.get(rspId).state.serverStates.
            findIndex(state => state.server.id === event.server.id);
        const serverToUpdate = this.RSPServersStatus.get(rspId).state.serverStates[indexServer];
        // update serverToUpdate based on event
        Object.keys(event).forEach(key => {
            if (key in serverToUpdate || key === 'runMode') {
                serverToUpdate[key] = event[key];
            }
        });
        serverToUpdate.deployableStates = this.convertToDeployableStateNodes(rspId, event.deployableStates);
        this.RSPServersStatus.get(rspId).state.serverStates[indexServer] = serverToUpdate;
        this.refresh(serverToUpdate);
        const channel = this.serverOutputChannels.get(event.server.id);
        if (event.state === rsp_client_1.ServerState.STARTING && channel) {
            channel.clear();
        }
    }
    convertToServerStateNode(rspId, state) {
        if (state) {
            const deployableNodes = this.convertToDeployableStateNodes(rspId, state.deployableStates);
            return Object.assign(Object.assign({}, state), { rsp: rspId, deployableStates: deployableNodes });
        }
        return undefined;
    }
    convertToDeployableStateNodes(rspId, states) {
        const deployableNodes = [];
        if (states && states.length > 0) {
            for (const deployable of states) {
                const deployableNode = Object.assign({ rsp: rspId }, deployable);
                deployableNodes.push(deployableNode);
            }
        }
        return deployableNodes;
    }
    removeServer(rspId, handle) {
        this.RSPServersStatus.get(rspId).state.serverStates = this.RSPServersStatus.get(rspId).state.serverStates.
            filter(state => state.server.id !== handle.id);
        this.refresh(this.RSPServersStatus.get(rspId).state);
        const channel = this.serverOutputChannels.get(handle.id);
        this.serverOutputChannels.delete(handle.id);
        if (channel) {
            channel.clear();
            channel.dispose();
        }
    }
    addServerOutput(output) {
        let channel = this.serverOutputChannels.get(output.server.id);
        if (channel === undefined) {
            channel = vscode_1.window.createOutputChannel(`Server: ${output.server.id}`);
            this.serverOutputChannels.set(output.server.id, channel);
        }
        channel.append(output.text);
        if (vscode_1.workspace.getConfiguration('vscodeAdapters').get('showChannelOnServerOutput')) {
            channel.show();
        }
    }
    showOutput(state) {
        const channel = this.serverOutputChannels.get(state.server.id);
        if (channel && vscode_1.workspace.getConfiguration('vscodeAdapters').get('showChannelOnServerOutput')) {
            channel.show();
        }
    }
    refresh(data) {
        this._onDidChangeTreeData.fire(data);
        if (data !== undefined && this.isServerElement(data)) {
            this.selectNode(data);
        }
    }
    selectNode(data) {
        this.nodeSelected = data;
        const tmpViewer = this.viewer;
        tmpViewer.reveal(data, { focus: true, select: true });
    }
    changeViewer(_e) {
        if (!this.viewer.visible) {
            return;
        }
        const tmpViewer = this.viewer;
        if (this.nodeSelected) {
            tmpViewer.reveal(this.nodeSelected, { focus: true, select: true });
        }
    }
    selectAndAddDeployment(state) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createOpenDialogOptions()
                .then(options => options && vscode_1.window.showOpenDialog(options))
                .then((file) => __awaiter(this, void 0, void 0, function* () { return this.addDeployment(file, state); }));
        });
    }
    addDeployment(file, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.RSPServersStatus.get(state.rsp).client;
            if (client && file && file.length === 1) {
                const options = yield this.getDeploymentOptions(client, state);
                if (!options) {
                    return;
                }
                // var fileUrl = require('file-url');
                // const filePath : string = fileUrl(file[0].fsPath);
                const deployableRef = {
                    label: file[0].fsPath,
                    path: file[0].fsPath,
                    options: options
                };
                const req = {
                    server: state.server,
                    deployableReference: deployableRef
                };
                const status = yield client.getOutgoingHandler().addDeployable(req);
                if (!rsp_client_1.StatusSeverity.isOk(status)) {
                    return Promise.reject(status.message);
                }
                return status;
            }
        });
    }
    createOpenDialogOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const showQuickPick = process.platform === 'win32' ||
                process.platform === 'linux';
            const filePickerType = yield this.quickPickDeploymentType(showQuickPick);
            if (!filePickerType) {
                return;
            }
            // dialog behavior on different OS
            // Windows -> if both options (canSelectFiles and canSelectFolders) are true, fs only shows folders
            // Linux(fedora) -> if both options are true, fs shows both files and folders but files are unselectable
            // Mac OS -> if both options are true, it works correctly
            let activeEditorUri = vscode_1.window.activeTextEditor === undefined ? undefined :
                vscode_1.window.activeTextEditor.document === undefined ? undefined :
                    vscode_1.window.activeTextEditor.document.uri;
            if (activeEditorUri && activeEditorUri.scheme && activeEditorUri.scheme === 'output') {
                activeEditorUri = undefined;
            }
            const workspaceFolderUri = (vscode_1.workspace.workspaceFolders !== undefined && vscode_1.workspace.workspaceFolders.length > 0)
                ? vscode_1.workspace.workspaceFolders[0].uri : undefined;
            const workspaceFileUri = vscode_1.workspace.workspaceFile === undefined ? undefined :
                vscode_1.workspace.workspaceFile.scheme === 'file' ? vscode_1.workspace.workspaceFile : undefined;
            const uriToOpen = workspaceFolderUri !== undefined ? workspaceFolderUri :
                workspaceFileUri !== undefined ? workspaceFileUri : activeEditorUri;
            return {
                defaultUri: uriToOpen,
                canSelectFiles: (showQuickPick ? filePickerType === deploymentStatus.file : true),
                canSelectMany: false,
                canSelectFolders: (showQuickPick ? filePickerType === deploymentStatus.exploded : true),
                openLabel: `Select ${filePickerType} Deployment`
            };
        });
    }
    getDeploymentOptions(client, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield vscode_1.window.showQuickPick(['No', 'Yes'], { placeHolder: 'Do you want to edit optional deployment parameters?' });
            const options = {};
            if (!answer) {
                return;
            }
            if (answer === 'Yes') {
                const deployOptionsResponse = yield client.getOutgoingHandler().listDeploymentOptions(state.server);
                const optionMap = deployOptionsResponse.attributes;
                for (const key in optionMap.attributes) {
                    if (key) {
                        const attribute = optionMap.attributes[key];
                        const val = yield vscode_1.window.showInputBox({ prompt: attribute.description,
                            value: attribute.defaultVal, password: attribute.secret });
                        if (val) {
                            options[key] = val;
                        }
                    }
                }
            }
            return options;
        });
    }
    removeDeployment(rspId, server, deployableRef) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClientByRSP(rspId);
            if (!client) {
                return Promise.reject('Unable to contact the RSP server.');
            }
            const req = {
                server: server,
                deployableReference: deployableRef
            };
            const status = yield client.getOutgoingHandler().removeDeployable(req);
            if (!rsp_client_1.StatusSeverity.isOk(status)) {
                return Promise.reject(status.message);
            }
            return status;
        });
    }
    publish(rspId, server, type, isAsync) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClientByRSP(rspId);
            if (!client) {
                return Promise.reject('Unable to contact the RSP server.');
            }
            const req = { server: server, kind: type };
            let status;
            if (isAsync) {
                status = yield client.getOutgoingHandler().publishAsync(req);
            }
            else {
                status = yield client.getOutgoingHandler().publish(req);
            }
            if (!rsp_client_1.StatusSeverity.isOk(status)) {
                return Promise.reject(status.message);
            }
            return status;
        });
    }
    addLocation(rspId) {
        return __awaiter(this, void 0, void 0, function* () {
            let telemetryProps = { rspType: rspId };
            const startTime = Date.now();
            const client = this.getClientByRSP(rspId);
            if (!client) {
                telemetryProps.duration = Date.now() - startTime;
                telemetryProps.errorMessage = 'Unable to contact the RSP server.';
                telemetry_1.default('server.add.local', telemetryProps);
                return Promise.reject('Unable to contact the RSP server.');
            }
            const folders = yield vscode_1.window.showOpenDialog({
                canSelectFiles: false,
                canSelectMany: false,
                canSelectFolders: true,
                openLabel: 'Select desired server location'
            });
            if (!folders
                || folders.length === 0) {
                telemetryProps.duration = Date.now() - startTime;
                telemetryProps.errorMessage = 'User canceled browse to server home';
                telemetry_1.default('server.add.local', telemetryProps);
                return;
            }
            const serverBeans = yield client.getOutgoingHandler().findServerBeans({ filepath: folders[0].fsPath });
            if (!serverBeans
                || serverBeans.length === 0
                || !serverBeans[0].serverAdapterTypeId
                || !serverBeans[0].typeCategory
                || serverBeans[0].typeCategory === 'UNKNOWN') {
                telemetryProps.duration = Date.now() - startTime;
                telemetryProps.errorMessage = `Could not detect any server at ${folders[0].fsPath}!`;
                telemetry_1.default('server.add.local', telemetryProps);
                throw new Error(`Could not detect any server at ${folders[0].fsPath}!`);
            }
            const useWebviews = vscode_1.workspace.getConfiguration('rsp-ui').get(`newserverwebviewworkflow`);
            if (useWebviews) {
                return this.addLocationWizardImplementation(serverBeans[0], rspId, client, telemetryProps, startTime);
            }
            else {
                return this.addLocationStepImplementation(serverBeans[0], rspId, client, telemetryProps, startTime);
            }
        });
    }
    attrTypeToFieldDefinitionType(attr) {
        if (attr.type === 'bool')
            return "checkbox";
        if (attr.type === 'int')
            return "number";
        if (attr.type === 'list')
            return "textarea";
        if (attr.type === 'map')
            return "textarea";
        // if( attr.type === 'int' || attr.type === 'string')  or other
        return "textbox";
    }
    attrAsFieldDefinition(key, attr, required) {
        const ret = {
            id: key,
            label: key + (required ? "*" : ""),
            description: attr.description,
            type: this.attrTypeToFieldDefinitionType(attr),
            initialValue: attr.defaultVal
        };
        return ret;
    }
    getDefaultServerName(rspId, serverType) {
        let count = 0;
        let needle = serverType.visibleName;
        let done = false;
        while (!done) {
            let found = this.RSPServersStatus.get(rspId).state.serverStates.find(state => state.server.id === needle);
            if (found !== undefined) {
                needle = serverType.visibleName + " (" + ++count + ")";
            }
            else {
                done = true;
            }
        }
        return needle;
    }
    addLocationWizardImplementation(serverBean, rspId, client, telemetryProps, startTime) {
        return __awaiter(this, void 0, void 0, function* () {
            let serverType = null;
            const serverTypes = yield client.getOutgoingHandler().getServerTypes();
            for (const oneType of serverTypes) {
                if (oneType.id === serverBean.serverAdapterTypeId) {
                    serverType = oneType;
                }
            }
            const req = yield client.getOutgoingHandler().getRequiredAttributes({ id: serverBean.serverAdapterTypeId, visibleName: '', description: '' });
            const opt = yield client.getOutgoingHandler().getOptionalAttributes({ id: serverBean.serverAdapterTypeId, visibleName: '', description: '' });
            let initialData = new Map();
            let defaultName = this.getDefaultServerName(rspId, serverType);
            let fields = [];
            let nameField = {
                id: "id",
                type: "textbox",
                label: "Server Name*",
                initialValue: defaultName
            };
            fields.push(nameField);
            initialData['id'] = defaultName;
            let requiredFields = [];
            let optionalFields = [];
            for (const key in req.attributes) {
                const oneAttr = req.attributes[key];
                let f1 = this.attrAsFieldDefinition(key, oneAttr, true);
                if (key === 'server.home.dir' || key === 'server.home.file') {
                    f1.initialValue = serverBean.location;
                    f1.properties = { disabled: true };
                    initialData[key] = f1.initialValue;
                }
                requiredFields.push(f1);
            }
            for (const key in opt.attributes) {
                const oneAttr = opt.attributes[key];
                let f1 = this.attrAsFieldDefinition(key, oneAttr, false);
                optionalFields.push(f1);
            }
            let requiredSection = {
                id: 'requiredSection',
                label: "Required Attributes",
                description: "Please fill in all of the following required attributes.",
                childFields: requiredFields
            };
            let optionalSection = {
                id: 'optionalSection',
                label: "Optional Attributes",
                description: "Fill in or override any of the following optional attributes as you require.",
                childFields: optionalFields
            };
            fields.push(requiredSection);
            fields.push(optionalSection);
            const explorer = this;
            let def = {
                title: "New Server: " + serverType.visibleName,
                description: serverType.description,
                bannerIconString: "<img style=\"float: right;\" src=\"data:image/png;base64,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\">",
                pages: [
                    {
                        id: "newServerPage1",
                        title: "Server Properties ",
                        description: "Fill in required and optional properties to create your server adapter.",
                        fields: fields,
                        validator: (parameters) => {
                            let errors = [];
                            for (const key in req.attributes) {
                                if (!parameters[key] || parameters[key] === "") {
                                    errors.push({ id: key + "Validation",
                                        content: (key + " must not be empty.") });
                                }
                            }
                            // Type validation
                            for (const key in req.attributes) {
                                if (parameters[key] && parameters[key] !== "") {
                                    let err = this.validateWizardDataType(req.attributes[key].type, parameters[key]);
                                    if (err !== null) {
                                        errors.push({ id: key + "Validation",
                                            content: (key + " " + err) });
                                    }
                                    console.log(err);
                                }
                            }
                            for (const key in opt.attributes) {
                                if (parameters[key] && parameters[key] !== "") {
                                    let err = this.validateWizardDataType(opt.attributes[key].type, parameters[key]);
                                    if (err !== null) {
                                        errors.push({ id: key + "Validation",
                                            content: (key + " " + err) });
                                    }
                                }
                            }
                            if (!parameters['id'] || parameters['id'] === "") {
                                errors.push({ id: "idValidation",
                                    content: ("id must not be empty.") });
                            }
                            return {
                                errors: errors
                            };
                        }
                    }
                ],
                workflowManager: {
                    canFinish(wizard, data) {
                        if (!data['id'] || data['id'] === "") {
                            return false;
                        }
                        for (const key in req.attributes) {
                            if (!data[key] || data[key] === "") {
                                return false;
                            }
                        }
                        return true;
                    },
                    performFinish(wizard, data) {
                        return __awaiter(this, void 0, void 0, function* () {
                            try {
                                let resp = yield explorer.createServerFullResponse(serverBean, data.id, data, client);
                                if (resp.status.ok || resp.status.severity == 0) {
                                    return null;
                                }
                                let templates = [];
                                for (const key in resp.invalidKeys) {
                                    templates.push({ id: resp.invalidKeys[key] + "Validation",
                                        content: (resp.invalidKeys[key] + " contains an invalid value") });
                                }
                                return {
                                    close: false,
                                    returnObject: {},
                                    templates: templates
                                };
                            }
                            catch (e) {
                                return {
                                    close: false,
                                    returnObject: {},
                                    templates: [
                                        { id: "description", content: (e) },
                                    ]
                                };
                            }
                        });
                    },
                    getNextPage(page, data) {
                        return null;
                    },
                    getPreviousPage(page, data) {
                        return null;
                    }
                }
            };
            const wiz = new vscode_wizard_1.WebviewWizard("New Server Wizard", "NewServerWizard", extension_1.myContext, def, initialData);
            wiz.open();
            return null;
        });
    }
    validateWizardDataType(expected, val) {
        if ('bool' == expected) {
            if (typeof val === 'boolean')
                return null;
            if (typeof val === 'string' && ((/true/i).test(val) || (/false/i).test(val)))
                return null;
            return 'Value must be a boolean';
        }
        if ('int' == expected) {
            if (typeof val === 'number')
                return null;
            if (typeof val === 'string') {
                const isNumber = !isNaN(parseFloat(val)) && isFinite(Number(val));
                if (isNumber)
                    return null;
            }
            return 'Value must be an integer';
        }
        return null;
    }
    showAddServerWizardFinishResult(stat) {
        console.log(stat);
    }
    addLocationStepImplementation(serverBean, rspId, client, telemetryProps, startTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = { name: null, bean: null };
            server.bean = serverBean;
            server.name = yield this.getServerName(rspId);
            if (!server.name) {
                telemetryProps.duration = Date.now() - startTime;
                telemetryProps.errorMessage = 'User canceled when adding server name';
                telemetry_1.default('server.add.local', telemetryProps);
                return;
            }
            telemetryProps.serverType = server.bean.serverAdapterTypeId;
            try {
                const attrs = yield this.getRequiredParameters(server.bean, client);
                yield this.getOptionalParameters(server.bean, attrs);
                return this.createServer(server.bean, server.name, attrs, client);
            }
            finally {
                telemetryProps.duration = Date.now() - startTime;
                telemetry_1.default('server.add.local', telemetryProps);
            }
        });
    }
    editServer(rspId, server) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClientByRSP(rspId);
            if (!client) {
                return Promise.reject(`Unable to contact the RSP server ${rspId}.`);
            }
            const serverProperties = yield client.getOutgoingHandler().getServerAsJson(server);
            if (!serverProperties || !serverProperties.serverJson) {
                return Promise.reject(`Could not load server properties for server ${server.id}`);
            }
            return serverEditorAdapter_1.ServerEditorAdapter.getInstance(this).showServerJsonResponse(rspId, serverProperties);
        });
    }
    saveServerProperties(rspId, serverhandle, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serverhandle) {
                return Promise.reject('Unable to update server properties - Invalid server');
            }
            if (!content) {
                return Promise.reject(`Unable to update server properties for server ${serverhandle.id} - Invalid content`);
            }
            const client = this.getClientByRSP(rspId);
            if (!client) {
                return Promise.reject('Unable to contact the RSP server.');
            }
            const serverProps = {
                handle: serverhandle,
                serverJson: content
            };
            const response = yield client.getOutgoingHandler().updateServer(serverProps);
            if (!rsp_client_1.StatusSeverity.isOk(response.validation.status)) {
                return Promise.reject(response);
            }
            return response;
        });
    }
    createServer(bean, name, attributes = {}, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bean || !name) {
                return Promise.reject('Couldn\'t create server: no type or name provided.');
            }
            const response = yield client.getServerCreation().createServerFromBeanAsync(bean, name, attributes);
            if (!rsp_client_1.StatusSeverity.isOk(response.status)) {
                return Promise.reject(response.status.message);
            }
            return response.status;
        });
    }
    createServerFullResponse(bean, name, attributes = {}, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bean || !name) {
                return Promise.reject('Couldn\'t create server: no type or name provided.');
            }
            return yield client.getServerCreation().createServerFromBeanAsync(bean, name, attributes);
        });
    }
    getClientByRSP(rspId) {
        if (!this.RSPServersStatus.has(rspId)) {
            return undefined;
        }
        return this.RSPServersStatus.get(rspId).client;
    }
    getRSPOutputChannel(server) {
        if (!this.RSPServersStatus.has(server)) {
            return undefined;
        }
        return this.RSPServersStatus.get(server).rspserverstdout;
    }
    getRSPErrorChannel(server) {
        if (!this.RSPServersStatus.has(server)) {
            return undefined;
        }
        return this.RSPServersStatus.get(server).rspserverstderr;
    }
    disposeRSPProperties(rspId) {
        if (!this.RSPServersStatus.has(rspId)) {
            return;
        }
        const rspProps = this.RSPServersStatus.get(rspId);
        if (rspProps.client) {
            rspProps.client.disconnect();
        }
        if (rspProps.rspserverstdout) {
            rspProps.rspserverstdout.dispose();
        }
        if (rspProps.rspserverstderr) {
            rspProps.rspserverstderr.dispose();
        }
        this.RSPServersStatus.get(rspId).state.serverStates = undefined;
    }
    /**
     * Prompts for server name
     */
    getServerName(rspId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                prompt: `Provide the server name`,
                placeHolder: `Server name`,
                validateInput: (value) => {
                    if (!value || value.trim().length === 0) {
                        return 'Cannot set empty server name';
                    }
                    if (this.RSPServersStatus.get(rspId).state.serverStates.find(state => state.server.id === value)) {
                        return 'Cannot set duplicate server name';
                    }
                }
            };
            return yield vscode_1.window.showInputBox(options);
        });
    }
    /**
     * Requests parameters for the given server and lets user fill the required ones
     */
    getRequiredParameters(bean, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let serverAttribute;
            if (this.serverAttributes.has(bean.serverAdapterTypeId)) {
                serverAttribute = this.serverAttributes.get(bean.serverAdapterTypeId);
            }
            else {
                const req = yield client.getOutgoingHandler().getRequiredAttributes({ id: bean.serverAdapterTypeId, visibleName: '', description: '' });
                const opt = yield client.getOutgoingHandler().getOptionalAttributes({ id: bean.serverAdapterTypeId, visibleName: '', description: '' });
                serverAttribute = { required: req, optional: opt };
                this.serverAttributes.set(bean.serverAdapterTypeId, serverAttribute);
            }
            const attributes = {};
            if (serverAttribute.required
                && serverAttribute.required.attributes
                && Object.keys(serverAttribute.required.attributes).length > 0) {
                for (const key in serverAttribute.required.attributes) {
                    if (key !== 'server.home.dir' && key !== 'server.home.file') {
                        const attribute = serverAttribute.required.attributes[key];
                        const value = yield vscode_1.window.showInputBox({ prompt: attribute.description,
                            value: attribute.defaultVal, password: attribute.secret });
                        if (value) {
                            attributes[key] = value;
                        }
                    }
                    else {
                        attributes[key] = bean.location;
                    }
                }
            }
            return attributes;
        });
    }
    /**
     * Let user choose to fill in optional parameters for a server
     */
    getOptionalParameters(bean, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverAttribute = this.serverAttributes.get(bean.serverAdapterTypeId);
            if (serverAttribute.optional
                && serverAttribute.optional.attributes
                && Object.keys(serverAttribute.optional.attributes).length > 0) {
                const answer = yield vscode_1.window.showQuickPick(['No', 'Yes'], { placeHolder: 'Do you want to edit optional parameters ?' });
                if (answer === 'Yes') {
                    for (const key in serverAttribute.optional.attributes) {
                        if (key !== 'server.home.dir' && key !== 'server.home.file') {
                            const attribute = serverAttribute.optional.attributes[key];
                            const val = yield vscode_1.window.showInputBox({ prompt: attribute.description,
                                value: attribute.defaultVal, password: attribute.secret });
                            if (val) {
                                attributes[key] = val;
                            }
                        }
                        else {
                            attributes[key] = bean.location;
                        }
                    }
                }
            }
            return attributes;
        });
    }
    quickPickDeploymentType(showQuickPick) {
        return __awaiter(this, void 0, void 0, function* () {
            // quickPick to solve a vscode api bug in windows that only opens file-picker dialog either in file or folder mode
            if (showQuickPick) {
                return yield vscode_1.window.showQuickPick([deploymentStatus.file, deploymentStatus.exploded], { placeHolder: 'What type of deployment do you want to add?' });
            }
            return 'file or exploded';
        });
    }
    getTreeItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRSPElement(item)) {
                const state = item;
                const id1 = state.type.visibilename;
                // TODO fix the run state here, but need to find the RSPProperties for this RSPState
                const props = this.RSPServersStatus.get(state.type.id);
                const useConnected = (state.state == 2 && props.info !== undefined && props.info.spawned == false);
                const serverState = useConnected ? `Connected` : `${this.runStateEnum.get(state.state)}`;
                const icon = yield utils_1.Utils.getIcon(state.type.id, state.type.id);
                return { label: `${id1}`,
                    description: `(${serverState})`,
                    id: id1,
                    iconPath: icon,
                    contextValue: `RSP${serverState}`,
                    collapsibleState: vscode_1.TreeItemCollapsibleState.Expanded
                };
            }
            else if (this.isServerElement(item)) {
                // item is a serverState
                const state = item;
                const handle = state.server;
                const id1 = handle.id;
                const serverState = (state.state === rsp_client_1.ServerState.STARTED && state.runMode === rsp_client_1.ServerState.RUN_MODE_DEBUG) ?
                    'Debugging' :
                    this.runStateEnum.get(state.state);
                const pubState = this.publishStateEnum.get(state.publishState);
                const icon = yield utils_1.Utils.getIcon(state.rsp, handle.type.id);
                return { label: `${id1}`,
                    description: `(${serverState}) (${pubState})`,
                    id: `${state.rsp}-${id1}`,
                    iconPath: icon,
                    contextValue: serverState,
                    collapsibleState: vscode_1.TreeItemCollapsibleState.Expanded,
                    command: {
                        command: 'server.saveSelectedNode',
                        title: '',
                        tooltip: '',
                        arguments: [state]
                    }
                };
            }
            else if (this.isDeployableElement(item)) {
                const state = item;
                const id1 = state.reference.label;
                const serverState = this.runStateEnum.get(state.state);
                const pubState = this.publishStateEnum.get(state.publishState);
                const icon = yield utils_1.Utils.getIcon(state.rsp, state.server.type.id);
                return { label: `${id1}`,
                    description: `(${serverState}) (${pubState})`,
                    iconPath: icon,
                    contextValue: pubState,
                    collapsibleState: vscode_1.TreeItemCollapsibleState.None
                };
            }
            else {
                return undefined;
            }
        });
    }
    getChildren(element) {
        if (element === undefined) {
            // no parent, root node -> return rsps
            return Array.from(this.RSPServersStatus.values()).map(rsp => rsp.state);
        }
        else if (this.isRSPElement(element) && element.serverStates !== undefined) {
            // rsp parent -> return servers
            return element.serverStates;
        }
        else if (this.isServerElement(element) && element.deployableStates !== undefined) {
            // server parent -> return deployables
            return element.deployableStates;
        }
        else {
            return [];
        }
    }
    getParent(element) {
        if (this.isServerElement(element)) {
            return this.RSPServersStatus.get(element.rsp).state;
        }
        else if (this.isDeployableElement(element)) {
            const rspId = element.rsp;
            return this.RSPServersStatus.get(rspId).state.serverStates.find(state => state.server.id === element.server.id);
        }
        else {
            return undefined;
        }
    }
    getServerStateById(rspId, serverId) {
        return this.RSPServersStatus.get(rspId).state.serverStates.find(x => x.server.id === serverId);
    }
    getServerStatesByRSP(rspId) {
        return this.RSPServersStatus.get(rspId).state.serverStates;
    }
    isRSPElement(element) {
        return element.type !== undefined;
    }
    isServerElement(element) {
        return element.deployableStates !== undefined;
    }
    isDeployableElement(element) {
        return element.reference !== undefined;
    }
}
exports.ServerExplorer = ServerExplorer;
//# sourceMappingURL=serverExplorer.js.map