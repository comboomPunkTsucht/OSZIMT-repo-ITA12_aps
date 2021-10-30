"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const generateProject_1 = require("./commands/generateProject");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("microprofile.restclient.generate", (fileUri) => {
        generateProject_1.generateProject(fileUri);
    }));
}
exports.activate = activate;
// eslint-disable-next-line @typescript-eslint/no-empty-function
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map