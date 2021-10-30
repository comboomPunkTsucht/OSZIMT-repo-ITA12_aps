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
exports.executeCommand = exports.executeCommandAndLog = exports.deactivate = exports.activate = exports.myContext = void 0;
const extensionApi_1 = require("./extensionApi");
const rsp_client_1 = require("rsp-client");
const rspProviderAPI_1 = require("./api/implementation/rspProviderAPI");
const serverEditorAdapter_1 = require("./serverEditorAdapter");
const serverExplorer_1 = require("./serverExplorer");
const vscode = require("vscode");
const telemetry_1 = require("./telemetry");
let serversExplorer;
let commandHandler;
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        serversExplorer = serverExplorer_1.ServerExplorer.getInstance();
        commandHandler = new extensionApi_1.CommandHandler(serversExplorer);
        exports.myContext = context;
        registerCommands(commandHandler, context);
        return rspProviderAPI_1.getAPI();
    });
}
exports.activate = activate;
function registerCommands(commandHandler, context) {
    const newLocal = [
        vscode.commands.registerCommand('server.startRSP', context => executeCommand(commandHandler.startRSP, commandHandler, context, 'Unable to start the server: ')),
        vscode.commands.registerCommand('server.disconnectRSP', context => executeCommand(commandHandler.disconnectRSP, commandHandler, context, 'Unable to disconnect the server: ')),
        vscode.commands.registerCommand('server.stopRSP', context => executeCommand(commandHandler.stopRSP, commandHandler, false, context, 'Unable to stop the server: ')),
        vscode.commands.registerCommand('server.terminateRSP', context => executeCommand(commandHandler.stopRSP, commandHandler, true, context, 'Unable to start the server: ')),
        vscode.commands.registerCommand('server.start', context => executeCommand(commandHandler.startServer, commandHandler, 'run', context, 'Unable to start the server: ')),
        vscode.commands.registerCommand('server.restart', context => executeCommand(commandHandler.restartServer, commandHandler, 'run', context, 'Unable to restart in run mode the server: ')),
        vscode.commands.registerCommand('server.debug', context => executeCommand(commandHandler.debugServer, commandHandler, context, 'Unable to debug the server: ')),
        vscode.commands.registerCommand('server.restartDebug', context => executeCommand(commandHandler.restartServer, commandHandler, 'debug', context, 'Unable to restart in debug mode the server: ')),
        vscode.commands.registerCommand('server.stop', context => executeCommand(commandHandler.stopServer, commandHandler, false, context, 'Unable to stop the server: ')),
        vscode.commands.registerCommand('server.terminate', context => executeCommand(commandHandler.stopServer, commandHandler, true, context, 'Unable to terminate the server: ')),
        vscode.commands.registerCommand('server.remove', context => executeCommand(commandHandler.removeServer, commandHandler, context, 'Unable to remove the server: ')),
        vscode.commands.registerCommand('server.output', context => executeCommand(commandHandler.showServerOutput, commandHandler, context, 'Unable to show server output channel')),
        vscode.commands.registerCommand('server.addDeployment', context => executeCommand(commandHandler.addDeployment, commandHandler, context, 'Unable to add deployment to the server: ')),
        vscode.commands.registerCommand('server.removeDeployment', context => executeCommand(commandHandler.removeDeployment, commandHandler, context, 'Unable to remove deployment from the server: ')),
        vscode.commands.registerCommand('server.publishFull', context => executeCommand(commandHandler.publishServer, commandHandler, rsp_client_1.ServerState.PUBLISH_FULL, context, 'Unable to publish (Full) to the server: ')),
        vscode.commands.registerCommand('server.publishIncremental', context => executeCommand(commandHandler.publishServer, commandHandler, rsp_client_1.ServerState.PUBLISH_INCREMENTAL, context, 'Unable to publish (Incremental) to the server: ')),
        vscode.commands.registerCommand('server.editServer', context => executeCommand(commandHandler.editServer, commandHandler, context, 'Unable to edit server properties')),
        vscode.commands.registerCommand('server.actions', context => executeCommand(commandHandler.serverActions, commandHandler, context, 'Unable to execute action')),
        vscode.commands.registerCommand('server.saveSelectedNode', context => executeCommandAndLog('server.saveSelectedNode', commandHandler.saveSelectedNode, commandHandler, context)),
        vscode.commands.registerCommand('server.application.run', context => executeCommand(commandHandler.runOnServer, commandHandler, context, 'run', 'Unable to deploy and run application')),
        vscode.commands.registerCommand('server.application.debug', context => executeCommand(commandHandler.runOnServer, commandHandler, context, 'debug', 'Unable to deploy and debug application')),
        vscode.commands.registerCommand('server.createServer', context => executeCommandAndLog('server.createServer', commandHandler.createServer, commandHandler, context, 'Unable to create the server: ')),
        // Do these two still exist? Can't seem to get them to show up
        vscode.commands.registerCommand('server.addLocation', context => executeCommandAndLog('server.addLocation', commandHandler.addLocation, commandHandler, context, 'Unable to detect any server: ')),
        vscode.commands.registerCommand('server.downloadRuntime', context => executeCommandAndLog('server.downloadRuntime', commandHandler.downloadRuntime, commandHandler, context, 'Unable to detect any runtime: ')),
        vscode.workspace.onDidSaveTextDocument(onDidSaveTextDocument),
        vscode.workspace.onDidCloseTextDocument(onDidCloseTextDocument)
    ];
    const subscriptions = newLocal;
    subscriptions.forEach(element => { context.subscriptions.push(element); }, this);
    telemetry_1.default('activation').catch(err => {
        vscode.window.showErrorMessage(err);
    });
}
function deactivate() {
    for (const rspProvider of serversExplorer.RSPServersStatus.values()) {
        if (rspProvider.client) {
            if (rspProvider.info.spawned) {
                rspProvider.client.shutdownServer();
            }
            else {
                rspProvider.client.disconnect();
            }
        }
    }
    telemetry_1.default('deactivation');
}
exports.deactivate = deactivate;
function onDidSaveTextDocument(doc) {
    serverEditorAdapter_1.ServerEditorAdapter.getInstance(serversExplorer).onDidSaveTextDocument(doc).catch(err => {
        vscode.window.showErrorMessage(err);
    });
}
function onDidCloseTextDocument(doc) {
    serverEditorAdapter_1.ServerEditorAdapter.getInstance(serversExplorer).onDidCloseTextDocument(doc);
}
function executeCommandAndLog(name, command, thisArg, ...params) {
    let telemetryProps = {
        identifier: name,
    };
    const startTime = Date.now();
    const commandErrorLabel = typeof params[params.length - 1] === 'string' ? params[params.length - 1] : '';
    try {
        return command.call(thisArg, ...params).catch((err) => {
            telemetryProps.error = err.toString();
            const error = typeof err === 'string' ? new Error(err) : err;
            const msg = error.hasOwnProperty('message') ? error.message : '';
            if (commandErrorLabel === '' && msg === '') {
                return;
            }
            vscode.window.showErrorMessage(`${commandErrorLabel} Extension backend error - ${msg.toLowerCase()}`);
        });
    }
    finally {
        telemetryProps.duration = Date.now() - startTime;
        telemetry_1.default('command', telemetryProps);
    }
}
exports.executeCommandAndLog = executeCommandAndLog;
function executeCommand(command, thisArg, ...params) {
    const commandErrorLabel = typeof params[params.length - 1] === 'string' ? params[params.length - 1] : '';
    return command.call(thisArg, ...params).catch((err) => {
        const error = typeof err === 'string' ? new Error(err) : err;
        const msg = error.hasOwnProperty('message') ? error.message : '';
        if (commandErrorLabel === '' && msg === '') {
            return;
        }
        vscode.window.showErrorMessage(`${commandErrorLabel} Extension backend error - ${msg.toLowerCase()}`);
    });
}
exports.executeCommand = executeCommand;
//# sourceMappingURL=extension.js.map