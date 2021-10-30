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
exports.Utility = void 0;
const child_process = require("child_process");
const fse = require("fs-extra");
const os = require("os");
const path = require("path");
const readline = require("readline");
const vscode = require("vscode");
const vscode_extension_telemetry_wrapper_1 = require("vscode-extension-telemetry-wrapper");
const xml2js = require("xml2js");
const Constants = require("./Constants");
const DialogMessage_1 = require("./DialogMessage");
const localize_1 = require("./localize");
const isWindows = process.platform.indexOf('win') === 0;
const JAVA_FILENAME = 'java' + (isWindows ? '.exe' : '');
/* tslint:disable:no-any */
var Utility;
(function (Utility) {
    function executeCMD(outputPane, serverName, command, options, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                var _a;
                outputPane.show();
                let stderr = '';
                options.env = Object.assign(Object.assign({}, ((_a = options.env) !== null && _a !== void 0 ? _a : {})), Utility.getCustomEnv());
                const commandToSpawn = command.includes(" ") ? `"${command}"` : command; // workaround for path containing whitespace.
                const p = child_process.spawn(commandToSpawn, args, options);
                p.stdout.on('data', (data) => outputPane.append(serverName ? `[${serverName}]: ${data.toString()}` : data.toString()));
                p.stderr.on('data', (data) => {
                    stderr = stderr.concat(data.toString());
                    outputPane.append(serverName ? `[${serverName}]: ${data.toString()}` : data.toString());
                });
                p.on('error', (err) => {
                    reject(err);
                });
                p.on('exit', (code) => {
                    if (code !== 0) {
                        reject(new Error((0, localize_1.localize)('tomcatExt.commandfailed', 'Command failed with exit code {0}', code)));
                    }
                    resolve();
                });
            });
        });
    }
    Utility.executeCMD = executeCMD;
    function openFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield fse.pathExists(file))) {
                throw new Error((0, localize_1.localize)('tomcatExt.fileNotExist', `File ${file} does not exist.`));
            }
            vscode.window.showTextDocument(vscode.Uri.file(file), { preview: false });
        });
    }
    Utility.openFile = openFile;
    function trackTelemetryStep(operationId, step, callback) {
        return (0, vscode_extension_telemetry_wrapper_1.instrumentOperationStep)(operationId, step, callback)();
    }
    Utility.trackTelemetryStep = trackTelemetryStep;
    function infoTelemetryStep(operationId, step) {
        (0, vscode_extension_telemetry_wrapper_1.sendInfo)(operationId, { finishedStep: step });
    }
    Utility.infoTelemetryStep = infoTelemetryStep;
    function disableAutoRestart() {
        const config = vscode.workspace.getConfiguration('tomcat');
        if (config) {
            config.update(Constants.RESTART_CONFIG_ID, false, true);
        }
    }
    Utility.disableAutoRestart = disableAutoRestart;
    function getServerStoragePath(defaultStoragePath, serverName) {
        return __awaiter(this, void 0, void 0, function* () {
            return path.join(yield getWorkspace(defaultStoragePath), serverName);
        });
    }
    Utility.getServerStoragePath = getServerStoragePath;
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
    Utility.getServerName = getServerName;
    function getWorkspace(defaultStoragePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = vscode.workspace.getConfiguration('tomcat');
            if (config) {
                // tslint:disable-next-line:no-backbone-get-set-outside-model
                const workspace = config.get('workspace');
                if (workspace && workspace !== '') {
                    yield fse.ensureDir(workspace);
                    return workspace;
                }
            }
            return path.join(defaultStoragePath, 'tomcat');
        });
    }
    function validateInstallPath(installPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const configFileExists = fse.pathExists(path.join(installPath, 'conf', 'server.xml'));
            const serverWebFileExists = fse.pathExists(path.join(installPath, 'conf', 'web.xml'));
            const serverBootstrapJarFileExists = fse.pathExists(path.join(installPath, 'bin', 'bootstrap.jar'));
            const serverJuliJarFileExists = fse.pathExists(path.join(installPath, 'bin', 'tomcat-juli.jar'));
            return (yield configFileExists) && (yield serverWebFileExists) && (yield serverBootstrapJarFileExists) && (yield serverJuliJarFileExists);
        });
    }
    Utility.validateInstallPath = validateInstallPath;
    function needRestart(httpPort, httpsPort, serverConfog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHttpPort = yield getPort(serverConfog, Constants.PortKind.Http);
            const newHttpsPort = yield getPort(serverConfog, Constants.PortKind.Https);
            let restartConfig = false;
            const config = vscode.workspace.getConfiguration('tomcat');
            if (config) {
                restartConfig = config.get(Constants.RESTART_CONFIG_ID);
            }
            return restartConfig && (httpPort !== newHttpPort || httpsPort !== newHttpsPort);
        });
    }
    Utility.needRestart = needRestart;
    function readFileLineByLine(file, filterFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            yield new Promise((resolve) => {
                const lineReader = readline.createInterface({
                    input: fse.createReadStream(file),
                    crlfDelay: Infinity
                });
                lineReader.on('line', (line) => {
                    if (!filterFunction || filterFunction(line)) {
                        result = result.concat(line);
                    }
                });
                lineReader.on('close', () => {
                    resolve();
                });
            });
            return result;
        });
    }
    Utility.readFileLineByLine = readFileLineByLine;
    function getTempStoragePath() {
        const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        let result = '';
        for (let i = 0; i < 5; i += 1) {
            // tslint:disable-next-line:insecure-random
            const idx = Math.floor(chars.length * Math.random());
            result += chars[idx];
        }
        return path.resolve(os.tmpdir(), `vscodetomcat_${result}`);
    }
    Utility.getTempStoragePath = getTempStoragePath;
    function getPort(serverXml, kind) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield fse.pathExists(serverXml))) {
                throw new Error(DialogMessage_1.DialogMessage.noServer);
            }
            const xml = yield fse.readFile(serverXml, 'utf8');
            let port;
            try {
                const jsonObj = yield parseXml(xml);
                if (kind === Constants.PortKind.Server) {
                    port = jsonObj.Server.$.port;
                }
                else if (kind === Constants.PortKind.Http) {
                    port = jsonObj.Server.Service.find((item) => item.$.name === Constants.CATALINA).Connector.find((item) => (item.$.protocol === undefined || item.$.protocol.startsWith(Constants.HTTP))).$.port;
                }
                else if (kind === Constants.PortKind.Https) {
                    port = jsonObj.Server.Service.find((item) => item.$.name === Constants.CATALINA).Connector.find((item) => (item.$.SSLEnabled.toLowerCase() === 'true')).$.port;
                }
            }
            catch (err) {
                port = undefined;
            }
            return port;
        });
    }
    Utility.getPort = getPort;
    function setPort(serverXml, kind, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield fse.pathExists(serverXml))) {
                throw new Error(DialogMessage_1.DialogMessage.noServer);
            }
            const xml = yield fse.readFile(serverXml, 'utf8');
            const jsonObj = yield parseXml(xml);
            if (kind === Constants.PortKind.Server) {
                jsonObj.Server.$.port = value;
            }
            else {
                const catalinaService = jsonObj.Server.Service.find((item) => item.$.name === Constants.CATALINA);
                if (kind === Constants.PortKind.Http) {
                    const httpConnector = catalinaService.Connector.find((item) => (!item.$.protocol || item.$.protocol.startsWith(Constants.HTTP)));
                    httpConnector.$.port = value;
                }
                else if (kind === Constants.PortKind.Https) {
                    const httpsConnector = catalinaService.Connector.find((item) => (item.$.SSLEnabled.toLowerCase() === 'true'));
                    httpsConnector.$.port = value;
                }
            }
            const builder = new xml2js.Builder();
            const newXml = builder.buildObject(jsonObj);
            yield fse.writeFile(serverXml, newXml);
        });
    }
    Utility.setPort = setPort;
    function copyServerConfig(source, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const xml = yield fse.readFile(source, 'utf8');
            const jsonObj = yield parseXml(xml);
            const builder = new xml2js.Builder();
            const newXml = builder.buildObject(jsonObj);
            yield fse.ensureFile(target);
            yield fse.writeFile(target, newXml);
        });
    }
    Utility.copyServerConfig = copyServerConfig;
    function parseXml(xml) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                xml2js.parseString(xml, { explicitArray: true }, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });
            });
        });
    }
    Utility.parseXml = parseXml;
    function getJavaExecutable() {
        const customEnv = getCustomEnv();
        let javaPath = customEnv["JAVA_HOME"];
        if (!javaPath) {
            // fallback to read java.home from redhat.java extension
            const config = vscode.workspace.getConfiguration('java');
            if (config) {
                javaPath = config.get('home');
            }
        }
        return javaPath ? path.join(javaPath, 'bin', JAVA_FILENAME) : JAVA_FILENAME;
    }
    Utility.getJavaExecutable = getJavaExecutable;
    function getCustomEnv() {
        var _a;
        const tomcatConfig = vscode.workspace.getConfiguration('tomcat');
        const config = (_a = tomcatConfig === null || tomcatConfig === void 0 ? void 0 : tomcatConfig.get('customEnv')) !== null && _a !== void 0 ? _a : [];
        const customEnv = {};
        config.forEach((env) => {
            customEnv[env.environmentVariable] = env.value;
        });
        return Object.assign(Object.assign({}, process.env), customEnv);
    }
    Utility.getCustomEnv = getCustomEnv;
})(Utility = exports.Utility || (exports.Utility = {}));
//# sourceMappingURL=Utility.js.map