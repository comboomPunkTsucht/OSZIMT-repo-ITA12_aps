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
exports.PayaraRemoteServerInstance = void 0;
const path = require("path");
const cron_1 = require("cron");
const ServerUtils_1 = require("./tooling/utils/ServerUtils");
const RestEndpoints_1 = require("./endpoints/RestEndpoints");
const PayaraServerInstance_1 = require("./PayaraServerInstance");
class PayaraRemoteServerInstance extends PayaraServerInstance_1.PayaraServerInstance {
    constructor(name, domainName) {
        super(name, domainName);
        this.host = ServerUtils_1.ServerUtils.DEFAULT_HOST;
        this.adminPort = ServerUtils_1.ServerUtils.DEFAULT_ADMIN_PORT;
        this.httpPort = ServerUtils_1.ServerUtils.DEFAULT_HTTP_PORT;
        this.logSequence = 0;
        this.target = 'server';
        this.job = new cron_1.CronJob('*/3 * * * * *', () => this.showLog());
        this.connectionAllowed = false;
    }
    getId() {
        return this.host + ':' + this.adminPort;
    }
    getTooltip() {
        return this.host + ':' + this.adminPort;
    }
    isMatchingLocation(baseRoot, domainRoot) {
        return path.basename(domainRoot) === this.getDomainName();
    }
    isConnectionAllowed() {
        return this.connectionAllowed;
    }
    setConnectionAllowed(connectionAllowed) {
        this.connectionAllowed = connectionAllowed;
        if (this.connectionAllowed) {
            this.logSequence = 0;
            this.getOutputChannel().show(false);
        }
    }
    getHost() {
        return this.host;
    }
    setHost(host) {
        this.host = host;
    }
    getAdminPort() {
        return this.adminPort;
    }
    setAdminPort(adminPort) {
        this.adminPort = adminPort;
    }
    getHttpPort() {
        return this.httpPort;
    }
    setHttpPort(httpPort) {
        this.httpPort = httpPort;
    }
    showLog() {
        return __awaiter(this, void 0, void 0, function* () {
            let payaraServer = this;
            return new Promise(() => {
                let endpoints = new RestEndpoints_1.RestEndpoints(payaraServer);
                endpoints.invoke(`/management/domain/view-log?start=${payaraServer.logSequence}&instanceName=${payaraServer.target}`, (res, report) => __awaiter(this, void 0, void 0, function* () {
                    if (res.statusCode === 200) {
                        payaraServer.getOutputChannel().appendLine(report);
                        let nextLogHeader = res.headers['x-text-append-next'];
                        if (nextLogHeader) {
                            let start = new URLSearchParams(new URL(nextLogHeader).search).get("start");
                            payaraServer.logSequence = start ? parseInt(start) : 0;
                        }
                    }
                }), (res, message) => __awaiter(this, void 0, void 0, function* () {
                    console.log("Remote Payara Instance `/management/domain/view-log : " + message);
                }), 'text/plain;charset=UTF-8');
            });
        });
    }
    connectOutput() {
        if (!this.job.running) {
            this.job.start();
        }
    }
    disconnectOutput() {
        if (this.job.running) {
            this.job.stop();
        }
    }
    getConfigData() {
        return {
            type: 'remote',
            name: this.getName(),
            host: this.getHost(),
            httpPort: this.getHttpPort(),
            adminPort: this.getAdminPort(),
            domainName: this.getDomainName(),
            username: this.getUsername(),
            password: this.getPassword()
        };
    }
}
exports.PayaraRemoteServerInstance = PayaraRemoteServerInstance;
//# sourceMappingURL=PayaraRemoteServerInstance.js.map