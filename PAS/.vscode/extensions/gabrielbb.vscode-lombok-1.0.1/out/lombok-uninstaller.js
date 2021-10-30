"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const jsonic = require("jsonic");
const util_1 = require("./util");
function uninstall() {
    const userSettingsPath = util_1.getUserSettingsPath(process.platform);
    if (fs_1.existsSync(userSettingsPath)) {
        const settings = jsonic(fs_1.readFileSync(userSettingsPath, 'utf8'));
        const vmArgs = settings[util_1.VM_ARGS_KEY];
        if (vmArgs && vmArgs.match(/-javaagent:".*"/)) {
            const newVmArgs = vmArgs.replace(/-javaagent:".*"/, "").trim();
            settings[util_1.VM_ARGS_KEY] = newVmArgs === "" ? undefined : newVmArgs;
            fs_1.writeFileSync(userSettingsPath, JSON.stringify(settings, null, 2), 'utf8');
        }
    }
}
exports.uninstall = uninstall;
//# sourceMappingURL=lombok-uninstaller.js.map