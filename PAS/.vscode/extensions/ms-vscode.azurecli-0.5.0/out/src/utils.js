"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const fs = require("fs");
function exec(command) {
    return new Promise((resolve, reject) => {
        cp.exec(command, (error, stdout, stderr) => {
            (error ? reject : resolve)({ error, stdout, stderr });
        });
    });
}
exports.exec = exec;
function realpath(path) {
    return new Promise((resolve, reject) => {
        fs.realpath(path, (error, resolvedPath) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(resolvedPath);
            }
        });
    });
}
exports.realpath = realpath;
function exists(path) {
    return new Promise(resolve => {
        fs.exists(path, resolve);
    });
}
exports.exists = exists;
function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (error, files) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(files);
            }
        });
    });
}
exports.readdir = readdir;
function never(n) {
    throw new Error(`Should not happen: ${n}`);
}
exports.never = never;
//# sourceMappingURL=utils.js.map