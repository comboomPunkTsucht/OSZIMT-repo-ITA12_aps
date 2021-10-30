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
const vscode = require("vscode");
const PayaraInstanceProvider_1 = require("./fish/payara/server/PayaraInstanceProvider");
const PayaraServerInstanceController_1 = require("./fish/payara/server/PayaraServerInstanceController");
const PayaraServerTreeDataProvider_1 = require("./fish/payara/server/PayaraServerTreeDataProvider");
const PayaraMicroProjectGenerator_1 = require("./fish/payara/micro/PayaraMicroProjectGenerator");
const PayaraMicroTreeDataProvider_1 = require("./fish/payara/micro/PayaraMicroTreeDataProvider");
const PayaraMicroInstanceProvider_1 = require("./fish/payara/micro/PayaraMicroInstanceProvider");
const PayaraMicroInstanceController_1 = require("./fish/payara/micro/PayaraMicroInstanceController");
const path = require("path");
const PayaraRemoteServerInstance_1 = require("./fish/payara/server/PayaraRemoteServerInstance");
const DeployOption_1 = require("./fish/payara/common/DeployOption");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const payaraServerInstanceProvider = new PayaraInstanceProvider_1.PayaraInstanceProvider(context);
        const payaraServerTree = new PayaraServerTreeDataProvider_1.PayaraServerTreeDataProvider(context, payaraServerInstanceProvider);
        const payaraServerInstanceController = new PayaraServerInstanceController_1.PayaraServerInstanceController(context, payaraServerInstanceProvider, context.extensionPath);
        const payaraMicroInstanceProvider = new PayaraMicroInstanceProvider_1.PayaraMicroInstanceProvider(context);
        const payaraMicroTree = new PayaraMicroTreeDataProvider_1.PayaraMicroTreeDataProvider(context, payaraMicroInstanceProvider);
        const payaraMicroInstanceController = new PayaraMicroInstanceController_1.PayaraMicroInstanceController(context, payaraMicroInstanceProvider, context.extensionPath);
        const payaraMicroProjectGenerator = new PayaraMicroProjectGenerator_1.PayaraMicroProjectGenerator(payaraMicroInstanceController);
        context.subscriptions.push(vscode.window.registerTreeDataProvider('payaraServerExplorer', payaraServerTree));
        context.subscriptions.push(vscode.window.registerTreeDataProvider('payaraServer', payaraServerTree));
        context.subscriptions.push(vscode.window.registerTreeDataProvider('payaraMicroExplorer', payaraMicroTree));
        context.subscriptions.push(vscode.window.registerTreeDataProvider('payaraMicro', payaraMicroTree));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.add', () => payaraServerInstanceController.addServer()));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.refresh.all', () => {
            for (let payaraServer of payaraServerInstanceProvider.getServers()) {
                if (payaraServer instanceof PayaraRemoteServerInstance_1.PayaraRemoteServerInstance && !payaraServer.isConnectionAllowed()) {
                    continue;
                }
                payaraServer.checkAliveStatusUsingRest(2, () => __awaiter(this, void 0, void 0, function* () {
                    payaraServer.setStarted(true);
                    payaraServer.connectOutput();
                    vscode.commands.executeCommand('payara.server.refresh');
                    payaraServer.reloadApplications();
                }), (message) => __awaiter(this, void 0, void 0, function* () {
                    payaraServer.setStarted(false);
                    vscode.commands.executeCommand('payara.server.refresh');
                }));
            }
        }));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.refresh', payaraServer => {
            payaraServerTree.refresh(payaraServer);
        }));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.remote.connect', payaraServer => payaraServerInstanceController.connectServer(payaraServer, false)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.remote.disconnect', payaraServer => payaraServerInstanceController.disconnectServer(payaraServer, false)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.start', payaraServer => payaraServerInstanceController.startServer(payaraServer, false)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.start.debug', payaraServer => payaraServerInstanceController.startServer(payaraServer, true)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.restart', payaraServer => payaraServerInstanceController.restartServer(payaraServer, payaraServer.isDebug())));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.stop', payaraServer => payaraServerInstanceController.stopServer(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.rename', payaraServer => payaraServerInstanceController.renameServer(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.remove', payaraServer => payaraServerInstanceController.removeServer(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.credentials', payaraServer => payaraServerInstanceController.updateCredentials(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.jdk.home', payaraServer => payaraServerInstanceController.updateJDKHome(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.deploy.settings', payaraServer => payaraServerInstanceController.deploySettings(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.console.open', payaraServer => payaraServerInstanceController.openConsole(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.log.open', payaraServer => payaraServerInstanceController.openLog(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.config.open', payaraServer => payaraServerInstanceController.openConfig(payaraServer)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.deploy', uri => payaraServerInstanceController.deployApp(uri, false)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.debug', uri => payaraServerInstanceController.deployApp(uri, true)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.undeploy', application => payaraServerInstanceController.undeployApp(application)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.enable', application => payaraServerInstanceController.enableApp(application)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.disable', application => payaraServerInstanceController.disableApp(application)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.home', application => payaraServerInstanceController.openApp(application)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.server.app.rest.endpoint', restEndpoint => payaraServerInstanceController.openRestEndpoint(restEndpoint)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.refresh.all', () => {
            for (let payaraMicro of payaraMicroInstanceProvider.getMicroInstances()) {
                payaraMicroTree.refresh(payaraMicro);
            }
        }));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.refresh', payaraMicro => {
            payaraMicroTree.refresh(payaraMicro);
        }));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.start', payaraMicro => payaraMicroInstanceController.startMicro(payaraMicro, false)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.start.debug', payaraMicro => payaraMicroInstanceController.startMicro(payaraMicro, true)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.reload', payaraMicro => payaraMicroInstanceController.reloadMicro(payaraMicro)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.stop', payaraMicro => payaraMicroInstanceController.stopMicro(payaraMicro)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.bundle', payaraMicro => payaraMicroInstanceController.bundleMicro(payaraMicro)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.jdk.home', payaraMicro => payaraMicroInstanceController.updateJDKHome(payaraMicro)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.deploy.settings', payaraMicro => payaraMicroInstanceController.deploySettings(payaraMicro)));
        context.subscriptions.push(vscode.commands.registerCommand('payara.micro.create.project', () => payaraMicroProjectGenerator.createProject()));
        vscode.workspace.onDidSaveTextDocument((document) => {
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            let metadataChanged = true;
            let extName = path.extname(document.uri.fsPath);
            if (extName === ".java"
                || extName === ".html"
                || extName === ".js") {
                metadataChanged = false;
            }
            if (workspaceFolder) {
                if (!reloadServerInstance(workspaceFolder, document.uri, metadataChanged)) {
                    reloadMicroInstance(workspaceFolder, document.uri, metadataChanged);
                }
            }
        });
        function reloadServerInstance(workspaceFolder, sourceChanged, metadataChanged) {
            let instance = payaraServerInstanceController.getPayaraServerInstance(workspaceFolder);
            // if(!instance) {
            // 	let instances:PayaraServerInstance[] = payaraServerInstanceProvider.getServers();
            // 	if(instances.length == 1) {
            // 		instance = instances[0];
            // 	}
            // }
            if (instance
                && instance.isStarted()
                && instance.getDeployOption() !== DeployOption_1.DeployOption.DEFAULT) {
                payaraServerInstanceController.deployApp(workspaceFolder.uri, false, true, instance, metadataChanged, [sourceChanged]);
                return true;
            }
            return false;
        }
        function reloadMicroInstance(workspaceFolder, sourceChanged, metadataChanged) {
            for (let payaraMicro of payaraMicroInstanceProvider.getMicroInstances()) {
                let fileName = path.basename(sourceChanged.fsPath);
                if (fileName === "pom.xml"
                    || fileName === "build.gradle"
                    || fileName === "settings.gradle") {
                    payaraMicro.getBuild().readBuildConfig();
                }
                if (payaraMicro.isStarted()
                    && payaraMicro.getDeployOption() !== DeployOption_1.DeployOption.DEFAULT
                    && workspaceFolder
                    && workspaceFolder.uri === payaraMicro.getPath()
                    && path.relative(payaraMicro.getPath().fsPath, sourceChanged.fsPath).startsWith("src")) {
                    payaraMicroInstanceController.reloadMicro(payaraMicro, metadataChanged, [sourceChanged]);
                }
            }
        }
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map