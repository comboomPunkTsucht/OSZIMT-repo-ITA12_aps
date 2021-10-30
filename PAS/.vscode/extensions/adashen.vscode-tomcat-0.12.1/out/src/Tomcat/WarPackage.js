'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarPackage = void 0;
const vscode = require("vscode");
class WarPackage extends vscode.TreeItem {
    constructor(label, serverName, iconPath, storagePath) {
        super(label);
        this.label = label;
        this.serverName = serverName;
        this.iconPath = iconPath;
        this.storagePath = storagePath;
        this.contextValue = 'war';
    }
}
exports.WarPackage = WarPackage;
//# sourceMappingURL=WarPackage.js.map