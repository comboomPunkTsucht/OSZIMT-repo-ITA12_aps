'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const Constants = require("./Constants");
class JettyServer extends vscode.TreeItem {
    constructor(name, installPath, storagePath) {
        super(name);
        this.name = name;
        this.installPath = installPath;
        this.storagePath = storagePath;
        this.restart = false;
        this._isDebugging = false;
        this.state = Constants.SERVER_STATE.IdleServer;
        this.basePathName = path.basename(storagePath);
    }
    setStarted(running) {
        this.state = running ? Constants.SERVER_STATE.RunningServer : Constants.SERVER_STATE.IdleServer;
        vscode.commands.executeCommand('jetty.tree.refresh');
    }
    isRunning() {
        return this.state === Constants.SERVER_STATE.RunningServer;
    }
    isDebugging() {
        return this._isDebugging;
    }
    setDebugInfo(debugging, port, workspace) {
        this._isDebugging = debugging;
        this._debugPort = port;
        this._debugWorkspace = workspace;
    }
    getDebugWorkspace() {
        return this._debugWorkspace;
    }
    clearDebugInfo() {
        this._isDebugging = false;
        this._debugPort = undefined;
        this._debugWorkspace = undefined;
    }
    getDebugPort() {
        return this._debugPort;
    }
    rename(newName) {
        this.name = newName;
        this.label = newName;
    }
}
exports.JettyServer = JettyServer;
//# sourceMappingURL=JettyServer.js.map