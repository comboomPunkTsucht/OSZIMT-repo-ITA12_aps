'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const _ = require("lodash");
const opn = require("opn");
const path = require("path");
const portfinder = require("portfinder");
const url_1 = require("url");
const vscode = require("vscode");
const Constants = require("./Constants");
const JettyServer_1 = require("./JettyServer");
const Utility = require("./Utility");
class JettyServerController {
    constructor(_jettyServerModel, _extensionPath) {
        this._jettyServerModel = _jettyServerModel;
        this._extensionPath = _extensionPath;
        this._outputChannel = vscode.window.createOutputChannel('vscode-jetty');
    }
    addServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const pathPick = yield vscode.window.showOpenDialog({
                defaultUri: vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined,
                canSelectFiles: false,
                canSelectFolders: true,
                openLabel: Constants.SELECT_JETTY_DIRECTORY
            });
            if (_.isEmpty(pathPick) || !pathPick[0].fsPath) {
                return;
            }
            const installPath = pathPick[0].fsPath;
            if (!(yield Utility.validateInstallPath(installPath))) {
                vscode.window.showErrorMessage('The selected directory is not a valid Jetty server direcotry');
                return;
            }
            const existingServerNames = this._jettyServerModel.getServerSet().map((item) => { return item.name; });
            const serverName = yield Utility.getServerName(installPath, this._jettyServerModel.defaultStoragePath, existingServerNames);
            const jettyHome = path.join(installPath, 'start.jar');
            const jettyBase = yield Utility.getServerStoragePath(this._jettyServerModel.defaultStoragePath, serverName);
            const newServer = new JettyServer_1.JettyServer(serverName, installPath, jettyBase);
            this._jettyServerModel.addServer(newServer);
            yield Promise.all([
                fse.copy(path.join(installPath, 'demo-base', 'start.d'), path.join(jettyBase, 'start.d')),
                fse.copy(path.join(installPath, 'start.ini'), path.join(jettyBase, 'start.ini')),
                fse.copy(path.join(installPath, 'demo-base', 'etc'), path.join(jettyBase, 'etc')),
                fse.copy(path.join(this._extensionPath, 'resources', 'ROOT'), path.join(jettyBase, 'webapps', 'ROOT'))
            ]);
            return newServer;
        });
    }
    startServer(server) {
        return __awaiter(this, void 0, void 0, function* () {
            server = server ? server : yield this.selectServer(true);
            if (server) {
                if (server.isRunning()) {
                    vscode.window.showInformationMessage(Constants.SERVER_RUNNING);
                    return;
                }
                try {
                    const debugPort = yield server.getDebugPort();
                    const stopPort = yield portfinder.getPortPromise({ port: debugPort + 1, host: '127.0.0.1' });
                    server.startArguments = ['-jar', path.join(server.installPath, 'start.jar'), `"jetty.base=${server.storagePath}"`, `"-DSTOP.PORT=${stopPort}"`, '"-DSTOP.KEY=STOP"'];
                    const args = debugPort ? ['-Xdebug', `-agentlib:jdwp=transport=dt_socket,address=${debugPort},server=y,suspend=n`].concat(server.startArguments) : server.startArguments;
                    const javaProcess = Utility.execute(this._outputChannel, server.name, 'java', { shell: true }, ...args);
                    server.setStarted(true);
                    if (debugPort) {
                        this.startDebugSession(server);
                    }
                    yield javaProcess;
                    server.setStarted(false);
                    if (server.restart) {
                        server.restart = false;
                        yield this.startServer(server);
                    }
                }
                catch (err) {
                    server.setStarted(false);
                    vscode.window.showErrorMessage(err.toString());
                }
            }
        });
    }
    deleteServer(server) {
        return __awaiter(this, void 0, void 0, function* () {
            server = yield this.precheck(server);
            if (server) {
                if (server.isRunning()) {
                    const confirmation = yield vscode.window.showWarningMessage(Constants.DELETE_CONFIRM, Constants.YES, Constants.CANCEL);
                    if (confirmation !== Constants.YES) {
                        return;
                    }
                    yield this.stopServer(server);
                }
                this._jettyServerModel.deleteServer(server);
            }
        });
    }
    stopServer(server, restart) {
        return __awaiter(this, void 0, void 0, function* () {
            server = yield this.precheck(server);
            if (server) {
                if (!server.isRunning()) {
                    vscode.window.showInformationMessage(Constants.SERVER_STOPPED);
                    return;
                }
                if (!restart) {
                    server.clearDebugInfo();
                }
                server.restart = restart;
                yield Utility.execute(this._outputChannel, server.name, 'java', { shell: true }, ...server.startArguments.concat('--stop'));
            }
        });
    }
    runWarPackage(uri, debug, server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                const dialog = yield vscode.window.showOpenDialog({
                    defaultUri: vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined,
                    canSelectFiles: true,
                    canSelectFolders: false,
                    openLabel: Constants.SELECT_WAR_PACKAGE
                });
                if (_.isEmpty(dialog) || !dialog[0].fsPath) {
                    return;
                }
                uri = dialog[0];
            }
            const packagePath = uri.fsPath;
            if (!server) {
                server = yield this.selectServer(true);
            }
            if (!server) {
                return;
            }
            yield this.deployPackage(server, packagePath);
            if (server.isRunning() && ((!server.isDebugging() && !debug) || server.isDebugging() === debug)) {
                return;
            }
            let port;
            let workspaceFolder;
            if (debug) {
                if (vscode.workspace.workspaceFolders) {
                    workspaceFolder = vscode.workspace.workspaceFolders.find((f) => {
                        const relativePath = path.relative(f.uri.fsPath, packagePath);
                        return relativePath === '' || (!relativePath.startsWith('..') && relativePath !== packagePath);
                    });
                }
                if (!workspaceFolder) {
                    vscode.window.showErrorMessage(Constants.NO_PACKAGE);
                    return;
                }
                port = yield portfinder.getPortPromise({ host: '127.0.0.1' });
            }
            server.setDebugInfo(debug, port, workspaceFolder);
            if (server.isRunning()) {
                yield this.stopServer(server, true);
            }
            else {
                yield this.startServer(server);
            }
        });
    }
    browseServer(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (server) {
                if (!server.isRunning()) {
                    const result = yield vscode.window.showInformationMessage(Constants.START_SERVER, Constants.YES, Constants.NO);
                    if (result !== Constants.YES) {
                        return;
                    }
                    this.startServer(server);
                }
                const httpPort = yield Utility.getConfig(server.storagePath, 'http.ini', 'jetty.http.port');
                opn(new url_1.URL(`${Constants.LOCALHOST}:${httpPort}`).toString());
            }
        });
    }
    renameServer(server) {
        return __awaiter(this, void 0, void 0, function* () {
            server = yield this.precheck(server);
            if (server) {
                const newName = yield vscode.window.showInputBox({
                    prompt: 'input a new server name',
                    validateInput: (name) => {
                        if (!name.match(/^[\w.-]+$/)) {
                            return 'please input a valid server name';
                        }
                        else if (this._jettyServerModel.getJettyServer(name)) {
                            return 'the name was already taken, please re-input';
                        }
                        return null;
                    }
                });
                if (newName) {
                    server.rename(newName);
                    yield this._jettyServerModel.saveServerList();
                }
            }
        });
    }
    deleteWarPackage(warPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (warPackage) {
                yield fse.remove(warPackage.storagePath);
                yield fse.remove(`${warPackage.storagePath}.war`);
                vscode.commands.executeCommand('jetty.tree.refresh');
            }
        });
    }
    revealWarPackage(warPackage) {
        if (warPackage) {
            opn(warPackage.storagePath);
        }
    }
    browseWarPackage(warPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (warPackage) {
                const server = this._jettyServerModel.getJettyServer(warPackage.serverName);
                const httpPort = yield Utility.getConfig(server.storagePath, 'http.ini', 'jetty.http.port');
                if (!httpPort) {
                    vscode.window.showErrorMessage(Constants.HTTP_PORT_UNDEFINED);
                    return;
                }
                if (!server.isRunning()) {
                    const result = yield vscode.window.showInformationMessage(Constants.START_SERVER, Constants.YES, Constants.NO);
                    if (result === Constants.YES) {
                        this.startServer(server);
                    }
                }
                opn(new url_1.URL(warPackage.label, `${Constants.LOCALHOST}:${httpPort}`).toString());
            }
        });
    }
    generateWarPackage() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = vscode.workspace.name;
            yield Utility.execute(this._outputChannel, undefined, 'jar', { cwd: vscode.workspace.rootPath, shell: true }, 'cvf', ...[`"${name}.war"`, '*']);
        });
    }
    // tslint:disable-next-line:no-empty
    dispose() {
        this._jettyServerModel.getServerSet().forEach((element) => {
            if (element.isRunning()) {
                this.stopServer(element);
            }
            this._outputChannel.dispose();
        });
        this._jettyServerModel.saveServerListSync();
    }
    startDebugSession(server) {
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
        setTimeout(() => vscode.debug.startDebugging(server.getDebugWorkspace(), config), 500);
    }
    deployPackage(server, packagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const appName = path.basename(packagePath, path.extname(packagePath));
            const appPath = path.join(server.storagePath, 'webapps', appName);
            yield fse.remove(appPath);
            yield fse.mkdirs(appPath);
            yield Utility.execute(this._outputChannel, server.name, 'jar', { cwd: appPath }, 'xvf', `${packagePath}`);
            vscode.commands.executeCommand('jetty.tree.refresh');
        });
    }
    precheck(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(this._jettyServerModel.getServerSet())) {
                vscode.window.showInformationMessage(Constants.NO_SERVER);
                return;
            }
            return server ? server : yield this.selectServer();
        });
    }
    selectServer(createIfNoneServer = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._jettyServerModel.getServerSet();
            if (_.isEmpty(items) && !createIfNoneServer) {
                return;
            }
            if (items.length === 1) {
                return items[0];
            }
            items = createIfNoneServer ? items.concat({ label: `$(plus) ${Constants.ADD_SERVER}`, description: '' }) : items;
            const pick = yield vscode.window.showQuickPick(items, { placeHolder: createIfNoneServer && items.length === 1 ? Constants.ADD_SERVER : Constants.SELECT_SERVER });
            if (pick) {
                if (pick instanceof JettyServer_1.JettyServer) {
                    return pick;
                }
                else {
                    return yield this.addServer();
                }
            }
        });
    }
}
exports.JettyServerController = JettyServerController;
//# sourceMappingURL=JettyServerController.js.map