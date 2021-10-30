'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestEndpoints = void 0;
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
const http = require("http");
const https = require("https");
const fs = require("fs");
const _ = require("lodash");
const xml2js = require("xml2js");
const vscode = require("vscode");
class RestEndpoints {
    constructor(payaraServer) {
        this.payaraServer = payaraServer;
    }
    invoke(command, success, failure, accept, uploadFile) {
        let callback = (response) => {
            if (response.statusCode === 200) {
                response.on('data', data => {
                    if ((accept === null || accept === void 0 ? void 0 : accept.includes('text/plain')) && success) {
                        success(response, data.toString());
                    }
                    else {
                        new xml2js.Parser().parseString(data.toString(), function (err, result) {
                            let report = result['action-report'];
                            let exitCode = report.$['exit-code'];
                            if (exitCode === 'SUCCESS' && success) {
                                success(response, report);
                            }
                            else if (failure) {
                                failure(response, report['message-part'][0].$['message']);
                            }
                            else {
                                vscode.window.showErrorMessage(report['message-part'][0].$['message']);
                            }
                        });
                    }
                });
            }
            else if (response.statusCode === 302 && !this.payaraServer.isSecurityEnabled()) {
                this.payaraServer.setSecurityEnabled(true);
                this.invoke(command, success, failure); // retry on https redirect
            }
            else if (failure) {
                failure(response);
            }
            else {
                vscode.window.showErrorMessage('Error in calling endpoint: ' + command + ', Response Code: ' + response.statusCode);
            }
        };
        let headers = {};
        if (accept) {
            headers['Accept'] = accept;
        }
        else {
            headers['Accept'] = 'application/xml';
        }
        if (uploadFile) {
            headers['Content-Type'] = 'application/zip';
        }
        if (!_.isEmpty(this.payaraServer.getPassword())) {
            headers['Authorization'] = 'Basic ' + Buffer.from(this.payaraServer.getUsername() + ':' + this.payaraServer.getPassword()).toString('base64');
        }
        if (this.payaraServer.isSecurityEnabled() || !_.isEmpty(this.payaraServer.getPassword())) {
            if (!uploadFile) {
                return https.get({
                    hostname: this.payaraServer.getHost(),
                    port: this.payaraServer.getAdminPort(),
                    path: command.startsWith('/') ? command : '/__asadmin/' + command,
                    headers: headers,
                    rejectUnauthorized: false // permits self signed cert
                }, callback);
            }
            else {
                let request = https.request({
                    method: 'POST',
                    hostname: this.payaraServer.getHost(),
                    port: this.payaraServer.getAdminPort(),
                    path: command.startsWith('/') ? command : '/__asadmin/' + command,
                    headers: headers,
                    rejectUnauthorized: false // permits self signed cert
                }, callback);
                request.write(fs.readFileSync(uploadFile));
                request.end();
                return request;
            }
        }
        else {
            if (!uploadFile) {
                return http.get({
                    hostname: this.payaraServer.getHost(),
                    port: this.payaraServer.getAdminPort(),
                    path: command.startsWith('/') ? command : '/__asadmin/' + command,
                    headers: headers
                }, callback);
            }
            else {
                let request = http.request({
                    method: 'POST',
                    hostname: this.payaraServer.getHost(),
                    port: this.payaraServer.getAdminPort(),
                    path: command.startsWith('/') ? command : '/__asadmin/' + command,
                    headers: headers
                }, callback);
                request.write(fs.readFileSync(uploadFile));
                request.end();
                return request;
            }
        }
    }
}
exports.RestEndpoints = RestEndpoints;
//# sourceMappingURL=RestEndpoints.js.map