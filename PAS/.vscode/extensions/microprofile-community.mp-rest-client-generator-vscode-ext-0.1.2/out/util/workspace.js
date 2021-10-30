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
const path = require("path");
const processUtil = require("../util/process");
/**
 * Gets the first open workspace folder
 * @returns First open workspace folder if one exists. `undefined` if there is no open workspace.
 */
function getWorkspaceFolder() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders !== undefined && workspaceFolders.length > 0) {
        return workspaceFolders[0].uri;
    }
    return undefined;
}
exports.getWorkspaceFolder = getWorkspaceFolder;
/**
 * @param targetDir target directory to generate open api client into
 * @returns java package name if it can compute one or the empty string
 */
function getDefaultPackageName(targetDir) {
    let index = targetDir.toLowerCase().indexOf(path.sep + "java" + path.sep);
    let defaultPackageName = "";
    if (index > -1) {
        // use everything after the "/java/" to be the package name
        index = index + 6;
        defaultPackageName = targetDir.substring(index).replace(new RegExp("\\" + path.sep, "g"), ".");
    }
    return defaultPackageName;
}
exports.getDefaultPackageName = getDefaultPackageName;
function generateRestClient(jarCommand) {
    return __awaiter(this, void 0, void 0, function* () {
        yield vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating the MicroProfile REST Client interface template...",
        }, () => processUtil.exec(jarCommand));
    });
}
exports.generateRestClient = generateRestClient;
//# sourceMappingURL=workspace.js.map