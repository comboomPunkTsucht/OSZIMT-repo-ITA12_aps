'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const lombok_installer_1 = require("./lombok-installer");
function activate(context) {
    lombok_installer_1.install();
}
exports.activate = activate;
function deactivate(context) {
    // VSCode doesn't support settings removing during deactivation (issue #45474)
}
exports.deactivate = deactivate;
//# sourceMappingURL=index.js.map