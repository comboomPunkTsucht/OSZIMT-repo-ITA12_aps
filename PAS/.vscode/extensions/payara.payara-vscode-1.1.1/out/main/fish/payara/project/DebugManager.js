'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugManager = void 0;
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
const fs = require("fs");
const vscode_1 = require("vscode");
const ServerUtils_1 = require("../server/tooling/utils/ServerUtils");
class DebugManager {
    getPayaraConfig(workspaceFolder, defaultConfiguration) {
        let configuration = undefined;
        for (const config of this.getConfigurations(workspaceFolder.uri)) {
            if (config.name && config.name === defaultConfiguration.name) {
                configuration = config;
            }
        }
        if (!configuration) {
            configuration = this.createConfiguration(workspaceFolder, defaultConfiguration);
        }
        return configuration;
    }
    getConfigurations(target) {
        let workspaceConfiguration = vscode_1.workspace.getConfiguration('launch', target);
        let configurations = workspaceConfiguration.get('configurations');
        return configurations ? configurations : [];
    }
    createConfiguration(workspaceFolder, defaultConfig) {
        let vscodeDir = this.getVSCodeDir(workspaceFolder);
        let launchFile = vscodeDir + '/launch.json';
        let configurations = [];
        let launch = vscode_1.workspace.getConfiguration('launch', workspaceFolder.uri);
        if (!fs.existsSync(launchFile)) {
            launch.update('version', "0.2.0");
        }
        else {
            let config = launch.get('configurations');
            if (config) {
                configurations = config;
            }
        }
        configurations.push(defaultConfig);
        launch.update('configurations', configurations, false);
        return defaultConfig;
    }
    getVSCodeDir(workspaceFolder) {
        let vscodeDir = workspaceFolder.uri.fsPath + '/.vscode';
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir);
        }
        return vscodeDir;
    }
    getDefaultMicroConfig() {
        return {
            type: "java",
            request: "attach",
            hostName: ServerUtils_1.ServerUtils.DEFAULT_HOST,
            name: "payara-micro",
            port: 5005
        };
    }
    getDefaultServerConfig() {
        return {
            type: "java",
            request: "attach",
            hostName: ServerUtils_1.ServerUtils.DEFAULT_HOST,
            name: "payara-server",
            port: 9009
        };
    }
}
exports.DebugManager = DebugManager;
//# sourceMappingURL=DebugManager.js.map