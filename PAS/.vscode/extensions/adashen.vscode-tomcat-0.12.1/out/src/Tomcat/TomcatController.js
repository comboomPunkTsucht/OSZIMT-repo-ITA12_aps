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
exports.TomcatController = void 0;
const chokidar = require("chokidar");
const fs = require("fs");
const fse = require("fs-extra");
const _ = require("lodash");
// tslint:disable-next-line:no-require-imports
const opn = require("opn");
const path = require("path");
const portfinder = require("portfinder");
const url_1 = require("url");
const vscode = require("vscode");
const vscode_extension_telemetry_wrapper_1 = require("vscode-extension-telemetry-wrapper");
const Constants = require("../Constants");
const DialogMessage_1 = require("../DialogMessage");
const Utility_1 = require("../Utility");
const TomcatServer_1 = require("./TomcatServer");
class TomcatController {
    constructor(_tomcatModel, _extensionPath) {
        this._tomcatModel = _tomcatModel;
        this._extensionPath = _extensionPath;
        this._outputChannel = vscode.window.createOutputChannel('vscode-tomcat');
    }
    deleteServer(operationId, tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.precheck(operationId, tomcatServer);
            if (server) {
                const confirmation = yield vscode.window.showWarningMessage(DialogMessage_1.DialogMessage.deleteConfirm, DialogMessage_1.DialogMessage.yes, DialogMessage_1.DialogMessage.cancel);
                if (confirmation !== DialogMessage_1.DialogMessage.yes) {
                    Utility_1.Utility.infoTelemetryStep(operationId, 'cancel');
                    return;
                }
                if (server.isStarted()) {
                    yield this.stopOrRestartServer(operationId, server);
                }
                this._tomcatModel.deleteServer(server);
            }
        });
    }
    openServerConfig(operationId, tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tomcatServer) {
                const configFile = tomcatServer.getServerConfigPath();
                if (!(yield fse.pathExists(configFile))) {
                    Utility_1.Utility.infoTelemetryStep(operationId, 'no configuration');
                    throw new Error(DialogMessage_1.DialogMessage.noServerConfig);
                }
                yield Utility_1.Utility.trackTelemetryStep(operationId, 'open configuration', () => Utility_1.Utility.openFile(configFile));
            }
        });
    }
    browseWarPackage(operationId, warPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (warPackage) {
                const server = this._tomcatModel.getTomcatServer(warPackage.serverName);
                const httpPort = yield Utility_1.Utility.getPort(server.getServerConfigPath(), Constants.PortKind.Http);
                if (!server.isStarted()) {
                    const result = yield vscode.window.showInformationMessage(DialogMessage_1.DialogMessage.startServer, DialogMessage_1.DialogMessage.yes, DialogMessage_1.DialogMessage.no);
                    if (result === DialogMessage_1.DialogMessage.yes) {
                        Utility_1.Utility.trackTelemetryStep(operationId, 'start server', () => this.startServer(operationId, server));
                    }
                }
                Utility_1.Utility.trackTelemetryStep(operationId, 'browse war', () => opn(new url_1.URL(warPackage.label, `${Constants.LOCALHOST}:${httpPort}`).toString()))();
            }
        });
    }
    deleteWarPackage(_operationId, warPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (warPackage) {
                yield fse.remove(warPackage.storagePath);
                vscode.commands.executeCommand('tomcat.tree.refresh');
            }
        });
    }
    revealWarPackage(warPackage) {
        if (warPackage) {
            opn(warPackage.storagePath);
        }
    }
    addServer(operationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathPick = yield Utility_1.Utility.trackTelemetryStep(operationId, 'select install path', () => vscode.window.showOpenDialog({
                defaultUri: vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined,
                canSelectFiles: false,
                canSelectFolders: true,
                openLabel: DialogMessage_1.DialogMessage.selectDirectory
            }));
            if (_.isEmpty(pathPick) || !pathPick[0].fsPath) {
                return;
            }
            const tomcatInstallPath = pathPick[0].fsPath;
            if (!(yield Utility_1.Utility.validateInstallPath(tomcatInstallPath))) {
                vscode.window.showErrorMessage(Constants.INVALID_SERVER_DIRECTORY);
                Utility_1.Utility.infoTelemetryStep(operationId, 'install path invalid');
                return;
            }
            Utility_1.Utility.infoTelemetryStep(operationId, 'construct server name');
            const existingServerNames = this._tomcatModel.getServerSet().map((item) => { return item.getName(); });
            const serverName = yield Utility_1.Utility.getServerName(tomcatInstallPath, this._tomcatModel.defaultStoragePath, existingServerNames);
            const catalinaBasePath = yield Utility_1.Utility.getServerStoragePath(this._tomcatModel.defaultStoragePath, serverName);
            yield fse.remove(catalinaBasePath);
            yield Utility_1.Utility.trackTelemetryStep(operationId, 'copy files', () => Promise.all([
                fse.copy(path.join(tomcatInstallPath, 'conf'), path.join(catalinaBasePath, 'conf'), { dereference: true }),
                fse.copy(path.join(this._extensionPath, 'resources', 'jvm.options'), path.join(catalinaBasePath, 'jvm.options')),
                fse.copy(path.join(this._extensionPath, 'resources', 'index.jsp'), path.join(catalinaBasePath, 'webapps', 'ROOT', 'index.jsp')),
                fse.copy(path.join(this._extensionPath, 'resources', 'icon.png'), path.join(catalinaBasePath, 'webapps', 'ROOT', 'icon.png')),
                fse.mkdirs(path.join(catalinaBasePath, 'logs')),
                fse.mkdirs(path.join(catalinaBasePath, 'temp')),
                fse.mkdirs(path.join(catalinaBasePath, 'work'))
            ]));
            yield Utility_1.Utility.copyServerConfig(path.join(tomcatInstallPath, 'conf', 'server.xml'), path.join(catalinaBasePath, 'conf', 'server.xml'));
            const tomcatServer = new TomcatServer_1.TomcatServer(serverName, tomcatInstallPath, catalinaBasePath);
            Utility_1.Utility.trackTelemetryStep(operationId, 'add server', () => this._tomcatModel.addServer(tomcatServer));
            return tomcatServer;
        });
    }
    customizeJVMOptions(tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tomcatServer) {
                if (!(yield fse.pathExists(tomcatServer.jvmOptionFile))) {
                    yield fse.copy(path.join(this._extensionPath, 'resources', 'jvm.options'), path.join(tomcatServer.getStoragePath(), 'jvm.options'));
                }
                Utility_1.Utility.openFile(tomcatServer.jvmOptionFile);
            }
        });
    }
    renameServer(operationId, tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.precheck(operationId, tomcatServer);
            if (server) {
                const newName = yield vscode.window.showInputBox({
                    prompt: 'input a new server name',
                    validateInput: (name) => {
                        if (name && !name.match(/^[\w.-]+$/)) {
                            return 'please input a valid server name';
                        }
                        else if (this._tomcatModel.getTomcatServer(name)) {
                            return 'the name was already taken, please re-input';
                        }
                        return null;
                    }
                });
                if (newName) {
                    Utility_1.Utility.trackTelemetryStep(operationId, 'rename', () => server.rename(newName));
                    yield this._tomcatModel.saveServerList();
                }
            }
        });
    }
    stopOrRestartServer(operationId, tomcatServer, restart = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.precheck(operationId, tomcatServer);
            if (server) {
                if (!server.isStarted()) {
                    vscode.window.showInformationMessage(DialogMessage_1.DialogMessage.serverStopped);
                    return;
                }
                if (!restart) {
                    server.clearDebugInfo();
                }
                server.needRestart = restart;
                yield Utility_1.Utility.trackTelemetryStep(operationId, restart ? 'restart' : 'stop', () => Utility_1.Utility.executeCMD(this._outputChannel, server.getName(), Utility_1.Utility.getJavaExecutable(), { shell: true }, ...server.jvmOptions.concat('stop')));
            }
        });
    }
    startServer(operationId, tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = tomcatServer ? tomcatServer : yield this.selectServer(operationId, true);
            if (server) {
                if (server.isStarted()) {
                    vscode.window.showInformationMessage(DialogMessage_1.DialogMessage.serverRunning);
                    return;
                }
                yield this.startTomcat(operationId, server);
            }
        });
    }
    runOrDebugOnServer(operationId, uri, debug, server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                const dialog = yield Utility_1.Utility.trackTelemetryStep(operationId, 'select war', () => vscode.window.showOpenDialog({
                    defaultUri: vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined,
                    canSelectFiles: true,
                    canSelectFolders: false,
                    openLabel: DialogMessage_1.DialogMessage.selectWarPackage
                }));
                if (_.isEmpty(dialog) || !dialog[0].fsPath) {
                    return;
                }
                uri = dialog[0];
            }
            if (!(yield this.isWebappPathValid(uri.fsPath))) {
                return;
            }
            server = !server ? yield this.selectServer(operationId, true) : server;
            if (!server) {
                return;
            }
            yield this.deployWebapp(operationId, server, uri.fsPath);
            if (server.isStarted() && ((!server.isDebugging() && !debug) || server.isDebugging() === debug)) {
                return;
            }
            if (debug) {
                yield this.prepareDebugInfo(operationId, server, uri);
            }
            else {
                server.clearDebugInfo();
            }
            if (server.isStarted()) {
                Utility_1.Utility.infoTelemetryStep(operationId, 'restart');
                yield this.stopOrRestartServer(operationId, server, true);
            }
            else {
                Utility_1.Utility.infoTelemetryStep(operationId, 'start');
                yield this.startTomcat(operationId, server);
            }
        });
    }
    browseServer(operationId, tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tomcatServer) {
                if (!tomcatServer.isStarted()) {
                    const result = yield vscode.window.showInformationMessage(DialogMessage_1.DialogMessage.startServer, DialogMessage_1.DialogMessage.yes, DialogMessage_1.DialogMessage.cancel);
                    if (result !== DialogMessage_1.DialogMessage.yes) {
                        return;
                    }
                    this.startServer(operationId, tomcatServer);
                }
                const httpPort = yield Utility_1.Utility.trackTelemetryStep(operationId, 'get http port', () => Utility_1.Utility.getPort(tomcatServer.getServerConfigPath(), Constants.PortKind.Http));
                Utility_1.Utility.infoTelemetryStep(operationId, 'browse server');
                opn(new url_1.URL(`${Constants.LOCALHOST}:${httpPort}`).toString());
            }
        });
    }
    generateWarPackage() {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = vscode.workspace.workspaceFolders;
            if (folders && folders.length > 0) {
                let items = [];
                if (folders.length > 1) {
                    items = yield vscode.window.showQuickPick(folders.map((w) => {
                        return { label: w.name, description: w.uri.fsPath };
                    }), { placeHolder: DialogMessage_1.DialogMessage.pickFolderToGenerateWar, canPickMany: true });
                }
                else {
                    items.push({
                        label: folders[0].name,
                        description: folders[0].uri.fsPath
                    });
                }
                yield Promise.all(items.map((i) => {
                    return Utility_1.Utility.executeCMD(this._outputChannel, undefined, 'jar', { cwd: i.description, shell: true }, 'cvf', ...[`"${i.label}.war"`, '*']);
                }));
                vscode.window.showInformationMessage(DialogMessage_1.DialogMessage.getWarGeneratedInfo(items.length));
            }
        });
    }
    dispose() {
        this._tomcatModel.getServerSet().forEach((element) => {
            if (element.isStarted()) {
                this.stopOrRestartServer((0, vscode_extension_telemetry_wrapper_1.createUuid)(), element);
            }
            this._outputChannel.dispose();
        });
        this._tomcatModel.saveServerListSync();
    }
    isWebappPathValid(webappPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield fse.pathExists(webappPath))) {
                return false;
            }
            const stat = yield new Promise((resolve, reject) => {
                fs.lstat(webappPath, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
            if (stat.isFile() && !this.isWarFile(webappPath)) {
                vscode.window.showErrorMessage(DialogMessage_1.DialogMessage.invalidWarFile);
                return false;
            }
            if (stat.isDirectory() && !(yield fse.pathExists(path.join(webappPath, 'WEB-INF')))) {
                vscode.window.showErrorMessage(DialogMessage_1.DialogMessage.invalidWebappFolder);
                return false;
            }
            return true;
        });
    }
    prepareDebugInfo(operationId, server, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server || !uri) {
                return;
            }
            let workspaceFolder;
            if (vscode.workspace.workspaceFolders) {
                workspaceFolder = vscode.workspace.workspaceFolders.find((f) => {
                    const relativePath = path.relative(f.uri.fsPath, uri.fsPath);
                    return relativePath === '' || (!relativePath.startsWith('..') && relativePath !== uri.fsPath);
                });
            }
            if (!workspaceFolder) {
                Utility_1.Utility.infoTelemetryStep(operationId, 'no proper workspace folder');
                vscode.window.showErrorMessage(DialogMessage_1.DialogMessage.noPackage);
                return;
            }
            Utility_1.Utility.infoTelemetryStep(operationId, 'get debug port');
            const port = yield portfinder.getPortPromise();
            server.setDebugInfo(port, workspaceFolder);
        });
    }
    selectServer(operationId, createIfNoneServer = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._tomcatModel.getServerSet();
            if (_.isEmpty(items) && !createIfNoneServer) {
                return;
            }
            if (items.length === 1) {
                Utility_1.Utility.infoTelemetryStep(operationId, 'auto select the only server');
                return items[0];
            }
            items = createIfNoneServer ? items.concat({ label: `$(plus) ${DialogMessage_1.DialogMessage.addServer}`, description: '' }) : items;
            const pick = yield vscode.window.showQuickPick(items, { placeHolder: createIfNoneServer && items.length === 1 ? DialogMessage_1.DialogMessage.addServer : DialogMessage_1.DialogMessage.selectServer });
            if (pick) {
                if (pick instanceof TomcatServer_1.TomcatServer) {
                    Utility_1.Utility.infoTelemetryStep(operationId, 'select server');
                    return pick;
                }
                else {
                    Utility_1.Utility.infoTelemetryStep(operationId, 'add server');
                    return yield this.addServer(operationId);
                }
            }
        });
    }
    deployWebapp(operationId, server, webappPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server || !(yield fse.pathExists(webappPath))) {
                return;
            }
            const appName = yield this.determineAppName(webappPath, server);
            const appPath = path.join(server.getStoragePath(), 'webapps', appName);
            yield fse.remove(appPath);
            yield fse.mkdirs(appPath);
            if (this.isWarFile(webappPath)) {
                Utility_1.Utility.infoTelemetryStep(operationId, 'deploy war');
                yield Utility_1.Utility.executeCMD(this._outputChannel, server.getName(), 'jar', { cwd: appPath }, 'xvf', `${webappPath}`);
            }
            else {
                Utility_1.Utility.infoTelemetryStep(operationId, 'deploy web app folder');
                yield fse.copy(webappPath, appPath);
            }
            vscode.commands.executeCommand('tomcat.tree.refresh');
        });
    }
    isWarFile(filePath) {
        return path.extname(filePath).toLocaleLowerCase() === '.war';
    }
    /* tslint:disable:no-any */
    determineAppName(webappPath, server) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const defaultName = path.basename(webappPath, path.extname(webappPath));
            let appName = defaultName;
            let folderLocation;
            if (this.isWarFile(webappPath)) {
                folderLocation = path.join(this._tomcatModel.defaultStoragePath, defaultName);
                yield fse.remove(folderLocation);
                yield fse.mkdir(folderLocation);
                yield Utility_1.Utility.executeCMD(this._outputChannel, server.getName(), 'jar', { cwd: folderLocation }, 'xvf', `${webappPath}`);
            }
            else {
                folderLocation = webappPath;
            }
            if (yield fse.pathExists(path.join(folderLocation, 'META-INF', 'context.xml'))) {
                const xml = fs.readFileSync(path.join(folderLocation, 'META-INF', 'context.xml'), 'utf8');
                const jsonFromXml = yield Utility_1.Utility.parseXml(xml);
                if (jsonFromXml) {
                    if (((_b = (_a = jsonFromXml === null || jsonFromXml === void 0 ? void 0 : jsonFromXml.Context) === null || _a === void 0 ? void 0 : _a.$) === null || _b === void 0 ? void 0 : _b.path) !== undefined) {
                        appName = this.parseContextPathToFolderName(jsonFromXml.Context.$.path);
                    }
                    else if (((_d = (_c = jsonFromXml === null || jsonFromXml === void 0 ? void 0 : jsonFromXml.context) === null || _c === void 0 ? void 0 : _c.$) === null || _d === void 0 ? void 0 : _d.path) !== undefined) {
                        appName = this.parseContextPathToFolderName(jsonFromXml.context.$.path);
                    }
                }
            }
            return appName;
        });
    }
    /* tsline:enable:no-any */
    parseContextPathToFolderName(context) {
        if (context === '/' || context === '') {
            return 'ROOT';
        }
        const replacedSlashes = context.replace('/', '#');
        return replacedSlashes.startsWith('#') ? replacedSlashes.substring(1) : replacedSlashes;
    }
    startDebugSession(operationId, server) {
        if (!server || !server.getDebugPort() || !server.getDebugWorkspace()) {
            return;
        }
        const config = {
            type: 'java',
            name: `${Constants.DEBUG_SESSION_NAME}_${server.basePathName}`,
            request: 'attach',
            hostName: 'localhost',
            port: server.getDebugPort()
        };
        Utility_1.Utility.infoTelemetryStep(operationId, 'start debug');
        setTimeout(() => vscode.debug.startDebugging(server.getDebugWorkspace(), config), 500);
    }
    startTomcat(operationId, serverInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverName = serverInfo.getName();
            let watcher;
            const serverConfig = serverInfo.getServerConfigPath();
            const serverPort = yield Utility_1.Utility.getPort(serverConfig, Constants.PortKind.Server);
            const httpPort = yield Utility_1.Utility.getPort(serverConfig, Constants.PortKind.Http);
            const httpsPort = yield Utility_1.Utility.getPort(serverConfig, Constants.PortKind.Https);
            try {
                yield this._tomcatModel.updateJVMOptions(serverName);
                watcher = chokidar.watch(serverConfig);
                watcher.on('change', () => __awaiter(this, void 0, void 0, function* () {
                    if (serverPort !== (yield Utility_1.Utility.getPort(serverConfig, Constants.PortKind.Server))) {
                        Utility_1.Utility.infoTelemetryStep(operationId, 'server port changed');
                        const result = yield vscode.window.showErrorMessage(DialogMessage_1.DialogMessage.getServerPortChangeErrorMessage(serverName, serverPort), DialogMessage_1.DialogMessage.yes, DialogMessage_1.DialogMessage.no, DialogMessage_1.DialogMessage.moreInfo);
                        if (result === DialogMessage_1.DialogMessage.yes) {
                            Utility_1.Utility.infoTelemetryStep(operationId, 'revert');
                            yield Utility_1.Utility.setPort(serverConfig, Constants.PortKind.Server, serverPort);
                        }
                        else if (result === DialogMessage_1.DialogMessage.moreInfo) {
                            Utility_1.Utility.infoTelemetryStep(operationId, 'more info clicked');
                            opn(Constants.UNABLE_SHUTDOWN_URL);
                        }
                    }
                    else if (yield Utility_1.Utility.needRestart(httpPort, httpsPort, serverConfig)) {
                        Utility_1.Utility.infoTelemetryStep(operationId, 'http(s) port changed');
                        const item = yield vscode.window.showWarningMessage(DialogMessage_1.DialogMessage.getConfigChangedMessage(serverName), DialogMessage_1.DialogMessage.yes, DialogMessage_1.DialogMessage.no, DialogMessage_1.DialogMessage.never);
                        if (item === DialogMessage_1.DialogMessage.yes) {
                            yield this.stopOrRestartServer(operationId, serverInfo, true);
                        }
                        else if (item === DialogMessage_1.DialogMessage.never) {
                            Utility_1.Utility.infoTelemetryStep(operationId, 'disable auto restart');
                            Utility_1.Utility.disableAutoRestart();
                        }
                    }
                }));
                let startArguments = serverInfo.jvmOptions.slice();
                if (serverInfo.getDebugPort()) {
                    startArguments = [`${Constants.DEBUG_ARGUMENT_KEY}${serverInfo.getDebugPort()}`].concat(startArguments);
                }
                startArguments.push('start');
                const javaProcess = Utility_1.Utility.executeCMD(this._outputChannel, serverInfo.getName(), Utility_1.Utility.getJavaExecutable(), { shell: true }, ...startArguments);
                serverInfo.setStarted(true);
                this.startDebugSession(operationId, serverInfo);
                yield javaProcess;
                serverInfo.setStarted(false);
                watcher.close();
                if (serverInfo.needRestart) {
                    serverInfo.needRestart = false;
                    yield this.startTomcat(operationId, serverInfo);
                }
            }
            catch (err) {
                serverInfo.setStarted(false);
                if (watcher) {
                    watcher.close();
                }
                (0, vscode_extension_telemetry_wrapper_1.sendOperationError)(operationId, 'startTomcat', err);
                vscode.window.showErrorMessage(err.toString());
            }
        });
    }
    precheck(operationId, tomcatServer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(this._tomcatModel.getServerSet())) {
                vscode.window.showInformationMessage(DialogMessage_1.DialogMessage.noServer);
                return;
            }
            return tomcatServer ? tomcatServer : yield this.selectServer(operationId);
        });
    }
}
exports.TomcatController = TomcatController;
//# sourceMappingURL=TomcatController.js.map