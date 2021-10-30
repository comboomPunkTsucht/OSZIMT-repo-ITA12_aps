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
exports.PayaraInstanceProvider = void 0;
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
const os = require("os");
const fs = require("fs");
const fse = require("fs-extra");
const ServerUtils_1 = require("./tooling/utils/ServerUtils");
const PayaraLocalServerInstance_1 = require("./PayaraLocalServerInstance");
const PayaraRemoteServerInstance_1 = require("./PayaraRemoteServerInstance");
class PayaraInstanceProvider {
    constructor(context) {
        this.context = context;
        this.servers = [];
        this.unlistedServers = [];
        this.serversConfig = this.getServersConfig(context);
        this.unlistedServersConfig = this.getUnlistedServersConfig(context);
    }
    loadServerConfigs() {
        return __awaiter(this, void 0, void 0, function* () {
            this
                .readServerConfig()
                .forEach((instance) => {
                let payaraServer = instance.type === 'local' ?
                    new PayaraLocalServerInstance_1.PayaraLocalServerInstance(instance.name, instance.domainName, instance.path) :
                    new PayaraRemoteServerInstance_1.PayaraRemoteServerInstance(instance.name, instance.domainName);
                if (instance.deployOption) {
                    payaraServer.setDeployOption(instance.deployOption);
                }
                if (instance.username) {
                    payaraServer.setUsername(instance.username);
                }
                if (instance.password) {
                    payaraServer.setPassword(instance.password);
                }
                if (payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance) {
                    if (instance.jdkHome) {
                        payaraServer.setJDKHome(instance.jdkHome);
                    }
                    payaraServer.checkAliveStatusUsingJPS(() => {
                        payaraServer.connectOutput();
                        payaraServer.setStarted(true);
                    });
                }
                else if (payaraServer instanceof PayaraRemoteServerInstance_1.PayaraRemoteServerInstance) {
                    payaraServer.setHost(instance.host ? instance.host.trim() : ServerUtils_1.ServerUtils.DEFAULT_HOST);
                    payaraServer.setAdminPort(instance.adminPort ? instance.adminPort : ServerUtils_1.ServerUtils.DEFAULT_ADMIN_PORT);
                    payaraServer.setHttpPort(instance.httpPort ? instance.httpPort : ServerUtils_1.ServerUtils.DEFAULT_HTTP_PORT);
                    if (payaraServer.isConnectionAllowed()) {
                        payaraServer.checkAliveStatusUsingRest(ServerUtils_1.ServerUtils.DEFAULT_RETRY_COUNT, () => __awaiter(this, void 0, void 0, function* () {
                            payaraServer.setStarted(true);
                            payaraServer.connectOutput();
                            vscode.commands.executeCommand('payara.server.refresh');
                            payaraServer.reloadApplications();
                        }), (message) => __awaiter(this, void 0, void 0, function* () {
                            payaraServer.setStarted(false);
                            vscode.commands.executeCommand('payara.server.refresh');
                        }));
                    }
                }
                this.addServer(payaraServer);
            });
            this.readUnlistedServerConfig()
                .forEach((instance) => {
                if (instance.type === 'local') {
                    this.unlistedServers.push(new PayaraLocalServerInstance_1.PayaraLocalServerInstance(instance.name, instance.domainName, instance.path));
                }
            });
        });
    }
    getServers() {
        return this.servers;
    }
    getUnlistedServers() {
        let oldUnlistedServers = this.unlistedServers;
        this.unlistedServers = this.unlistedServers
            .filter(server => fs.existsSync(server.getPath()))
            .filter(server => ServerUtils_1.ServerUtils.isValidServerPath(server.getPath()));
        if (oldUnlistedServers.length !== this.unlistedServers.length) {
            this.updateUnlistedServerConfig();
        }
        return this.unlistedServers;
    }
    getServerByName(name) {
        return this.servers.find(item => item.getName() === name);
    }
    getServersConfig(context) {
        let storagePath;
        if (context.globalStoragePath) {
            if (!fs.existsSync(context.globalStoragePath)) {
                fs.mkdirSync(context.globalStoragePath);
            }
            storagePath = context.globalStoragePath;
        }
        else {
            storagePath = path.resolve(os.tmpdir(), `payara_vscode`);
        }
        let serversConfig = path.join(storagePath, 'servers.json');
        if (!fs.existsSync(serversConfig)) {
            fs.writeFileSync(serversConfig, "[]");
        }
        return serversConfig;
    }
    getUnlistedServersConfig(context) {
        let storagePath;
        if (context.globalStoragePath) {
            if (!fs.existsSync(context.globalStoragePath)) {
                fs.mkdirSync(context.globalStoragePath);
            }
            storagePath = context.globalStoragePath;
        }
        else {
            storagePath = path.resolve(os.tmpdir(), `payara_vscode`);
        }
        let unlistedServersConfig = path.join(storagePath, 'unlisted_servers.json');
        if (!fs.existsSync(unlistedServersConfig)) {
            fs.writeFileSync(unlistedServersConfig, "[]");
        }
        return unlistedServersConfig;
    }
    addServer(payaraServer) {
        this.removeServerFromListed(payaraServer);
        if (payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance) {
            this.removeServerFromUnlisted(payaraServer);
        }
        this.servers.push(payaraServer);
        this.updateServerConfig();
        this.updateUnlistedServerConfig();
    }
    removeServer(payaraServer) {
        if (this.removeServerFromListed(payaraServer)) {
            if (payaraServer instanceof PayaraLocalServerInstance_1.PayaraLocalServerInstance) {
                this.removeServerFromUnlisted(payaraServer);
                this.unlistedServers.push(payaraServer);
            }
            this.updateServerConfig();
            this.updateUnlistedServerConfig();
            return true;
        }
        return false;
    }
    removeServerFromListed(payaraServer) {
        const index = this.servers.findIndex(server => server.getName() === payaraServer.getName());
        if (index > -1) {
            this.servers.splice(index, 1);
            return true;
        }
        return false;
    }
    removeServerFromUnlisted(payaraServer) {
        const index = this.unlistedServers.findIndex(server => server.getPath() === payaraServer.getPath());
        if (index > -1) {
            this.unlistedServers.splice(index, 1);
            return true;
        }
        return false;
    }
    updateServerConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fse.outputJson(this.serversConfig, this.servers.map(instance => instance.getConfigData()));
            }
            catch (error) {
                console.error(error.toString());
            }
        });
    }
    updateUnlistedServerConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fse.outputJson(this.unlistedServersConfig, this.unlistedServers.map(instance => {
                    return {
                        name: instance.getName(),
                        path: instance.getPath(),
                        domainName: instance.getDomainName()
                    };
                }));
            }
            catch (error) {
                console.error(error.toString());
            }
        });
    }
    readServerConfig() {
        let data = fse.readFileSync(this.serversConfig);
        return JSON.parse(data.toString());
    }
    readUnlistedServerConfig() {
        let data = fse.readFileSync(this.unlistedServersConfig);
        return JSON.parse(data.toString());
    }
}
exports.PayaraInstanceProvider = PayaraInstanceProvider;
//# sourceMappingURL=PayaraInstanceProvider.js.map