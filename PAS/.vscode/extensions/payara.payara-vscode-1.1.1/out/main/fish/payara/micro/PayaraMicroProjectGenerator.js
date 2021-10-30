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
exports.PayaraMicroProjectGenerator = void 0;
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
const vscode = require("vscode");
const path = require("path");
const _ = require("lodash");
const ui = require("../../../UI");
const Maven_1 = require("../project/Maven");
const TITLE = 'Generate a Payara Micro project';
const TOTAL_STEP = 7;
const DEFAULT_VERSION = '1.0.0-SNAPSHOT';
const DEFAULT_ARTIFACT_ID = 'payara-micro-sample';
const DEFAULT_GROUP_ID = 'fish.payara.micro.sample';
const PAYARA_MICRO_VERSIONS = [
    '5.201',
    '5.194', '5.193.1', '5.192', '5.191',
    '5.184', '5.183', '5.182', '5.181'
];
class PayaraMicroProjectGenerator {
    constructor(instanceController) {
        this.instanceController = instanceController;
    }
    createProject() {
        ui.MultiStepInput.run(input => this.groupId(input, {}, project => {
            if (project.targetFolder && project.artifactId) {
                let workspaceFolder = {
                    uri: vscode.Uri.file(path.join(project.targetFolder.fsPath, project.artifactId)),
                    name: project.artifactId,
                    index: 0
                };
                new Maven_1.Maven(null, workspaceFolder)
                    .generateMicroProject(project, (projectPath) => __awaiter(this, void 0, void 0, function* () {
                    const CURRENT_WORKSPACE = "Add to current workspace";
                    const NEW_WORKSPACE = "Open in new window";
                    const choice = yield vscode.window.showInformationMessage("Payara Micro project generated successfully. Would you like to:", ...[CURRENT_WORKSPACE, NEW_WORKSPACE,]);
                    if (choice === CURRENT_WORKSPACE) {
                        vscode.workspace.updateWorkspaceFolders(0, 0, { uri: projectPath });
                        this.instanceController.refreshMicroList();
                    }
                    else if (choice === NEW_WORKSPACE) {
                        yield vscode.commands.executeCommand("vscode.openFolder", projectPath, true);
                    }
                }));
            }
        }));
    }
    groupId(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupId = yield input.showInputBox({
                title: TITLE,
                step: 1,
                totalSteps: TOTAL_STEP,
                value: project.groupId || DEFAULT_GROUP_ID,
                prompt: 'Enter a Group Id for your project',
                placeHolder: 'Project Group Id',
                validate: value => this.validate('Group Id', value),
                shouldResume: this.shouldResume
            });
            project.groupId = groupId ? groupId : DEFAULT_GROUP_ID;
            return (input) => this.artifactId(input, project, callback);
        });
    }
    artifactId(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let artifactId = yield input.showInputBox({
                title: TITLE,
                step: 2,
                totalSteps: TOTAL_STEP,
                value: project.artifactId || DEFAULT_ARTIFACT_ID,
                prompt: 'Enter a Artifact Id for your project',
                placeHolder: 'Project Artifact Id',
                validate: value => this.validate('Artifact Id', value),
                shouldResume: this.shouldResume
            });
            project.artifactId = artifactId ? artifactId : DEFAULT_ARTIFACT_ID;
            return (input) => this.version(input, project, callback);
        });
    }
    version(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let version = yield input.showInputBox({
                title: TITLE,
                step: 3,
                totalSteps: TOTAL_STEP,
                value: project.version || DEFAULT_VERSION,
                prompt: 'Enter the version for your project',
                placeHolder: 'Project Version',
                validate: value => this.validate('Project version', value),
                shouldResume: this.shouldResume
            });
            project.version = version ? version : DEFAULT_VERSION;
            return (input) => this.contextRoot(input, project, callback);
        });
    }
    contextRoot(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let contextRoot = yield input.showInputBox({
                title: TITLE,
                step: 4,
                totalSteps: TOTAL_STEP,
                value: '/',
                prompt: 'Enter the context root of your application',
                placeHolder: 'Context root',
                validate: value => this.validate('Context Root', value),
                shouldResume: this.shouldResume
            });
            project.contextRoot = contextRoot ? contextRoot : '/';
            return (input) => this.packageName(input, project, callback);
        });
    }
    packageName(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let packageName = yield input.showInputBox({
                title: TITLE,
                step: 5,
                totalSteps: TOTAL_STEP,
                value: project.package || project.groupId || DEFAULT_GROUP_ID,
                prompt: 'Enter the package name',
                placeHolder: 'Package name',
                validate: value => this.validate('Package name', value),
                shouldResume: this.shouldResume
            });
            project.package = packageName ? packageName : DEFAULT_GROUP_ID;
            return (input) => this.payaraMicroVersion(input, project, callback);
        });
    }
    payaraMicroVersion(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let versions = PAYARA_MICRO_VERSIONS.map(label => ({ label }));
            const pick = yield input.showQuickPick({
                title: TITLE,
                step: 6,
                totalSteps: TOTAL_STEP,
                placeholder: 'Select a Payara Micro version.',
                items: versions,
                activeItem: versions[0],
                shouldResume: this.shouldResume
            });
            project.payaraMicroVersion = pick.label;
            return (input) => this.selectTargetFolder(input, project, callback);
        });
    }
    selectTargetFolder(input, project, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let dialogOptions = ({
                defaultUri: vscode.workspace.rootPath ? vscode.Uri.file(vscode.workspace.rootPath) : undefined,
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: 'Select Destination Folder'
            });
            let fileUris = yield vscode.window.showOpenDialog(dialogOptions);
            if (!fileUris) {
                return;
            }
            if (_.isEmpty(fileUris) || !fileUris[0].fsPath) {
                vscode.window.showErrorMessage("Selected path is invalid.");
            }
            project.targetFolder = fileUris[0];
            callback(project);
        });
    }
    validate(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(value)) {
                return `${type} cannot be empty`;
            }
            else if (/\s/.test(value)) {
                return `${type} cannot contain spaces`;
            }
            return undefined;
        });
    }
    shouldResume() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
            });
        });
    }
}
exports.PayaraMicroProjectGenerator = PayaraMicroProjectGenerator;
//# sourceMappingURL=PayaraMicroProjectGenerator.js.map