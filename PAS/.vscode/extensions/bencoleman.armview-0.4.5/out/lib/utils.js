"use strict";
//
// utils.ts - Simple utility functions
// Static helper functions
// Ben Coleman, 2017 & 2019
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutPromise = exports.encode = exports.hashCode = void 0;
// Hashing function
function hashCode(str) {
    let hash = 0;
    let i;
    let chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
exports.hashCode = hashCode;
// Custom string encoder which also encodes single quotes
function encode(str) {
    let temp = encodeURIComponent(str);
    temp = temp.replace(/'/g, '%27');
    return temp;
}
exports.encode = encode;
//
// Stolen from https://github.com/github/fetch/issues/175
// And TypeScript-ified by me
//
function timeoutPromise(ms, promise, msg) {
    return new Promise((resolve, reject) => {
        let timeoutId = setTimeout(() => {
            timeoutId = undefined;
            reject(new Error(msg || 'Promise timeout'));
        }, ms);
        promise.then((res) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                resolve(res);
            }
        }, (err) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                reject(err);
            }
        });
    });
}
exports.timeoutPromise = timeoutPromise;
//# sourceMappingURL=utils.js.map