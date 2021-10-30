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
exports.PayaraInstanceController = void 0;
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
const _ = require("lodash");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const JDKVersion_1 = require("../server/start/JDKVersion");
const UI_1 = require("../../../UI");
const ui = require("../../../UI");
const DeployOption_1 = require("./DeployOption");
class PayaraInstanceController {
    constructor(context) {
        this.context = context;
    }
    updateJDKHome(payaraInstance) {
        return __awaiter(this, void 0, void 0, function* () {
            let validateInput = path => {
                let errorMessage = 'Invalid JDK Home path.';
                try {
                    let version = JDKVersion_1.JDKVersion.getJDKVersion(path.trim());
                    if (!version) {
                        return errorMessage;
                    }
                }
                catch (error) {
                    console.error(error.toString());
                    return errorMessage;
                }
                return true;
            };
            let items = [];
            let activeItem = undefined;
            let javaHome = payaraInstance.getJDKHome();
            if (javaHome) {
                activeItem = { label: javaHome, detail: 'currently selected' };
                items.push(activeItem);
            }
            const config = vscode_1.workspace.getConfiguration();
            let javaHomeConfig = config.inspect('java.home');
            if (javaHomeConfig
                && javaHomeConfig.workspaceValue
                && !_.isEmpty(javaHomeConfig.workspaceValue)) {
                let item = { label: javaHomeConfig.workspaceValue, detail: 'workspace settings > java.home' };
                items.push(item);
                if (!activeItem) {
                    activeItem = item;
                }
            }
            if (javaHomeConfig
                && javaHomeConfig.globalValue
                && !_.isEmpty(javaHomeConfig.globalValue)) {
                let item = { label: javaHomeConfig.globalValue, detail: 'global settings > java.home' };
                items.push(item);
                if (!activeItem) {
                    activeItem = item;
                }
            }
            if (process.env.JDK_HOME) {
                let item = { label: process.env.JDK_HOME, detail: 'JDK_HOME environment variables' };
                items.push(item);
                if (!activeItem) {
                    activeItem = item;
                }
            }
            if (process.env.JAVA_HOME) {
                let item = { label: process.env.JAVA_HOME, detail: 'JAVA_HOME environment variables' };
                items.push(item);
                if (!activeItem) {
                    activeItem = item;
                }
            }
            ui.MultiStepInput.run((input) => __awaiter(this, void 0, void 0, function* () {
                let browseJDKButtonLabel = 'Browse the JDK Home...';
                const browseJDKButton = new UI_1.MyButton({
                    dark: vscode.Uri.file(this.context.asAbsolutePath('resources/theme/dark/add.svg')),
                    light: vscode.Uri.file(this.context.asAbsolutePath('resources/theme/light/add.svg')),
                }, browseJDKButtonLabel);
                let pick = yield input.showQuickPick({
                    title: 'JDK Home',
                    step: 1,
                    totalSteps: 1,
                    items: items,
                    activeItem: activeItem,
                    placeholder: (javaHome ? javaHome : 'Enter the JDK Home'),
                    validate: validateInput,
                    buttons: [browseJDKButton],
                    shouldResume: this.shouldResume
                });
                let value;
                if (pick instanceof ui.MyButton || pick.label === browseJDKButtonLabel) {
                    let fileUris = yield vscode.window.showOpenDialog({
                        defaultUri: javaHome ? vscode.Uri.file(javaHome) : (vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined),
                        canSelectFiles: false,
                        canSelectFolders: true,
                        canSelectMany: false,
                        openLabel: 'Select JDK Home'
                    });
                    if (!fileUris) {
                        return;
                    }
                    const serverPaths = fileUris ? fileUris : [];
                    if (_.isEmpty(fileUris)
                        || !fileUris[0].fsPath
                        || !validateInput(fileUris[0].fsPath)) {
                        vscode.window.showErrorMessage("Selected JDK Home path is invalid.");
                        return;
                    }
                    value = fileUris[0].fsPath;
                }
                else {
                    value = pick.label;
                }
                if (value && (value = value.trim()) !== javaHome) {
                    payaraInstance.setJDKHome(value);
                    this.updateConfig();
                    vscode.window.showInformationMessage('JDK Home [' + value + '] updated successfully.');
                }
            }));
        });
    }
    deploySettings(payaraInstance) {
        return __awaiter(this, void 0, void 0, function* () {
            let validateInput = path => {
                let errorMessage = 'Invalid JDK Home path.';
                try {
                    let version = JDKVersion_1.JDKVersion.getJDKVersion(path.trim());
                    if (!version) {
                        return errorMessage;
                    }
                }
                catch (error) {
                    console.error(error.toString());
                    return errorMessage;
                }
                return true;
            };
            let items = [];
            let activeItem = undefined;
            let deployOption = payaraInstance.getDeployOption();
            for (var [key, value] of DeployOption_1.DeployOption.ALL_OPTIONS) {
                let item;
                if (deployOption === key.toString()) {
                    item = {
                        label: this.humanize(key),
                        detail: value + ' (currently selected)',
                    };
                }
                else {
                    item = {
                        label: this.humanize(key),
                        detail: value
                    };
                }
                items.push(item);
                if (!activeItem) {
                    activeItem = item;
                }
            }
            ui.MultiStepInput.run((input) => __awaiter(this, void 0, void 0, function* () {
                let pick = yield input.showQuickPick({
                    title: 'Deploy settings',
                    step: 1,
                    totalSteps: 1,
                    items: items,
                    activeItem: activeItem,
                    placeholder: 'Select the deployment option',
                    validate: validateInput,
                    shouldResume: this.shouldResume
                });
                let value = this.toEnum(pick.label);
                if (value && value !== (deployOption === null || deployOption === void 0 ? void 0 : deployOption.toString())) {
                    payaraInstance.setDeployOption(value);
                    this.updateConfig();
                    vscode.window.showInformationMessage('Deployment setting [' + value + '] updated successfully.');
                }
            }));
        });
    }
    shouldResume() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
            });
        });
    }
    humanize(text) {
        let i, ags = text.split('_');
        for (i = 0; i < ags.length; i++) {
            ags[i] = ags[i].charAt(0).toUpperCase() + ags[i].slice(1).toLowerCase();
        }
        return ags.join(' ');
    }
    toEnum(text) {
        return text.toUpperCase().replace(' ', '_');
    }
}
exports.PayaraInstanceController = PayaraInstanceController;
//# sourceMappingURL=PayaraInstanceController.js.map