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
exports.DeploymentSupport = void 0;
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
const path = require("path");
const BuildSupport_1 = require("./BuildSupport");
const RestEndpoints_1 = require("../server/endpoints/RestEndpoints");
const ApplicationInstance_1 = require("./ApplicationInstance");
const DebugManager_1 = require("./DebugManager");
const PayaraLocalServerInstance_1 = require("../server/PayaraLocalServerInstance");
const PayaraRemoteServerInstance_1 = require("../server/PayaraRemoteServerInstance");
const ProjectOutputWindowProvider_1 = require("./ProjectOutputWindowProvider");
const ServerUtils_1 = require("../server/tooling/utils/ServerUtils");
const DeployOption_1 = require("../common/DeployOption");
class DeploymentSupport {
    constructor(controller) {
        this.controller = controller;
    }
    buildAndDeployApplication(uri, payaraServer, debug, autoDeploy, metadataChanged, sourceChanged) {
        if (payaraServer instanceof PayaraRemoteServerInstance_1.PayaraRemoteServerInstance
            && !payaraServer.isConnectionAllowed()) {
            vscode.window.showWarningMessage(`Payara remote server instance ${payaraServer.getName()} not connected`);
            return;
        }
        return BuildSupport_1.BuildSupport
            .getBuild(payaraServer, uri)
            .buildProject(payaraServer instanceof PayaraRemoteServerInstance_1.PayaraRemoteServerInstance, artifact => this.deployApplication(artifact, payaraServer, debug, autoDeploy, metadataChanged, sourceChanged), autoDeploy);
    }
    deployApplication(appPath, payaraServer, debug, autoDeploy, metadataChanged, sourcesChanged) {
        let support = this;
        if (autoDeploy !== true) {
            payaraServer.getOutputChannel().show(false);
        }
        let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
        let query = '?force=true';
        let parsedPath = path.parse(appPath);
        let name = parsedPath.base;
        if (parsedPath.ext === '.war' || parsedPath.ext === '.jar') {
            name = parsedPath.name;
        }
        if (payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance) {
            query = `${query}&DEFAULT=${encodeURIComponent(appPath)}&name=${name}`;
        }
        else {
            query = `${query}&upload=true&name=${name}`;
        }
        if (payaraServer.getDeployOption() == DeployOption_1.DeployOption.HOT_RELOAD) {
            query = `${query}&hotDeploy=true`;
            if (metadataChanged) {
                query = `${query}&metadataChanged=true`;
            }
            if (Array.isArray(sourcesChanged) && sourcesChanged.length > 0) {
                query = `${query}&sourcesChanged=${sourcesChanged.join(',')}`;
            }
        }
        endpoints.invoke("deploy" + query, (response, report) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                let message = report['message-part'][0];
                if (message && message.property) {
                    let property = message.property[0].$;
                    if (property.name === 'name') {
                        let appName = property.value;
                        let workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(appPath));
                        if (debug && workspaceFolder) {
                            let debugConfig;
                            let debugManager = new DebugManager_1.DebugManager();
                            debugConfig = debugManager.getPayaraConfig(workspaceFolder, debugManager.getDefaultServerConfig());
                            if (vscode.debug.activeDebugSession) {
                                let session = vscode.debug.activeDebugSession;
                                if (session.configuration.port !== debugConfig.port
                                    || session.configuration.type !== debugConfig.type) {
                                    vscode.debug.startDebugging(workspaceFolder, debugConfig);
                                }
                            }
                            else {
                                vscode.debug.startDebugging(workspaceFolder, debugConfig);
                            }
                        }
                        if (autoDeploy !== true) {
                            support.controller.openApp(new ApplicationInstance_1.ApplicationInstance(payaraServer, appName));
                            payaraServer.reloadApplications();
                            support.controller.refreshServerList();
                        }
                        ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().updateStatusBar(`${workspaceFolder === null || workspaceFolder === void 0 ? void 0 : workspaceFolder.name} successfully deployed`);
                        yield new Promise(res => setTimeout(res, ServerUtils_1.ServerUtils.DEFAULT_WAIT));
                        ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().hideStatusBar();
                    }
                }
            }
        }), (res, message) => {
            vscode.window.showErrorMessage('Application deployment failed: ' + message);
        }, 'application/xml', payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance ? undefined : appPath);
    }
}
exports.DeploymentSupport = DeploymentSupport;
//# sourceMappingURL=DeploymentSupport.js.map