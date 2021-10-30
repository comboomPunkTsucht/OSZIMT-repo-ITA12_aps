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
exports.PayaraServerTreeDataProvider = void 0;
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
const PayaraServerInstance_1 = require("./PayaraServerInstance");
const ApplicationInstance_1 = require("../project/ApplicationInstance");
const PayaraLocalServerInstance_1 = require("./PayaraLocalServerInstance");
class PayaraServerTreeDataProvider {
    constructor(context, instanceProvider) {
        this.context = context;
        this.instanceProvider = instanceProvider;
        this.onDidChangeTreeDataListener = new vscode.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataListener.event;
    }
    refresh(item) {
        this.onDidChangeTreeDataListener.fire(item);
    }
    getTreeItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return item;
        });
    }
    getChildren(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item) {
                return this.instanceProvider.getServers().map((server) => {
                    server.iconPath = this.context.asAbsolutePath(path.join('resources', server.getIcon()));
                    server.contextValue = server.getState() + (server instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance ? "Local" : "Remote");
                    server.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
                    server.label = server.getName();
                    server.tooltip = server.getTooltip();
                    return server;
                });
            }
            else if (item instanceof PayaraServerInstance_1.PayaraServerInstance && item.isStarted()) {
                return item.getApplications().map((application) => {
                    application.iconPath = this.context.asAbsolutePath(path.join('resources', application.getIcon()));
                    application.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
                    application.label = application.name;
                    application.contextValue = "payara-application";
                    return application;
                });
            }
            else if (item instanceof ApplicationInstance_1.ApplicationInstance) {
                return item.getRestEndpoints().map((endpoint) => {
                    endpoint.iconPath = this.context.asAbsolutePath(path.join('resources', 'rest-endpoint.svg'));
                    endpoint.label = endpoint.httpMethod + " " + endpoint.endpoint;
                    endpoint.contextValue = "application-rest-endpoint";
                    return endpoint;
                });
            }
            return [];
        });
    }
}
exports.PayaraServerTreeDataProvider = PayaraServerTreeDataProvider;
//# sourceMappingURL=PayaraServerTreeDataProvider.js.map