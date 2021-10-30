"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VM_ARGS_KEY = "java.jdt.ls.vmargs";
function getUserSettingsPath(platform) {
    const map = {
        win32: process.env.APPDATA + '\\Code\\User\\settings.json',
        darwin: process.env.HOME + '/Library/Application Support/Code/User/settings.json',
        linux: process.env.HOME + '/.config/Code/User/settings.json'
    };
    return map[platform];
}
exports.getUserSettingsPath = getUserSettingsPath;
//# sourceMappingURL=util.js.map