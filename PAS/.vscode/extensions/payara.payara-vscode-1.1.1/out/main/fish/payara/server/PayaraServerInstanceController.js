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
exports.PayaraServerInstanceController = void 0;
/*
 * Copyright (c) 2020-2021 Payara Foundation and/or its affiliates and others.
 * All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0, which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the
 * Eclipse Public License v. 2.0 are satisfied: GNU General Public License,
 * version 2 with the GNU Classpath Exception, which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 */
const cp = require("child_process");
const fs = require("fs");
const fse = require("fs-extra");
const _ = require("lodash");
const open = require("open");
const path = require("path");
const tmp = require("tmp");
const url_1 = require("url");
const isPort = require("validator/lib/isPort");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const DeploymentSupport_1 = require("../project/DeploymentSupport");
const ui = require("../../../UI");
const UI_1 = require("../../../UI");
const RestEndpoints_1 = require("./endpoints/RestEndpoints");
const PayaraServerInstance_1 = require("./PayaraServerInstance");
const JDKVersion_1 = require("./start/JDKVersion");
const StartTask_1 = require("./start/StartTask");
const JavaUtils_1 = require("./tooling/utils/JavaUtils");
const ServerUtils_1 = require("./tooling/utils/ServerUtils");
const ProjectOutputWindowProvider_1 = require("../project/ProjectOutputWindowProvider");
const PayaraInstanceController_1 = require("../common/PayaraInstanceController");
const PayaraRemoteServerInstance_1 = require("./PayaraRemoteServerInstance");
const PayaraLocalServerInstance_1 = require("./PayaraLocalServerInstance");
class PayaraServerInstanceController extends PayaraInstanceController_1.PayaraInstanceController {
    constructor(context, instanceProvider, extensionPath) {
        super(context);
        this.instanceProvider = instanceProvider;
        this.extensionPath = extensionPath;
        this.deployments = new Map();
        this.init();
    }
    getPayaraServerInstance(workspace) {
        return this.deployments.get(workspace);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.instanceProvider.loadServerConfigs();
            this.refreshServerList();
        });
    }
    addServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let controller = this;
            let step = 0;
            let totalStep = 4;
            ui.MultiStepInput.run(input => this.selectServerType(step, totalStep, input, {}, state => {
                if (!state.name) {
                    vscode.window.showErrorMessage('server name is invalid');
                }
                else if (!state.path && state.type === 'local') {
                    vscode.window.showErrorMessage('selected server path is invalid');
                }
                else if (!state.domainName) {
                    vscode.window.showErrorMessage('domain name is invalid');
                }
                else {
                    let serverName = state.name;
                    let serverPath = state.path ? state.path : '';
                    let domainName = state.domainName;
                    let registerServer = () => {
                        let payaraServer = state.type === 'local' ?
                            new PayaraLocalServerInstance_1.PayaraLocalServerInstance(serverName, domainName, serverPath) :
                            new PayaraRemoteServerInstance_1.PayaraRemoteServerInstance(serverName, domainName);
                        payaraServer.setUsername(state.username ? state.username.trim() : ServerUtils_1.ServerUtils.DEFAULT_USERNAME);
                        payaraServer.setPassword(state.password ? state.password.trim() : ServerUtils_1.ServerUtils.DEFAULT_PASSWORD);
                        this.refreshServerList();
                        if (payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance) {
                            payaraServer.checkAliveStatusUsingJPS(() => {
                                payaraServer.connectOutput();
                                payaraServer.setStarted(true);
                                this.refreshServerList();
                            });
                        }
                        else if (payaraServer instanceof PayaraRemoteServerInstance_1.PayaraRemoteServerInstance) {
                            payaraServer.setHost(state.host ? state.host.trim() : ServerUtils_1.ServerUtils.DEFAULT_HOST);
                            payaraServer.setAdminPort(state.adminPort ? state.adminPort : ServerUtils_1.ServerUtils.DEFAULT_ADMIN_PORT);
                            payaraServer.setHttpPort(state.httpPort ? state.httpPort : ServerUtils_1.ServerUtils.DEFAULT_HTTP_PORT);
                            if (payaraServer.isConnectionAllowed()) {
                                payaraServer.checkAliveStatusUsingRest(ServerUtils_1.ServerUtils.DEFAULT_RETRY_COUNT, () => __awaiter(this, void 0, void 0, function* () {
                                    payaraServer.setStarted(true);
                                    payaraServer.connectOutput();
                                    this.refreshServerList();
                                    payaraServer.reloadApplications();
                                }), (message) => __awaiter(this, void 0, void 0, function* () {
                                    payaraServer.setStarted(false);
                                    this.refreshServerList();
                                }));
                            }
                        }
                        this.instanceProvider.addServer(payaraServer);
                    };
                    if (state.newDomain) {
                        controller.createDomain(registerServer, serverName, serverPath, domainName, state.adminPort, state.httpPort, state.username, state.password);
                    }
                    else {
                        registerServer();
                    }
                }
            }));
        });
    }
    createDomain(callback, serverName, serverPath, domainName, adminPort, instancePort, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let passwordFile;
            if (!adminPort) {
                adminPort = ServerUtils_1.ServerUtils.DEFAULT_ADMIN_PORT;
            }
            if (!instancePort) {
                instancePort = ServerUtils_1.ServerUtils.DEFAULT_HTTP_PORT;
            }
            if (!username) {
                username = ServerUtils_1.ServerUtils.DEFAULT_USERNAME;
            }
            if (!password) {
                password = ServerUtils_1.ServerUtils.DEFAULT_PASSWORD;
            }
            let javaHome = JDKVersion_1.JDKVersion.getDefaultJDKHome();
            if (!javaHome) {
                throw new Error("Java home path not found.");
            }
            let javaVmExe = JavaUtils_1.JavaUtils.javaVmExecutableFullPath(javaHome);
            let args = new Array();
            args.push("-client");
            args.push("-jar");
            args.push(path.join(serverPath, "glassfish", "modules", "admin-cli.jar"));
            args.push("--user");
            args.push(username);
            if (password !== '') {
                passwordFile = this.createTempPasswordFile(password);
                args.push("--passwordfile");
                args.push(passwordFile.name);
            }
            args.push("create-domain");
            if (password === '') {
                args.push("--nopassword");
            }
            args.push("--domaindir");
            args.push(path.join(serverPath, "glassfish", "domains"));
            args.push("--adminport");
            args.push(String(adminPort));
            args.push("--instanceport");
            args.push(String(instancePort));
            args.push(domainName);
            let process = cp.spawn(javaVmExe, args, { cwd: serverPath });
            if (process.pid) {
                let outputChannel = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().get(serverName);
                outputChannel.show(false);
                outputChannel.append('Running the create-domain asadmin command ... \n');
                let logCallback = (data) => outputChannel.append(data.toString());
                if (process.stdout !== null) {
                    process.stdout.on('data', logCallback);
                }
                if (process.stderr !== null) {
                    process.stderr.on('data', logCallback);
                }
                process.on('error', (err) => {
                    console.log('error: ' + err.message);
                });
                process.on('exit', (code) => {
                    if (code === 0) {
                        callback();
                    }
                    else {
                        vscode.window.showErrorMessage('Command create-domain execution failed.');
                    }
                    if (passwordFile) {
                        passwordFile.removeCallback();
                    }
                });
            }
        });
    }
    createTempPasswordFile(password) {
        var tmpFile = tmp.fileSync({ prefix: 'payara-password-', postfix: '.txt' });
        console.log('File: ', tmpFile.name);
        let content = "AS_ADMIN_ADMINPASSWORD=" + password + '\n'; // to create domain
        content += "AS_ADMIN_PASSWORD=" + password + '\n'; // to start domain
        content += "AS_ADMIN_MASTERPASSWORD=" + ServerUtils_1.ServerUtils.MASTER_PASSWORD;
        if (fs.existsSync(tmpFile.name)) {
            fs.writeFileSync(tmpFile.name, content);
        }
        return tmpFile;
    }
    selectServerType(step, totalSteps, input, state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let local = { label: 'Local Domain' };
            let remote = { label: 'Remote Domain' };
            const pick = yield input.showQuickPick({
                title: 'Register Payara Server',
                step: ++step,
                totalSteps: totalSteps,
                placeholder: 'Select server instance type.',
                items: [local, remote],
                activeItem: local,
                shouldResume: this.shouldResume
            });
            if (pick === local) {
                state.type = 'local';
                return (input) => this.selectServer(step, totalSteps, input, state, callback);
            }
            else {
                state.type = 'remote';
                totalSteps = 6;
                return (input) => this.serverName(step, totalSteps, input, state, callback);
            }
        });
    }
    selectServer(step, totalSteps, input, state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            ++step;
            let serverPath;
            let dialogOptions = ({
                defaultUri: vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined,
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: 'Select Payara Server'
            });
            let getServerPaths = (serverPaths) => {
                if (_.isEmpty(serverPaths)
                    || !serverPaths[0].fsPath
                    || !ServerUtils_1.ServerUtils.isValidServerPath(serverPaths[0].fsPath)) {
                    vscode.window.showErrorMessage("Selected Payara Server path is invalid.");
                }
                return serverPaths[0].fsPath;
            };
            const unlistedServers = this.instanceProvider
                .getUnlistedServers()
                .map(server => ({ label: server.getPath() }));
            if (unlistedServers.length > 0) {
                let browseServerButtonLabel = 'Browse the Payara Server...';
                const browseServerButton = new UI_1.MyButton({
                    dark: vscode_1.Uri.file(this.context.asAbsolutePath('resources/theme/dark/add.svg')),
                    light: vscode_1.Uri.file(this.context.asAbsolutePath('resources/theme/light/add.svg')),
                }, browseServerButtonLabel);
                unlistedServers.push(({ label: browseServerButtonLabel }));
                let pick = yield input.showQuickPick({
                    title: 'Register Payara Server',
                    step: step,
                    totalSteps: totalSteps,
                    placeholder: 'Select the Payara Server location',
                    items: unlistedServers,
                    buttons: [browseServerButton],
                    shouldResume: this.shouldResume
                });
                if (pick instanceof ui.MyButton || pick.label === browseServerButtonLabel) {
                    let fileUris = yield vscode.window.showOpenDialog(dialogOptions);
                    if (!fileUris) {
                        return;
                    }
                    serverPath = getServerPaths(fileUris);
                }
                else {
                    serverPath = pick.label;
                }
            }
            else {
                let fileUris = yield vscode.window.showOpenDialog(dialogOptions);
                if (!fileUris) {
                    return;
                }
                serverPath = getServerPaths(fileUris);
            }
            state.path = serverPath;
            return (input) => this.serverName(step, totalSteps, input, state, callback);
        });
    }
    serverName(step, totalSteps, input, state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = 'Register Payara Server';
            let serverPath = state.path ? state.path : '';
            let defaultServerName = path.basename(serverPath);
            let serverName = yield input.showInputBox({
                title: title,
                step: ++step,
                totalSteps: totalSteps,
                value: state.name || defaultServerName,
                prompt: 'Enter a unique name for the server',
                placeHolder: 'Payara Server name',
                validate: name => this.validateServerName(name, this.instanceProvider),
                shouldResume: this.shouldResume
            });
            state.name = serverName ? serverName : defaultServerName;
            if (state.type === 'local') {
                return (input) => this.selectDomain(step, totalSteps, input, state, callback);
            }
            else {
                return (input) => this.domainRegistration(step, totalSteps, input, state, [], callback);
            }
        });
    }
    selectDomain(step, totalSteps, input, state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!state.path) {
                return;
            }
            let domainsDir = fse.readdirSync(path.join(state.path, 'glassfish', 'domains'));
            state.domains = domainsDir.map(label => ({ label }));
            const createDomainButton = new UI_1.MyButton({
                dark: vscode_1.Uri.file(this.context.asAbsolutePath('resources/theme/dark/add.svg')),
                light: vscode_1.Uri.file(this.context.asAbsolutePath('resources/theme/light/add.svg')),
            }, 'Create new Payara Server Domain');
            const pick = yield input.showQuickPick({
                title: 'Register Payara Server',
                step: ++step,
                totalSteps: totalSteps,
                placeholder: 'Select an existing domain.',
                items: state.domains ? state.domains : [],
                activeItem: typeof state.domainName !== 'string' ? state.domainName : undefined,
                buttons: [createDomainButton],
                shouldResume: this.shouldResume
            });
            if (pick instanceof ui.MyButton) {
                return (input) => this.domainRegistration(step, totalSteps, input, state, domainsDir, callback);
            }
            state.domainName = pick.label;
            callback(state);
        });
    }
    validateServerName(name, instanceProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(name)) {
                return 'Server name cannot be empty';
            }
            else if (instanceProvider.getServerByName(name)) {
                return 'Payara Server already exist with the given name, please re-enter';
            }
            return undefined;
        });
    }
    validateDomainName(name, existingDomainsDir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(name)) {
                return 'Domain name cannot be empty.';
            }
            else if (!/[a-zA-Z0-9_-]+$/.test(name)) {
                return 'Please enter the valid Domain name.';
            }
            else if (existingDomainsDir.indexOf(name) > -1) {
                return 'Domain already exist, please enter a unique name.';
            }
            return undefined;
        });
    }
    validateUserName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(name.trim())) {
                return 'Username cannot be empty.';
            }
            return undefined;
        });
    }
    validateHost(host) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(host)) {
                return 'Please enter a valid host name.';
            }
            return undefined;
        });
    }
    validatePort(port) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isPort.default(port)) {
                return 'Please enter a valid port number.';
            }
            return undefined;
        });
    }
    domainRegistration(step, totalSteps, input, state, existingDomainsDir, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            totalSteps = state.type === 'local' ? 7 : totalSteps;
            let domainName = yield input.showInputBox({
                title: 'Domain name',
                step: ++step,
                totalSteps: totalSteps,
                value: '',
                prompt: state.type === 'local' ? 'Enter the new domain name' : 'Enter the domain name',
                placeHolder: 'Payara Server domain name',
                validate: value => this.validateDomainName(value, existingDomainsDir),
                shouldResume: this.shouldResume
            });
            state.domainName = domainName;
            if (state.type === 'local') {
                state.newDomain = true;
            }
            else {
                state.newDomain = false;
                let host = yield input.showInputBox({
                    title: 'Host',
                    step: ++step,
                    totalSteps: totalSteps,
                    value: ServerUtils_1.ServerUtils.DEFAULT_HOST,
                    prompt: 'Enter the host name',
                    placeHolder: 'Enter the host name',
                    validate: value => this.validateHost(value),
                    shouldResume: this.shouldResume
                });
                state.host = host;
            }
            let decision = yield input.showQuickPick({
                title: 'Use Default ports?',
                step: ++step,
                totalSteps: totalSteps,
                placeholder: 'Default admin port (4848) and http port (8080)',
                items: [{ label: 'Yes' }, { label: 'No' }],
                activeItem: { label: 'Yes' },
                shouldResume: this.shouldResume
            });
            if (decision.label === 'No') {
                totalSteps += 2;
                let adminPort = yield input.showInputBox({
                    title: 'Admin Port',
                    step: ++step,
                    totalSteps: totalSteps,
                    value: '4848',
                    prompt: 'Enter the admin port',
                    placeHolder: 'Enter the admin port 4848',
                    validate: value => this.validatePort(value),
                    shouldResume: this.shouldResume
                });
                let httpPort = yield input.showInputBox({
                    title: 'Http Port',
                    step: ++step,
                    totalSteps: totalSteps,
                    value: '8080',
                    prompt: 'Enter the http port',
                    placeHolder: 'Enter the http port 8080',
                    validate: value => this.validatePort(value),
                    shouldResume: this.shouldResume
                });
                state.adminPort = parseInt(adminPort);
                state.httpPort = parseInt(httpPort);
            }
            return (input) => this.addCredentials(step, totalSteps, true, input, state, callback);
        });
    }
    addCredentials(step, totalSteps, showDefault, input, state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let decision = undefined;
            if (showDefault) {
                decision = yield input.showQuickPick({
                    title: 'Default credentials?',
                    step: ++step,
                    totalSteps: totalSteps,
                    placeholder: 'Default username (admin) and password (empty)',
                    items: [{ label: 'Yes' }, { label: 'No' }],
                    activeItem: { label: 'Yes' },
                    shouldResume: this.shouldResume
                });
            }
            if (decision && decision.label === 'Yes') {
                callback(state);
            }
            else {
                totalSteps += 2;
                state.username = yield input.showInputBox({
                    title: 'Username',
                    step: ++step,
                    totalSteps: totalSteps,
                    value: state.username ? state.username : ServerUtils_1.ServerUtils.DEFAULT_USERNAME,
                    prompt: 'Enter the username',
                    placeHolder: 'Enter the username e.g admin',
                    validate: (value) => this.validateUserName(value),
                    shouldResume: this.shouldResume
                });
                const passwordBox = vscode.window.createInputBox();
                passwordBox.title = 'Password';
                passwordBox.step = ++step;
                passwordBox.totalSteps = totalSteps;
                passwordBox.value = state.password ? state.password : ServerUtils_1.ServerUtils.DEFAULT_PASSWORD;
                passwordBox.prompt = 'Enter the password';
                passwordBox.placeholder = 'Enter the password';
                passwordBox.password = true;
                passwordBox.show();
                passwordBox.onDidAccept(() => __awaiter(this, void 0, void 0, function* () {
                    passwordBox.hide();
                    state.password = passwordBox.value;
                    callback(state);
                }));
            }
        });
    }
    isValidServerPath(serverPath) {
        const payaraApiExists = fse.pathExistsSync(path.join(serverPath, 'glassfish', 'bin', 'asadmin'));
        const asadminFileExists = fse.pathExistsSync(path.join(serverPath, 'bin', 'asadmin'));
        return payaraApiExists && asadminFileExists;
    }
    connectServer(payaraServer, debug, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            payaraServer.setConnectionAllowed(true);
            payaraServer.checkAliveStatusUsingRest(0, () => __awaiter(this, void 0, void 0, function* () {
                payaraServer.setStarted(true);
                payaraServer.connectOutput();
                vscode.commands.executeCommand('payara.server.refresh');
                payaraServer.reloadApplications();
            }), (message) => __awaiter(this, void 0, void 0, function* () {
                payaraServer.setStarted(false);
                vscode.commands.executeCommand('payara.server.refresh');
            }), true);
        });
    }
    disconnectServer(payaraServer, debug, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            payaraServer.setConnectionAllowed(false);
            payaraServer.setStarted(false);
            payaraServer.disconnectOutput();
            payaraServer.getOutputChannel().appendLine(`Disconnecting from ${payaraServer.getName()}[${payaraServer.getHost()}:${payaraServer.getAdminPort()}]`);
            vscode.commands.executeCommand('payara.server.refresh');
        });
    }
    startServer(payaraServer, debug, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payaraServer.isStopped()) {
                vscode.window.showErrorMessage('Payara Server instance already running.');
                return;
            }
            let process = new StartTask_1.StartTask().startServer(payaraServer, debug);
            if (process.pid) {
                payaraServer.setDebug(debug);
                payaraServer.setState(PayaraServerInstance_1.InstanceState.LOADING);
                this.refreshServerList();
                payaraServer.getOutputChannel().show(false);
                let logCallback = (data) => payaraServer.getOutputChannel().append(data.toString());
                if (process.stdout !== null) {
                    process.stdout.on('data', logCallback);
                }
                if (process.stderr !== null) {
                    process.stderr.on('data', logCallback);
                }
                process.on('error', (err) => {
                    console.log('error: ' + err.message);
                });
                process.on('exit', (code) => {
                    if (!payaraServer.isRestarting()) {
                        payaraServer.setStarted(false);
                        this.refreshServerList();
                    }
                });
                payaraServer.checkAliveStatusUsingRest(ServerUtils_1.ServerUtils.DEFAULT_RETRY_COUNT, () => __awaiter(this, void 0, void 0, function* () {
                    payaraServer.setStarted(true);
                    this.refreshServerList();
                    payaraServer.reloadApplications();
                    if (callback) {
                        callback(true);
                    }
                }), (message) => __awaiter(this, void 0, void 0, function* () {
                    payaraServer.setStarted(false);
                    this.refreshServerList();
                    if (callback) {
                        callback(false);
                    }
                    vscode.window.showErrorMessage('Unable to start the Payara Server. ' + message);
                }));
            }
        });
    }
    restartServer(payaraServer, debug, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payaraServer.isStopped()) {
                vscode.window.showErrorMessage('Payara Server instance not running.');
                return;
            }
            let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
            let query = '?debug=' + debug;
            endpoints.invoke("restart-domain", (res) => __awaiter(this, void 0, void 0, function* () {
                payaraServer.connectOutput();
                payaraServer.setDebug(debug);
                payaraServer.setState(PayaraServerInstance_1.InstanceState.RESTARTING);
                this.refreshServerList();
                payaraServer.getOutputChannel().show(false);
                payaraServer.checkAliveStatusUsingRest(ServerUtils_1.ServerUtils.DEFAULT_RETRY_COUNT, () => __awaiter(this, void 0, void 0, function* () {
                    payaraServer.setStarted(true);
                    payaraServer.connectOutput();
                    this.refreshServerList();
                    if (callback) {
                        callback(true);
                    }
                }), (message) => __awaiter(this, void 0, void 0, function* () {
                    payaraServer.setStarted(false);
                    payaraServer.disconnectOutput();
                    this.refreshServerList();
                    if (callback) {
                        callback(false);
                    }
                    vscode.window.showErrorMessage('Unable to restart the Payara Server. ' + message);
                }));
                if (payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance) {
                    payaraServer.checkAliveStatusUsingJPS(() => __awaiter(this, void 0, void 0, function* () {
                        payaraServer.connectOutput();
                    }));
                }
            }), (res, message) => vscode.window.showErrorMessage('Unable to restart the Payara Server. ' + message));
        });
    }
    stopServer(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payaraServer.isStopped()) {
                vscode.window.showErrorMessage('Payara Server instance not running.');
                return;
            }
            let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
            endpoints.invoke("stop-domain", (res) => __awaiter(this, void 0, void 0, function* () {
                if (res.statusCode === 200) {
                    payaraServer.setState(PayaraServerInstance_1.InstanceState.STOPPED);
                    payaraServer.setDebug(false);
                    yield new Promise(res => setTimeout(res, 2000));
                    this.refreshServerList();
                    payaraServer.disconnectOutput();
                }
            }));
        });
    }
    renameServer(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payaraServer) {
                yield vscode.window.showInputBox({
                    value: payaraServer.getName(),
                    prompt: 'Enter a unique name for the server',
                    placeHolder: 'Payara Server name',
                    validateInput: name => this.validateServerName(name, this.instanceProvider)
                }).then(newName => {
                    if (newName) {
                        payaraServer.setName(newName);
                        this.instanceProvider.updateServerConfig();
                        this.refreshServerList();
                    }
                });
            }
        });
    }
    removeServer(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.instanceProvider.removeServer(payaraServer);
            this.refreshServerList();
            payaraServer.dispose();
        });
    }
    updateCredentials(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            let state = {
                username: payaraServer.getUsername(),
                password: payaraServer.getPassword()
            };
            ui.MultiStepInput.run(input => this.addCredentials(0, 0, false, input, state, () => {
                payaraServer.setUsername(state.username ? state.username.trim() : ServerUtils_1.ServerUtils.DEFAULT_USERNAME);
                payaraServer.setPassword(state.password ? state.password.trim() : ServerUtils_1.ServerUtils.DEFAULT_PASSWORD);
                this.instanceProvider.updateServerConfig();
                vscode.window.showInformationMessage('Credentials updated successfully.');
            }));
        });
    }
    openConsole(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            open(new url_1.URL(`http://${payaraServer.getHost()}:${payaraServer.getAdminPort()}`).toString());
        });
    }
    openLog(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            payaraServer.getOutputChannel().show(false);
            payaraServer.showLog();
            payaraServer.connectOutput();
        });
    }
    openConfig(payaraServer) {
        return __awaiter(this, void 0, void 0, function* () {
            let domainXml = vscode_1.Uri.parse("file:" + payaraServer.getDomainXmlPath());
            vscode.workspace.openTextDocument(domainXml)
                .then(doc => vscode.window.showTextDocument(doc));
        });
    }
    refreshServerList() {
        return __awaiter(this, void 0, void 0, function* () {
            vscode.commands.executeCommand('payara.server.refresh');
        });
    }
    deployApp(uri, debug, autoDeploy, selectedServer, metadataChanged, sourcesChanged) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().updateStatusBar(`Deploying ${workspaceFolder === null || workspaceFolder === void 0 ? void 0 : workspaceFolder.name}`);
        let support = new DeploymentSupport_1.DeploymentSupport(this);
        let callback = (server) => {
            let deploy = (status) => __awaiter(this, void 0, void 0, function* () {
                if (status) {
                    if (uri.fsPath.endsWith('.war') || uri.fsPath.endsWith('.jar')) {
                        support.deployApplication(uri.fsPath, server, debug, autoDeploy, metadataChanged, sourcesChanged);
                    }
                    else {
                        try {
                            support.buildAndDeployApplication(uri, server, debug, autoDeploy, metadataChanged, sourcesChanged);
                        }
                        catch (error) {
                            vscode.window.showErrorMessage(error.message);
                        }
                    }
                    if (workspaceFolder) {
                        this.deployments.set(workspaceFolder, server);
                    }
                }
                else {
                    vscode.window.showErrorMessage('Unable to deploy the application as Payara Server instance not running.');
                }
            });
            if (autoDeploy && server.isStarted()) {
                deploy(true);
            }
            else {
                if (server instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance && !server.isStarted()) {
                    this.startServer(server, debug, deploy);
                }
                else if (server instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance && debug && !server.isDebug()) {
                    this.restartServer(server, debug, deploy);
                }
                else {
                    deploy(true);
                }
            }
        };
        if (selectedServer) {
            callback(selectedServer);
        }
        else {
            this.selectListedServer(callback);
        }
    }
    selectListedServer(callback) {
        let servers = this.instanceProvider.getServers();
        if (servers.length === 0) {
            vscode.window.showErrorMessage('Please register the Payara Server.');
        }
        else if (servers.length === 1) {
            callback(servers[0]);
        }
        else {
            vscode.window.showQuickPick(servers, {
                placeHolder: 'Select the Payara Server',
                canPickMany: false
            }).then(value => {
                if (value instanceof PayaraServerInstance_1.PayaraServerInstance) {
                    callback(value);
                }
                else {
                    vscode.window.showErrorMessage('Please select the Payara Server.');
                }
            });
        }
    }
    undeployApp(application) {
        let controller = this;
        let payaraServer = application.payaraServer;
        let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
        let query = '?name=' + encodeURIComponent(application.name);
        endpoints.invoke("undeploy" + query, (response) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                payaraServer.removeApplication(application);
                controller.refreshServerList();
            }
        }));
    }
    enableApp(application) {
        let controller = this;
        let payaraServer = application.payaraServer;
        let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
        let query = '?DEFAULT=' + encodeURIComponent(application.name);
        endpoints.invoke("enable" + query, (response) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                application.setEnabled(true);
                controller.refreshServerList();
            }
        }));
    }
    disableApp(application) {
        let controller = this;
        let payaraServer = application.payaraServer;
        let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
        let query = '?DEFAULT=' + encodeURIComponent(application.name);
        endpoints.invoke("disable" + query, (response) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                application.setEnabled(false);
                controller.refreshServerList();
            }
        }));
    }
    openApp(application) {
        if (application.getContextPath() === null) {
            vscode.window.showInformationMessage('Context path not found for the application: ' + application.name);
        }
        else if (application.getContextPath() === undefined) {
            application.fetchContextPath(() => open(new url_1.URL(`http://${application.payaraServer.getHost()}:${application.payaraServer.getHttpPort()}`
                + application.getContextPath()).toString()));
        }
        else {
            open(new url_1.URL(`http://${application.payaraServer.getHost()}:${application.payaraServer.getHttpPort()}`
                + application.getContextPath()).toString());
        }
    }
    openRestEndpoint(restEndpoint) {
        open(new url_1.URL(`http://${restEndpoint.application.payaraServer.getHost()}:${restEndpoint.application.payaraServer.getHttpPort()}`
            + restEndpoint.endpoint).toString());
    }
    updateConfig() {
        this.instanceProvider.updateServerConfig();
    }
}
exports.PayaraServerInstanceController = PayaraServerInstanceController;
//# sourceMappingURL=PayaraServerInstanceController.js.map