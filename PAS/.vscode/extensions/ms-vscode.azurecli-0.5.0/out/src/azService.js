"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const child_process_1 = require("child_process");
const path_1 = require("path");
const semver = require("semver");
const utils_1 = require("./utils");
const isWindows = process.platform === 'win32';
class AzService {
    constructor(azNotFound) {
        this.data = '';
        this.listeners = {};
        this.nextSequenceNumber = 1;
        this.getProcess()
            .catch(err => {
            console.log(err);
            azNotFound(err === 'wrongVersion');
        });
    }
    getCompletions(query, onCancel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.send(query, onCancel);
            }
            catch (err) {
                console.error(err);
                return [];
            }
        });
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send({ request: 'status' });
        });
    }
    getHover(command, onCancel) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send({
                request: 'hover',
                command
            }, onCancel);
        });
    }
    send(data, onCancel) {
        return __awaiter(this, void 0, void 0, function* () {
            const process = yield this.getProcess();
            return new Promise((resolve, reject) => {
                if (onCancel) {
                    onCancel(() => reject('canceled'));
                }
                const sequence = this.nextSequenceNumber++;
                this.listeners[sequence] = (err, response) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        try {
                            resolve(response.data);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                };
                const request = { sequence, data };
                const str = JSON.stringify(request);
                process.stdin.write(str + '\n', 'utf8');
            });
        });
    }
    getProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.process) {
                return this.process;
            }
            return this.process = (() => __awaiter(this, void 0, void 0, function* () {
                const { stdout } = yield utils_1.exec('az --version');
                let version = (/azure-cli\s+\(([^)]+)\)/m.exec(stdout)
                    || /azure-cli\s+(\S+)/m.exec(stdout)
                    || [])[1];
                if (version) {
                    const r = /[^-][a-z]/ig;
                    if (r.exec(version)) {
                        version = version.substr(0, r.lastIndex - 1) + '-' + version.substr(r.lastIndex - 1);
                    }
                }
                if (version && semver.valid(version) && !semver.gte(version, '2.0.5')) {
                    throw 'wrongVersion';
                }
                const pythonLocation = (/^Python location '([^']*)'/m.exec(stdout) || [])[1];
                const processOptions = yield this.getSpawnProcessOptions();
                return this.spawn(pythonLocation, processOptions);
            }))().catch(err => {
                this.process = undefined;
                throw err;
            });
        });
    }
    getSpawnProcessOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.platform === 'darwin') {
                try {
                    const which = yield utils_1.exec('which az');
                    const binPath = yield utils_1.realpath(which.stdout.trim());
                    const cellarBasePath = '/usr/local/Cellar/azure-cli/';
                    if (binPath.startsWith(cellarBasePath)) {
                        const installPath = binPath.substr(0, binPath.indexOf('/', cellarBasePath.length));
                        const libPath = `${installPath}/libexec/lib`;
                        const entries = yield utils_1.readdir(libPath);
                        for (const entry of entries) {
                            const packagesPath = `${libPath}/${entry}/site-packages`;
                            if (yield utils_1.exists(packagesPath)) {
                                return { env: { 'PYTHONPATH': packagesPath } };
                            }
                        }
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            return undefined;
        });
    }
    spawn(pythonLocation, processOptions) {
        const process = child_process_1.spawn(path_1.join(__dirname, `../../service/az-service${isWindows ? '.bat' : ''}`), [pythonLocation], processOptions);
        process.stdout.setEncoding('utf8');
        process.stdout.on('data', data => {
            this.data += data;
            const nl = this.data.indexOf('\n');
            if (nl !== -1) {
                const line = this.data.substr(0, nl);
                this.data = this.data.substr(nl + 1);
                const response = JSON.parse(line);
                const listener = this.listeners[response.sequence];
                if (listener) {
                    delete this.listeners[response.sequence];
                    listener(undefined, response);
                }
            }
        });
        process.stderr.setEncoding('utf8');
        process.stderr.on('data', data => {
            console.error(data);
        });
        process.on('error', err => {
            console.error(err);
        });
        process.on('exit', (code, signal) => {
            console.error(`Exit code ${code}, signal ${signal}`);
            this.process = undefined;
            for (const sequence in this.listeners) {
                const listener = this.listeners[sequence];
                delete this.listeners[sequence];
                listener(`Python process terminated with exit code ${code}, signal ${signal}.`, undefined);
            }
        });
        return process;
    }
}
exports.AzService = AzService;
//# sourceMappingURL=azService.js.map