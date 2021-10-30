'use strict';
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
exports.InstanceState = exports.PayaraMicroInstance = void 0;
const path = require("path");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const JDKVersion_1 = require("../server/start/JDKVersion");
const ProjectOutputWindowProvider_1 = require("../project/ProjectOutputWindowProvider");
const BuildSupport_1 = require("../project/BuildSupport");
const DeployOption_1 = require("../common/DeployOption");
class PayaraMicroInstance extends vscode.TreeItem {
    constructor(context, name, path) {
        super(name);
        this.context = context;
        this.name = name;
        this.path = path;
        this.state = InstanceState.STOPPED;
        this.buildPluginExist = false;
        this.debug = false;
        this.deployOption = DeployOption_1.DeployOption.DEFAULT;
        this.label = name;
        this.outputChannel = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().get(name);
        this.setState(InstanceState.STOPPED);
        this.build = BuildSupport_1.BuildSupport.getBuild(this, this.path);
    }
    getBuild() {
        return this.build;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPath() {
        return this.path;
    }
    getJDKHome() {
        return JDKVersion_1.JDKVersion.getDefaultJDKHome();
    }
    setJDKHome(jdkHome) {
        vscode_1.workspace.getConfiguration("java").update("home", jdkHome);
    }
    getDeployOption() {
        return this.deployOption;
    }
    setDeployOption(deployOption) {
        this.deployOption = deployOption;
    }
    setDebug(debug) {
        this.debug = debug;
    }
    isDebug() {
        return this.debug;
    }
    isLoading() {
        return this.state === InstanceState.LOADING;
    }
    isStarted() {
        return this.state === InstanceState.RUNNING;
    }
    isStopped() {
        return this.state === InstanceState.STOPPED;
    }
    setState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = state;
            this.iconPath = this.context.asAbsolutePath(path.join('resources', this.getIcon()));
            this.contextValue = this.getState();
            this.tooltip = this.getPath().fsPath;
            vscode.commands.executeCommand('payara.micro.refresh', this);
        });
    }
    getState() {
        return this.state;
    }
    getIcon() {
        let icon = `payara.svg`;
        if (this.isLoading()) {
            icon = `payara-loading.svg`;
        }
        else if (this.isStarted()) {
            if (this.isDebug()) {
                icon = `payara-started-debug.svg`;
            }
            else {
                icon = `payara-started.svg`;
            }
        }
        return icon;
    }
    getHomePage() {
        return this.homePage;
    }
    setHomePage(homePage) {
        this.homePage = homePage;
    }
    isBuildPluginExist() {
        return this.buildPluginExist;
    }
    setBuildPluginExist(buildPluginExist) {
        this.buildPluginExist = buildPluginExist;
    }
    getProcess() {
        return this.process;
    }
    setProcess(process) {
        this.process = process;
    }
    getOutputChannel() {
        return this.outputChannel;
    }
    dispose() {
        this.outputChannel.dispose();
    }
}
exports.PayaraMicroInstance = PayaraMicroInstance;
var InstanceState;
(function (InstanceState) {
    InstanceState["RUNNING"] = "runningPayaraMicro";
    InstanceState["LOADING"] = "loadingPayaraMicro";
    InstanceState["STOPPED"] = "stoppedPayaraMicro";
})(InstanceState = exports.InstanceState || (exports.InstanceState = {}));
//# sourceMappingURL=PayaraMicroInstance.js.map