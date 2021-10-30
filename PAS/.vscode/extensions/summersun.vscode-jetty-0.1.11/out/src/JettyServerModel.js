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
const os = require("os");
const path = require("path");
const vscode = require("vscode");
const Constants = require("./Constants");
const JettyServer_1 = require("./JettyServer");
class JettyServerModel {
    constructor(defaultStoragePath) {
        this.defaultStoragePath = defaultStoragePath;
        this._serverList = [];
        this._serversJsonFile = path.join(os.homedir(), '.vscode-jetty/servers.json');
        this.initServerListSync();
        vscode.debug.onDidTerminateDebugSession((session) => {
            if (session && session.name && session.name.startsWith(Constants.DEBUG_SESSION_NAME)) {
                this.clearServerDebugInfo(session.name.split('_').pop());
            }
        });
    }
    getServerSet() {
        return this._serverList;
    }
    getJettyServer(serverName) {
        return this._serverList.find((item) => item.name === serverName);
    }
    saveServerList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fse.outputJson(this._serversJsonFile, this._serverList.map((s) => {
                    return { _name: s.name, _installPath: s.installPath, _storagePath: s.storagePath };
                }));
                vscode.commands.executeCommand('jetty.tree.refresh');
            }
            catch (err) {
                console.error(err.toString());
            }
        });
    }
    deleteServer(server) {
        const index = this._serverList.findIndex((item) => item.name === server.name);
        if (index > -1) {
            const oldServer = this._serverList.splice(index, 1);
            if (!_.isEmpty(oldServer)) {
                fse.remove(server.storagePath);
                this.saveServerList();
                return true;
            }
        }
        return false;
    }
    addServer(server) {
        const index = this._serverList.findIndex((item) => item.name === server.name);
        if (index > -1) {
            this._serverList.splice(index, 1);
        }
        this._serverList.push(server);
        this.saveServerList();
    }
    saveServerListSync() {
        try {
            fse.outputJsonSync(this._serversJsonFile, this._serverList.map((s) => {
                return { _name: s.name, _installPath: s.installPath, _storagePath: s.storagePath };
            }));
        }
        catch (err) {
            console.error(err.toString());
        }
    }
    initServerListSync() {
        try {
            if (fse.existsSync(this._serversJsonFile)) {
                const objArray = fse.readJsonSync(this._serversJsonFile);
                if (!_.isEmpty(objArray)) {
                    this._serverList = this._serverList.concat(objArray.map((obj) => {
                        return new JettyServer_1.JettyServer(obj._name, obj._installPath, obj._storagePath);
                    }));
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    clearServerDebugInfo(basePathName) {
        const server = this._serverList.find((s) => { return s.basePathName === basePathName; });
        if (server) {
            server.clearDebugInfo();
        }
    }
}
exports.JettyServerModel = JettyServerModel;
//# sourceMappingURL=JettyServerModel.js.map