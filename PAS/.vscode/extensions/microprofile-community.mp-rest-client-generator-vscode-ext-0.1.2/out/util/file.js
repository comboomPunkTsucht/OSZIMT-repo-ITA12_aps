"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const stream_1 = require("stream");
const fs = require("fs");
const util_1 = require("util");
const path = require("path");
const ncp = require("ncp");
const fsExtra = require("fs-extra");
const os = require("os");
// Downloads a file using streams to avoid loading entire file into memory
function downloadFile(requestOptions, downloadLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = requestOptions, options = __rest(requestOptions, ["url"]);
        const res = yield node_fetch_1.default(url, options);
        if (res.status >= 400 && res.status < 600) {
            throw new Error(`Bad response from server ${res.status}: ${res.statusText}`);
        }
        return new Promise((resolve, reject) => {
            // create a pipeline that pipes the response to the download location
            stream_1.pipeline(res.body, fs.createWriteStream(downloadLocation), err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
exports.downloadFile = downloadFile;
exports.exists = util_1.promisify(fs.exists);
const mkdtemp = util_1.promisify(fs.mkdtemp);
// generates a temp directory in a existing dir and returns the name of the tmp dir
function generateTempDirectory() {
    return __awaiter(this, void 0, void 0, function* () {
        const tmpDirPrefix = "vscode-rest-client-generator-";
        const tmpDir = yield mkdtemp(path.join(os.tmpdir(), tmpDirPrefix));
        return tmpDir;
    });
}
exports.generateTempDirectory = generateTempDirectory;
exports.copy = util_1.promisify(ncp);
exports.deleteDirectory = util_1.promisify(fsExtra.remove);
//# sourceMappingURL=file.js.map