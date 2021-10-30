'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const JettyServerController_1 = require("./JettyServerController");
const JettyServerModel_1 = require("./JettyServerModel");
const JettyServerTreeProvider_1 = require("./JettyServerTreeProvider");
const Utility = require("./Utility");
function activate(context) {
    const jettyServerModel = new JettyServerModel_1.JettyServerModel(context.storagePath ? context.storagePath : Utility.getTempStoragePath());
    const jettyServerController = new JettyServerController_1.JettyServerController(jettyServerModel, context.extensionPath);
    const jettyServerTree = new JettyServerTreeProvider_1.JettyServerTreeProvider(context, jettyServerModel);
    context.subscriptions.push(jettyServerController);
    context.subscriptions.push(jettyServerTree);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('jettyServerExplorer', jettyServerTree));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.add', () => { jettyServerController.addServer(); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.rename', (server) => jettyServerController.renameServer(server)));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.rename.context', (server) => jettyServerController.renameServer(server)));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.start', (server) => { jettyServerController.startServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.start.context', (server) => { jettyServerController.startServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.restart', (server) => { jettyServerController.stopServer(server, true); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.restart.context', (server) => { jettyServerController.stopServer(server, true); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.stop', (server) => { jettyServerController.stopServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.stop.context', (server) => { jettyServerController.stopServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.delete', (server) => { jettyServerController.deleteServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.delete.context', (server) => { jettyServerController.deleteServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.browse', (server) => { jettyServerController.browseServer(server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.server.debug', (server) => { jettyServerController.runWarPackage(undefined, true, server); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.war.run', (uri) => { jettyServerController.runWarPackage(uri); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.war.debug', (uri) => { jettyServerController.runWarPackage(uri, true); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.war.delete', (warPackage) => { jettyServerController.deleteWarPackage(warPackage); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.war.reveal', (warPackage) => { jettyServerController.revealWarPackage(warPackage); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.war.browse', (warPackage) => { jettyServerController.browseWarPackage(warPackage); }));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.package', () => jettyServerController.generateWarPackage()));
    context.subscriptions.push(vscode.commands.registerCommand('jetty.tree.refresh', (server) => { jettyServerTree.refresh(server); }));
}
exports.activate = activate;
// tslint:disable-next-line:no-empty
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map