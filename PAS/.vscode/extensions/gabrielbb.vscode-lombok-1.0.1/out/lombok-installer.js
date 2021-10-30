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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
const path = require("path");
const util_1 = require("./util");
const { publisher, name } = require('../package.json');
function getExtensionInstance() {
    const extensionId = publisher + '.' + name;
    const instance = vscode.extensions.getExtension(extensionId);
    if (!instance) {
        throw new Error("Could not get extension instance with id " + extensionId);
    }
    return instance;
}
function updateVmArgs(value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield getWorkspaceConfig().update(util_1.VM_ARGS_KEY, value, vscode_1.ConfigurationTarget.Global);
        vscode.window.showInformationMessage("If you have any trouble using Lombok, please, make sure your project is using the latest version");
    });
}
function getWorkspaceConfig() {
    return vscode.workspace.getConfiguration();
}
exports.getJarPath = () => path.join(getExtensionInstance().extensionPath, "server", "lombok.jar");
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        const javaAgentArg = `-javaagent:"${exports.getJarPath()}"`;
        const vmArgs = getWorkspaceConfig().get(util_1.VM_ARGS_KEY);
        if (!vmArgs) {
            yield updateVmArgs(javaAgentArg);
        }
        else if (!vmArgs.match(/-javaagent:".*"/)) {
            yield updateVmArgs(vmArgs.trim() + ' ' + javaAgentArg);
        }
        else if (!vmArgs.includes(javaAgentArg)) {
            yield updateVmArgs(vmArgs.replace(/-javaagent:".*"/, javaAgentArg));
        }
    });
}
exports.install = install;
//# sourceMappingURL=lombok-installer.js.map