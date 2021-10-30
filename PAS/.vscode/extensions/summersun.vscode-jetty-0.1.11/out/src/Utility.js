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
const child_process = require("child_process");
const fse = require("fs-extra");
const ini = require("ini");
const os = require("os");
const path = require("path");
const vscode = require("vscode");
function validateInstallPath(installPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const startJarFileExists = fse.pathExists(path.join(installPath, 'start.jar'));
        const startInIFileExists = fse.pathExists(path.join(installPath, 'start.ini'));
        return (yield startJarFileExists) && (yield startInIFileExists);
    });
}
exports.validateInstallPath = validateInstallPath;
function execute(outputChannel, prefix, command, options, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve, reject) => {
            outputChannel.show();
            let stderr = '';
            const p = child_process.spawn(command, args, options);
            p.stdout.on('data', (data) => outputChannel.append(`[${prefix}]: ${data.toString()}`));
            p.stderr.on('data', (data) => {
                stderr = stderr.concat(data.toString());
                outputChannel.append(`[${prefix}]: ${data.toString()}`);
            });
            p.on('error', (err) => {
                reject(err);
            });
            p.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Command failed with exit code ${code}`));
                }
                resolve();
            });
        });
    });
}
exports.execute = execute;
function getConfig(storagePath, file, key) {
    return __awaiter(this, void 0, void 0, function* () {
        // tslint:disable-next-line:no-any
        let config = ini.parse(yield fse.readFile(path.join(storagePath, 'start.d', file), 'utf-8'));
        let result = config[key];
        if (!result && (yield fse.pathExists(path.join(storagePath, 'start.ini')))) {
            config = ini.parse(yield fse.readFile(path.join(storagePath, 'start.ini'), 'utf-8'));
            result = config[key];
        }
        return result ? result : '8080';
    });
}
exports.getConfig = getConfig;
function getServerName(installPath, defaultStoragePath, existingServerNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspace = yield getWorkspace(defaultStoragePath);
        yield fse.ensureDir(workspace);
        const fileNames = yield fse.readdir(workspace);
        let serverName = path.basename(installPath);
        let index = 1;
        while (fileNames.indexOf(serverName) >= 0 || existingServerNames.indexOf(serverName) >= 0) {
            serverName = path.basename(installPath).concat(`-${index}`);
            index += 1;
        }
        return serverName;
    });
}
exports.getServerName = getServerName;
function getServerStoragePath(defaultStoragePath, serverName) {
    return __awaiter(this, void 0, void 0, function* () {
        return path.join(yield getWorkspace(defaultStoragePath), serverName);
    });
}
exports.getServerStoragePath = getServerStoragePath;
function getTempStoragePath() {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let result = '';
    for (let i = 0; i < 5; i += 1) {
        // tslint:disable-next-line:insecure-random
        const idx = Math.floor(chars.length * Math.random());
        result += chars[idx];
    }
    return path.resolve(os.tmpdir(), `vscodejetty_${result}`);
}
exports.getTempStoragePath = getTempStoragePath;
function getWorkspace(defaultStoragePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = vscode.workspace.getConfiguration('jetty');
        if (config) {
            // tslint:disable-next-line:no-backbone-get-set-outside-model
            const workspace = config.get('workspace');
            if (workspace && workspace !== '') {
                yield fse.ensureDir(workspace);
                return workspace;
            }
        }
        return path.join(defaultStoragePath, 'jetty');
    });
}
//# sourceMappingURL=Utility.js.map