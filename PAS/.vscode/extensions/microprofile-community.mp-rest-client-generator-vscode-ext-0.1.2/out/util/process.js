"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const util_1 = require("util");
exports.exec = util_1.promisify(childProcess.exec);
//# sourceMappingURL=process.js.map