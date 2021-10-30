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
exports.PayaraMicroInstanceController = void 0;
/*
 * Copyright (c) 2020 Payara Foundation and/or its affiliates and others.
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
const _ = require("lodash");
const open = require("open");
const vscode = require("vscode");
const PayaraInstanceController_1 = require("../common/PayaraInstanceController");
const DebugManager_1 = require("../project/DebugManager");
const PayaraMicroInstance_1 = require("./PayaraMicroInstance");
class PayaraMicroInstanceController extends PayaraInstanceController_1.PayaraInstanceController {
    constructor(context, instanceProvider, extensionPath) {
        super(context);
        this.instanceProvider = instanceProvider;
        this.extensionPath = extensionPath;
    }
    startMicro(payaraMicro, debug, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payaraMicro.isStopped()) {
                vscode.window.showErrorMessage('Payara Micro instance already running.');
                return;
            }
            let workspaceFolder = vscode.workspace.getWorkspaceFolder(payaraMicro.getPath());
            let debugConfig;
            if (debug && workspaceFolder) {
                let debugManager = new DebugManager_1.DebugManager();
                debugConfig = debugManager.getPayaraConfig(workspaceFolder, debugManager.getDefaultMicroConfig());
            }
            try {
                payaraMicro.setDebug(debug);
                yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.LOADING);
                let process = payaraMicro.getBuild()
                    .startPayaraMicro(debugConfig, (data) => __awaiter(this, void 0, void 0, function* () {
                    if (!payaraMicro.isStarted()) {
                        if (debugConfig && data.indexOf("Listening for transport dt_socket at address:") > -1) {
                            vscode.debug.startDebugging(workspaceFolder, debugConfig);
                            debugConfig = undefined;
                        }
                        if (this.parseApplicationUrl(data, payaraMicro)) {
                            yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.RUNNING);
                        }
                    }
                }), (code) => __awaiter(this, void 0, void 0, function* () {
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.STOPPED);
                    if (code !== 0) {
                        console.warn(`startMicro task failed with exit code ${code}`);
                    }
                }), (error) => __awaiter(this, void 0, void 0, function* () {
                    vscode.window.showErrorMessage(`Error on executing startMicro task: ${error.message}`);
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.STOPPED);
                }));
                if (process) {
                    payaraMicro.setProcess(process);
                }
                else {
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.STOPPED);
                }
            }
            catch (error) {
                vscode.window.showErrorMessage(`Error on executing startMicro task: ${error.message}`);
                yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.STOPPED);
            }
        });
    }
    parseApplicationUrl(data, payaraMicro) {
        let urlIndex = data.indexOf("Payara Micro URLs:");
        if (urlIndex > -1) {
            let lines = data.substring(urlIndex).split('\n');
            if (lines.length > 1) {
                payaraMicro.setHomePage(lines[1]);
            }
            let homePage = payaraMicro.getHomePage();
            if (homePage !== undefined && !_.isEmpty(homePage)) {
                open(homePage);
            }
            return true;
        }
        return false;
    }
    reloadMicro(payaraMicro, metadataChanged, sourcesChanged) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payaraMicro.isStopped()) {
                vscode.window.showErrorMessage('Payara Micro instance not running.');
                return;
            }
            try {
                yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.LOADING);
                let process = payaraMicro
                    .getBuild()
                    .reloadPayaraMicro((code) => __awaiter(this, void 0, void 0, function* () {
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.RUNNING);
                    if (code !== 0) {
                        vscode.window.showErrorMessage(`reloadMicro task failed with exit code ${code}`);
                    }
                }), (error) => __awaiter(this, void 0, void 0, function* () {
                    vscode.window.showErrorMessage(`Error on executing reloadMicro task: ${error.message}`);
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.RUNNING);
                }), metadataChanged, sourcesChanged);
                if (!process) {
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.RUNNING);
                }
            }
            catch (error) {
                vscode.window.showErrorMessage(`Error on executing reloadMicro task: ${error.message}`);
                yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.RUNNING);
            }
        });
    }
    stopMicro(payaraMicro) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payaraMicro.isStopped()) {
                vscode.window.showErrorMessage('Payara Micro instance not running.');
                return;
            }
            try {
                payaraMicro
                    .getBuild()
                    .stopPayaraMicro((code) => __awaiter(this, void 0, void 0, function* () {
                    payaraMicro.setDebug(false);
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.STOPPED);
                    if (code !== 0) {
                        vscode.window.showErrorMessage(`stopMicro task failed with exit code ${code}`);
                    }
                }), (error) => __awaiter(this, void 0, void 0, function* () {
                    vscode.window.showErrorMessage(`Error on executing stopMicro task: ${error.message}`);
                    payaraMicro.setDebug(false);
                    yield payaraMicro.setState(PayaraMicroInstance_1.InstanceState.STOPPED);
                }));
            }
            catch (error) {
                vscode.window.showErrorMessage(`Error on executing stopMicro task: ${error.message}`);
            }
        });
    }
    bundleMicro(payaraMicro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                payaraMicro
                    .getBuild()
                    .bundlePayaraMicro((code) => {
                    if (code !== 0) {
                        vscode.window.showErrorMessage(`bundleMicro task failed with exit code ${code}`);
                    }
                }, (error) => {
                    vscode.window.showErrorMessage(`Error on executing bundleMicro task: ${error.message}`);
                });
            }
            catch (error) {
                vscode.window.showErrorMessage(`Error on executing bundleMicro task: ${error.message}`);
            }
        });
    }
    refreshMicroList() {
        return __awaiter(this, void 0, void 0, function* () {
            vscode.commands.executeCommand('payara.micro.refresh.all');
        });
    }
    updateConfig() {
    }
}
exports.PayaraMicroInstanceController = PayaraMicroInstanceController;
//# sourceMappingURL=PayaraMicroInstanceController.js.map