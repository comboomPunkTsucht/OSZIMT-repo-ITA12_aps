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
exports.PayaraLocalServerInstance = void 0;
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
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const cp = require("child_process");
const PortReader_1 = require("./start/PortReader");
const JavaUtils_1 = require("./tooling/utils/JavaUtils");
const ServerUtils_1 = require("./tooling/utils/ServerUtils");
const PayaraServerInstance_1 = require("./PayaraServerInstance");
class PayaraLocalServerInstance extends PayaraServerInstance_1.PayaraServerInstance {
    constructor(name, domainName, path) {
        super(name, domainName);
        this.path = path;
        this.portReader = null;
        this.logStream = null;
    }
    getId() {
        return this.getDomainPath();
    }
    getTooltip() {
        return this.getPath() + '[' + this.getDomainName() + ']';
    }
    getPath() {
        return this.path;
    }
    getServerRoot() {
        return this.getPath();
    }
    getServerHome() {
        return path.join(this.getServerRoot(), 'glassfish');
    }
    getServerModules() {
        return path.join(this.getServerHome(), 'modules');
    }
    getDomainsFolder() {
        return path.join(this.getServerHome(), 'domains');
    }
    getDomainPath() {
        return path.join(this.getDomainsFolder(), this.getDomainName());
    }
    getDomainXmlPath() {
        return path.join(this.getDomainPath(), "config", "domain.xml");
    }
    getServerLog() {
        return path.join(this.getDomainPath(), "logs", "server.log");
    }
    isMatchingLocation(baseRoot, domainRoot) {
        return _.isEmpty(path.relative(baseRoot, path.resolve(this.getPath(), 'glassfish')))
            && path.basename(domainRoot) === this.getDomainName();
    }
    getHost() {
        return 'localhost';
    }
    getHttpPort() {
        if (!this.portReader) {
            this.portReader = this.createPortReader();
        }
        return this.portReader.getHttpPort();
    }
    getHttpsPort() {
        if (!this.portReader) {
            this.portReader = this.createPortReader();
        }
        return this.portReader.getHttpsPort();
    }
    getAdminPort() {
        if (!this.portReader) {
            this.portReader = this.createPortReader();
        }
        return this.portReader.getAdminPort();
    }
    createPortReader() {
        return new PortReader_1.PortReader(this.getDomainXmlPath(), ServerUtils_1.ServerUtils.DAS_NAME);
    }
    checkAliveStatusUsingJPS(callback) {
        let javaHome = this.getJDKHome();
        if (!javaHome) {
            throw new Error("Java home path not found.");
        }
        let javaProcessExe = JavaUtils_1.JavaUtils.javaProcessExecutableFullPath(javaHome);
        // Java Process executable should exist.
        if (!fse.pathExistsSync(javaProcessExe)) {
            throw new Error("Java Process " + javaProcessExe + " executable for " + this.getName() + " was not found");
        }
        let output = cp.execFileSync(javaProcessExe, ['-m', '-l', '-v']);
        let lines = output.toString().split(/(?:\r\n|\r|\n)/g);
        for (let line of lines) {
            let result = line.split(" ");
            if (result.length >= 6
                && result[1] === ServerUtils_1.ServerUtils.PF_MAIN_CLASS
                && result[3] === this.getDomainName()
                && result[5] === this.getDomainPath()) {
                callback();
                break;
            }
        }
    }
    showLog() {
        return __awaiter(this, void 0, void 0, function* () {
            let payaraServer = this;
            return new Promise(() => {
                fs.readFile(this.getServerLog(), 'utf8', function (err, data) {
                    payaraServer.getOutputChannel().appendLine(data.toString());
                });
            });
        });
    }
    connectOutput() {
        if (this.logStream === null && fs.existsSync(this.getServerLog())) {
            if (JavaUtils_1.JavaUtils.IS_WIN) {
                this.logStream = cp.spawn('powershell.exe', ['Get-Content', '-Tail', '20', '-Wait', '-literalpath', this.getServerLog()]);
            }
            else {
                this.logStream = cp.spawn('tail ', ['-f', '-n', '20', this.getServerLog()]);
            }
            if (this.logStream.pid) {
                this.getOutputChannel().show(false);
                let logCallback = (data) => this.getOutputChannel().append(data.toString());
                if (this.logStream.stdout !== null) {
                    this.logStream.stdout.on('data', logCallback);
                }
                if (this.logStream.stderr !== null) {
                    this.logStream.stderr.on('data', logCallback);
                }
            }
        }
    }
    disconnectOutput() {
        if (this.logStream !== null) {
            this.logStream.kill();
        }
    }
    getConfigData() {
        return {
            type: 'local',
            name: this.getName(),
            path: this.getPath(),
            domainName: this.getDomainName(),
            username: this.getUsername(),
            password: this.getPassword(),
            jdkHome: this.getJDKHome(),
            deployOption: this.getDeployOption()
        };
    }
}
exports.PayaraLocalServerInstance = PayaraLocalServerInstance;
//# sourceMappingURL=PayaraLocalServerInstance.js.map