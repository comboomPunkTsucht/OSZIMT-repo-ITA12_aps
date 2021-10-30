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
exports.InstanceState = exports.PayaraServerInstance = void 0;
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
const JDKVersion_1 = require("./start/JDKVersion");
const ServerUtils_1 = require("./tooling/utils/ServerUtils");
const ApplicationInstance_1 = require("../project/ApplicationInstance");
const RestEndpoints_1 = require("./endpoints/RestEndpoints");
const ProjectOutputWindowProvider_1 = require("../project/ProjectOutputWindowProvider");
const DeployOption_1 = require("../common/DeployOption");
class PayaraServerInstance extends vscode.TreeItem {
    constructor(name, domainName) {
        super(name);
        this.name = name;
        this.domainName = domainName;
        this.state = InstanceState.STOPPED;
        this.debug = false;
        this.username = ServerUtils_1.ServerUtils.DEFAULT_USERNAME;
        this.password = ServerUtils_1.ServerUtils.DEFAULT_PASSWORD;
        this.securityEnabled = false;
        this.jdkHome = null;
        this.deployOption = DeployOption_1.DeployOption.DEFAULT;
        this.applicationInstances = new Array();
        this.label = name;
        this.outputChannel = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().get(name);
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getVersionLabel() {
        return this.versionLabel;
    }
    setVersionLabel(versionLabel) {
        this.versionLabel = versionLabel;
    }
    getDomainName() {
        return this.domainName;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getJDKHome() {
        if (this.jdkHome !== null) {
            return this.jdkHome;
        }
        return JDKVersion_1.JDKVersion.getDefaultJDKHome();
    }
    setJDKHome(jdkHome) {
        this.jdkHome = jdkHome;
    }
    getDeployOption() {
        return this.deployOption;
    }
    setDeployOption(deployOption) {
        this.deployOption = deployOption;
    }
    isSecurityEnabled() {
        return this.securityEnabled;
    }
    setSecurityEnabled(securityEnabled) {
        this.securityEnabled = securityEnabled;
    }
    isLoading() {
        return this.state === InstanceState.LOADING;
    }
    isRestarting() {
        return this.state === InstanceState.RESTARTING;
    }
    isStarted() {
        return this.state === InstanceState.RUNNING;
    }
    isStopped() {
        return this.state === InstanceState.STOPPED;
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    setStarted(started) {
        this.state = started ? InstanceState.RUNNING : InstanceState.STOPPED;
    }
    setDebug(debug) {
        this.debug = debug;
    }
    isDebug() {
        return this.debug;
    }
    getIcon() {
        let icon = `payara.svg`;
        if (this.isLoading() || this.isRestarting()) {
            icon = `payara-loading.svg`;
        }
        else if (this.isStarted()) {
            if (this.isDebug()) {
                icon = `payara-started-debug.svg`;
            }
            else {
                icon = `payara-started.svg`;
            }
        }
        return icon;
    }
    getOutputChannel() {
        return this.outputChannel;
    }
    checkAliveStatusUsingRest(maxRetryCount, successCallback, failureCallback, log) {
        return __awaiter(this, void 0, void 0, function* () {
            let trycount = 0;
            let endpoints = new RestEndpoints_1.RestEndpoints(this);
            let successHttpCallback;
            let failureHttpCallback;
            let invoke = () => {
                ++trycount;
                if (log) {
                    this.getOutputChannel().appendLine(`Connecting to ${this.getName()}[${this.getHost()}:${this.getAdminPort()}] ...`);
                }
                let req = endpoints.invoke("__locations", successHttpCallback, failureHttpCallback);
                req.on('error', (err) => __awaiter(this, void 0, void 0, function* () {
                    if (log) {
                        let errorMessage = `Connection failure ${this.getName()}[${this.getHost()}:${this.getAdminPort()}]: ${err["code"]} [${err.message}]. Please check your network connectivity or firewall settings.`;
                        this.getOutputChannel().appendLine(errorMessage);
                        vscode.window.showErrorMessage(errorMessage);
                    }
                    if (err["code"] === 'ECONNREFUSED' || err["code"] === 'ECONNRESET') {
                        yield new Promise(res => setTimeout(res, ServerUtils_1.ServerUtils.DEFAULT_WAIT));
                        if (trycount < maxRetryCount) {
                            invoke(); // try again
                        }
                        else {
                            failureCallback(err.message);
                        }
                    }
                    else {
                        failureCallback(err.message);
                    }
                }));
            };
            successHttpCallback = (res, report) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (report['message-part']
                    && ((_a = report['message-part'][0]) === null || _a === void 0 ? void 0 : _a.property)) {
                    let prop = report['message-part'][0].property;
                    let baseRoot;
                    let domainRoot;
                    for (const key in prop) {
                        if (prop.hasOwnProperty(key)) {
                            const element = prop[key];
                            if (element.$.name === 'Base-Root') {
                                baseRoot = element.$.value;
                            }
                            else if (element.$.name === 'Domain-Root') {
                                domainRoot = element.$.value;
                            }
                        }
                    }
                    if (log) {
                        this.getOutputChannel().appendLine(`Reply from ${this.getName()}[${this.getHost()}:${this.getAdminPort()}]`);
                        this.getOutputChannel().appendLine(`${this.getName()}[${this.getHost()}] Base-Root: ${baseRoot}`);
                        this.getOutputChannel().appendLine(`${this.getName()}[${this.getHost()}] Domain-Root: ${domainRoot}`);
                    }
                    if (this.isMatchingLocation(baseRoot, domainRoot)) {
                        if (!this.getVersionLabel() && res.headers['server']) {
                            this.setVersionLabel(res.headers['server']);
                        }
                        if (!this.getVersionLabel()) {
                            endpoints.invoke("version", (res, report) => {
                                var _a, _b;
                                if (report['message-part']
                                    && ((_b = (_a = report['message-part'][0]) === null || _a === void 0 ? void 0 : _a.$) === null || _b === void 0 ? void 0 : _b.message)) {
                                    this.setVersionLabel(report['message-part'][0].$.message);
                                    if (log) {
                                        let message = `Successfully connected to ${this.getName()}[${this.getHost()}:${this.getAdminPort()}] ${this.getVersionLabel()}`;
                                        this.getOutputChannel().appendLine(message);
                                        vscode.window.showInformationMessage(message);
                                    }
                                }
                            }, (res, message) => {
                                console.log(`Unable to fetch the version detail from ${this.getName()}[${this.getHost()}]`);
                            });
                        }
                        else if (log) {
                            let message = `Successfully connected to ${this.getName()}[${this.getHost()}:${this.getAdminPort()}] ${this.getVersionLabel()}`;
                            this.getOutputChannel().appendLine(message);
                            vscode.window.showInformationMessage(message);
                        }
                        successCallback();
                    }
                    else if (log) {
                        this.getOutputChannel().appendLine(`Connection terminated as domain name [${this.getDomainName()}] not matched with ${this.getName()}[${path.basename(domainRoot)}]`);
                    }
                }
            });
            failureHttpCallback = (res, message) => __awaiter(this, void 0, void 0, function* () {
                if (res.statusCode === 200) { // https://payara.atlassian.net/browse/APPSERV-52
                    successCallback();
                }
                else {
                    yield new Promise(res => setTimeout(res, ServerUtils_1.ServerUtils.DEFAULT_WAIT));
                    if (trycount < maxRetryCount) {
                        invoke(); // try again
                    }
                    else {
                        failureCallback(message);
                    }
                }
            });
            if (maxRetryCount >= ServerUtils_1.ServerUtils.DEFAULT_RETRY_COUNT) {
                yield new Promise(res => setTimeout(res, ServerUtils_1.ServerUtils.DEFAULT_WAIT));
            }
            invoke();
        });
    }
    addApplication(application) {
        this.applicationInstances.push(application);
    }
    removeApplication(application) {
        let index = this.applicationInstances.indexOf(application, 0);
        if (index > -1) {
            this.applicationInstances.splice(index, 1);
        }
    }
    getApplications() {
        return this.applicationInstances;
    }
    reloadApplications() {
        let payaraServer = this;
        let applicationInstances = new Array();
        let endpoints = new RestEndpoints_1.RestEndpoints(this);
        endpoints.invoke("list-applications", (response, report) => __awaiter(this, void 0, void 0, function* () {
            if (response.statusCode === 200) {
                let message = report['message-part'][0];
                if (message && message.property && Symbol.iterator in Object(message.property)) {
                    for (let property of message.property) {
                        if (property.$.name) {
                            applicationInstances.push(new ApplicationInstance_1.ApplicationInstance(payaraServer, property.$.name, property.$.value));
                        }
                    }
                    payaraServer.applicationInstances = applicationInstances;
                    vscode.commands.executeCommand('payara.server.refresh');
                }
                else {
                    console.log('exiting applications not found ' + message.property);
                }
            }
        }));
    }
    dispose() {
        this.disconnectOutput();
        this.getOutputChannel().dispose();
    }
}
exports.PayaraServerInstance = PayaraServerInstance;
var InstanceState;
(function (InstanceState) {
    InstanceState["RUNNING"] = "runningPayara";
    InstanceState["LOADING"] = "loadingPayara";
    InstanceState["RESTARTING"] = "restartingPayara";
    InstanceState["STOPPED"] = "stoppedPayara";
})(InstanceState = exports.InstanceState || (exports.InstanceState = {}));
//# sourceMappingURL=PayaraServerInstance.js.map