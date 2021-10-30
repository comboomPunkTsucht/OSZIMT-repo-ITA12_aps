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
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const vscode_extension_telemetry_wrapper_1 = require("vscode-extension-telemetry-wrapper");
const TomcatController_1 = require("./Tomcat/TomcatController");
const TomcatModel_1 = require("./Tomcat/TomcatModel");
const TomcatSeverTreeProvider_1 = require("./TomcatSeverTreeProvider");
const Utility_1 = require("./Utility");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, vscode_extension_telemetry_wrapper_1.initializeFromJsonFile)(context.asAbsolutePath('./package.json'), { firstParty: true });
        yield (0, vscode_extension_telemetry_wrapper_1.instrumentOperation)('activation', initializeExtension)(context);
    });
}
exports.activate = activate;
function initializeExtension(_opId, context) {
    return __awaiter(this, void 0, void 0, function* () {
        let storagePath = context.storagePath;
        if (!storagePath) {
            storagePath = Utility_1.Utility.getTempStoragePath();
        }
        const tomcatModel = new TomcatModel_1.TomcatModel(storagePath);
        const tomcatServerTree = new TomcatSeverTreeProvider_1.TomcatSeverTreeProvider(context, tomcatModel);
        const tomcatController = new TomcatController_1.TomcatController(tomcatModel, context.extensionPath);
        context.subscriptions.push(tomcatController);
        context.subscriptions.push(tomcatServerTree);
        context.subscriptions.push(vscode.window.registerTreeDataProvider('tomcatServerExplorer', tomcatServerTree));
        context.subscriptions.push(registerCommandWrapper('tomcat.tree.refresh', (_operationId, server) => tomcatServerTree.refresh(server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.war.browse', (operationId, war) => tomcatController.browseWarPackage(operationId, war)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.rename', (operationId, server) => tomcatController.renameServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.add', (operationId) => tomcatController.addServer(operationId)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.start', (operationId, server) => tomcatController.startServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.restart', (operationId, server) => tomcatController.stopOrRestartServer(operationId, server, true)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.stop', (operationId, server) => tomcatController.stopOrRestartServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.delete', (operationId, server) => tomcatController.deleteServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.browse', (operationId, server) => tomcatController.browseServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.debug', (operationId, server) => tomcatController.runOrDebugOnServer(operationId, undefined, true, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.war.run', (operationId, uri) => tomcatController.runOrDebugOnServer(operationId, uri)));
        context.subscriptions.push(registerCommandWrapper('tomcat.war.debug', (operationId, uri) => tomcatController.runOrDebugOnServer(operationId, uri, true)));
        context.subscriptions.push(registerCommandWrapper('tomcat.webapp.run', (operationId, uri) => tomcatController.runOrDebugOnServer(operationId, uri)));
        context.subscriptions.push(registerCommandWrapper('tomcat.webapp.debug', (operationId, uri) => tomcatController.runOrDebugOnServer(operationId, uri, true)));
        context.subscriptions.push(registerCommandWrapper('tomcat.config.open', (operationId, server) => tomcatController.openServerConfig(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.war.delete', (operationId, warPackage) => tomcatController.deleteWarPackage(operationId, warPackage)));
        context.subscriptions.push(registerCommandWrapper('tomcat.war.reveal', (_operationId, warPackage) => tomcatController.revealWarPackage(warPackage)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.customizejvmoptions', (_operationId, server) => tomcatController.customizeJVMOptions(server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.package', () => tomcatController.generateWarPackage()));
        // .context commands are duplicate for better naming the context commands and make it more clear and elegant
        context.subscriptions.push(registerCommandWrapper('tomcat.server.rename.context', (operationId, server) => tomcatController.renameServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.start.context', (operationId, server) => tomcatController.startServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.restart.context', (operationId, server) => tomcatController.stopOrRestartServer(operationId, server, true)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.stop.context', (operationId, server) => tomcatController.stopOrRestartServer(operationId, server)));
        context.subscriptions.push(registerCommandWrapper('tomcat.server.delete.context', (operationId, server) => tomcatController.deleteServer(operationId, server)));
    });
}
// tslint:disable no-any
function registerCommandWrapper(command, callback) {
    const instrumented = (0, vscode_extension_telemetry_wrapper_1.instrumentOperation)(command, (operationId, ...args) => __awaiter(this, void 0, void 0, function* () {
        yield callback(operationId, ...args);
    }));
    return vscode.commands.registerCommand(command, instrumented);
} // tslint:enable no-any
// tslint:disable-next-line:no-empty
function deactivate() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, vscode_extension_telemetry_wrapper_1.dispose)();
    });
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map