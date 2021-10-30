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
const workspace_1 = require("./workspace");
const constants_1 = require("../constants");
function askForFile(customOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign({ canSelectFiles: true, canSelectFolders: false, canSelectMany: false }, customOptions);
        const result = yield vscode.window.showOpenDialog(options);
        if (result && result.length > 0) {
            return result[0];
        }
        return undefined;
    });
}
function askForFolder(customOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign({ canSelectFiles: false, canSelectFolders: true, canSelectMany: false }, customOptions);
        const result = yield vscode.window.showOpenDialog(options);
        if (result && result.length > 0) {
            return result[0];
        }
        return undefined;
    });
}
function askForInputMethod() {
    return __awaiter(this, void 0, void 0, function* () {
        return vscode.window.showQuickPick([constants_1.INPUT_OPTIONS.FROM_FILE, constants_1.INPUT_OPTIONS.FROM_URL], {
            ignoreFocusOut: true,
            placeHolder: "Select a method of providing an OpenAPI file.",
        });
    });
}
exports.askForInputMethod = askForInputMethod;
function askForInputFile(defaultUri) {
    return __awaiter(this, void 0, void 0, function* () {
        return askForFile({
            openLabel: "Generate from this file",
            defaultUri: defaultUri,
        });
    });
}
exports.askForInputFile = askForInputFile;
function askForInputURL() {
    return __awaiter(this, void 0, void 0, function* () {
        return vscode.window.showInputBox({
            placeHolder: "e.g. http://www.example.com/openapi.yaml",
            prompt: "Generate from the file at this URL",
            ignoreFocusOut: true,
        });
    });
}
exports.askForInputURL = askForInputURL;
function askForTargetFolder(defaultUri) {
    return __awaiter(this, void 0, void 0, function* () {
        return askForFolder({
            openLabel: "Generate REST Client into this package",
            defaultUri: defaultUri,
        });
    });
}
exports.askForTargetFolder = askForTargetFolder;
function askForPackageName(targetDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultPackageName = workspace_1.getDefaultPackageName(targetDir);
        const packageNameRegex = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*$/; // used to validate the package name
        return yield vscode.window.showInputBox({
            placeHolder: "e.g. com.example",
            prompt: "Input package name for your project",
            ignoreFocusOut: true,
            validateInput: (value) => {
                // allow no package name or a valid java package name
                if (value !== "" && packageNameRegex.test(value) === false) {
                    return "Invalid package name";
                }
                else {
                    return null;
                }
            },
            value: defaultPackageName,
        });
    });
}
exports.askForPackageName = askForPackageName;
//# sourceMappingURL=vscodePrompts.js.map