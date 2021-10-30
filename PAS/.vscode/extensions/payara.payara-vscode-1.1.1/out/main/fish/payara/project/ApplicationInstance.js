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
exports.ApplicationInstance = void 0;
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
const RestEndpoints_1 = require("../server/endpoints/RestEndpoints");
const ProjectOutputWindowProvider_1 = require("./ProjectOutputWindowProvider");
const RestEndpoint_1 = require("./RestEndpoint");
class ApplicationInstance extends vscode.TreeItem {
    constructor(payaraServer, name, appType) {
        super(name);
        this.payaraServer = payaraServer;
        this.name = name;
        this.appType = appType;
        this.enabled = true;
        this.contextPath = undefined;
        this.restEndpoints = new Array();
        this.outputChannel = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().get(name);
        this.fetchRestEndpoints();
    }
    setEnabled(status) {
        this.enabled = status;
    }
    isEnabled() {
        return this.enabled;
    }
    setContextPath(contextPath) {
        this.contextPath = contextPath;
    }
    getContextPath() {
        return this.contextPath;
    }
    fetchContextPath(callback) {
        let application = this;
        let payaraServer = this.payaraServer;
        let query = '?appname=' + encodeURIComponent(this.name) + '&modulename=' + encodeURIComponent(this.name);
        let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
        endpoints.invoke("_get-context-root" + query, (response, report) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                let message = report['message-part'][0];
                if (message.property) {
                    let property = message.property[0].$;
                    if (property.name === 'contextRoot') {
                        let contextRoot = property.value;
                        application.setContextPath(contextRoot);
                        if (contextRoot) {
                            callback(contextRoot);
                        }
                        else {
                            vscode.window.showInformationMessage('Context path not found for the application: ' + application.name);
                        }
                    }
                }
            }
        }));
    }
    fetchRestEndpoints() {
        let application = this;
        let payaraServer = this.payaraServer;
        let query = '?appname=' + encodeURIComponent(this.name);
        let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
        endpoints.invoke("list-rest-endpoints" + query, (response, report) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                let message = report['message-part'][0];
                if (message) {
                    application.restEndpoints.splice(0, application.restEndpoints.length); // clear
                    for (let endpoint of message.$.message.split('\n')) {
                        let endpointInfo = endpoint.split('\t');
                        application.restEndpoints.push(new RestEndpoint_1.RestEndpoint(application, endpointInfo[0], endpointInfo[1]));
                    }
                }
            }
        }), (res, message) => {
            console.log(message);
        });
    }
    getRestEndpoints() {
        return this.restEndpoints;
    }
    getIcon() {
        let icon;
        if (this.appType === 'web') {
            if (this.isEnabled()) {
                icon = `webapp.svg`;
            }
            else {
                icon = `webapp-disabled.svg`;
            }
        }
        else if (this.appType === 'ejb') {
            if (this.isEnabled()) {
                icon = `ejbapp.svg`;
            }
            else {
                icon = `ejbapp-disabled.svg`;
            }
        }
        else {
            if (this.isEnabled()) {
                icon = `app.svg`;
            }
            else {
                icon = `app-disabled.svg`;
            }
        }
        return icon;
    }
    getOutputChannel() {
        return this.outputChannel;
    }
}
exports.ApplicationInstance = ApplicationInstance;
//# sourceMappingURL=ApplicationInstance.js.map