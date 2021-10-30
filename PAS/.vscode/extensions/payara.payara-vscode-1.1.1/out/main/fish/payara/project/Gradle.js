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
exports.Gradle = void 0;
/*
 * Copyright (c) 2020-2021 Payara Foundation and/or its affiliates and others.
 * All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0, which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the
 * Eclipse Public License v. 2.0 are satisfied: GNU General Public License,
 * version 2 with the GNU Classpath Exception, which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 */
const vscode = require("vscode");
const path = require("path");
const cp = require("child_process");
const fs = require("fs");
const JavaUtils_1 = require("../server/tooling/utils/JavaUtils");
const ProjectOutputWindowProvider_1 = require("./ProjectOutputWindowProvider");
const GradleBuildReader_1 = require("./GradleBuildReader");
const GradleMicroPluginReader_1 = require("./GradleMicroPluginReader");
const PayaraMicroGradlePlugin_1 = require("../micro/PayaraMicroGradlePlugin");
const TaskManager_1 = require("./TaskManager");
const DeployOption_1 = require("../common/DeployOption");
class Gradle {
    constructor(payaraInstance, workspaceFolder) {
        this.payaraInstance = payaraInstance;
        this.workspaceFolder = workspaceFolder;
        this.readBuildConfig();
    }
    static detect(workspaceFolder) {
        let build = path.join(workspaceFolder.uri.fsPath, 'build.gradle');
        return fs.existsSync(build);
    }
    buildProject(remote, callback, silent) {
        let taskManager = new TaskManager_1.TaskManager();
        let taskDefinition;
        taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultServerBuildConfig(remote));
        let commands = taskDefinition.command.split(/\s+/);
        return this.fireCommand(commands, () => { }, (code) => {
            if (code === 0 && this.workspaceFolder) {
                let buildDir = this.getBuildDir();
                let artifacts = fs.readdirSync(buildDir);
                let artifact = null;
                for (var i = 0; i < artifacts.length; i++) {
                    var filename = path.join(buildDir, artifacts[i]);
                    if (remote) {
                        if (artifacts[i].endsWith('.war')
                            || artifacts[i].endsWith('.jar')
                            || artifacts[i].endsWith('.rar')) {
                            artifact = filename;
                            break;
                        }
                    }
                    else {
                        if (artifacts[i].endsWith('.war')
                            || artifacts[i].endsWith('.jar')
                            || artifacts[i].endsWith('.rar')
                            || artifacts[i] === this.getBuildReader().getFinalName()) {
                            artifact = filename;
                            break;
                        }
                    }
                }
                if (artifact !== null) {
                    callback(artifact);
                }
                else {
                    let errorMessage = 'Deployment artifact not found in the target.';
                    if (remote) {
                        vscode.window.showErrorMessage(errorMessage
                            + ' Make sure the deployment file ends with .jar, .rar, or .war to deploy an application to the remote instance.');
                    }
                    else {
                        vscode.window.showErrorMessage(errorMessage);
                    }
                }
            }
            if (code !== 0) {
                vscode.window.showErrorMessage(`Gradle Build Failure: ${this.workspaceFolder.name}`);
            }
        }, (error) => {
            vscode.window.showErrorMessage(`Error building project ${this.workspaceFolder.name}: ${error.message}`);
        }, silent);
    }
    fireCommand(commands, dataCallback, exitCallback, errorCallback, silent) {
        if (commands.length <= 1) {
            throw new Error(`Invalid command definition ${commands.join(" ")}`);
        }
        let gradleExe = commands[0];
        let args = commands.splice(1, commands.length);
        if (gradleExe === "gradlew") {
            gradleExe = this.getWrapperFullPath();
        }
        else {
            gradleExe = this.getExecutableFullPath(undefined);
        }
        if (!this.workspaceFolder) {
            throw new Error("WorkSpace path not found.");
        }
        let jdkHome;
        let env = {};
        if (this.payaraInstance && (jdkHome = this.payaraInstance.getJDKHome())) {
            env['JAVA_HOME'] = jdkHome;
        }
        let process = cp.spawn(gradleExe, args, { cwd: this.workspaceFolder.uri.fsPath, env: env });
        if (process.pid) {
            let projectOutputWindowProvider = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance();
            let outputChannel = projectOutputWindowProvider.get(this.workspaceFolder);
            if (silent !== true) {
                outputChannel.show(false);
            }
            else {
                projectOutputWindowProvider.updateStatusBar(`Running ${commands.join(" ")}`);
            }
            if (jdkHome) {
                outputChannel.append("Java Platform: " + jdkHome + '\n');
            }
            outputChannel.append("> " + gradleExe + ' ' + args.join(" ") + '\n');
            let logCallback = (data) => {
                outputChannel.append(data.toString());
                dataCallback(data.toString());
            };
            if (process.stdout !== null) {
                process.stdout.on('data', logCallback);
            }
            if (process.stderr !== null) {
                process.stderr.on('data', logCallback);
            }
            process.on('error', errorCallback);
            process.on('exit', exitCallback);
        }
        return process;
    }
    getDefaultHome() {
        const config = vscode.workspace.getConfiguration();
        let gradleHome = config.get('gradle.home');
        if (!gradleHome) {
            gradleHome = process.env.GRADLE_HOME;
        }
        return gradleHome;
    }
    getExecutableFullPath(gradleHome) {
        if (!gradleHome) {
            gradleHome = this.getDefaultHome();
        }
        if (!gradleHome) {
            throw new Error("Gradle home path not found.");
        }
        let homeEndsWithPathSep = gradleHome.charAt(gradleHome.length - 1) === path.sep;
        let gradleExecStr;
        let executor = gradleHome;
        if (!homeEndsWithPathSep) {
            executor += path.sep;
        }
        executor += 'bin' + path.sep + 'gradle';
        if (JavaUtils_1.JavaUtils.IS_WIN) {
            if (fs.existsSync(executor + '.bat')) {
                gradleExecStr = executor + ".bat";
            }
            else if (fs.existsSync(executor + '.cmd')) {
                gradleExecStr = executor + ".cmd";
            }
            else {
                throw new Error(`Gradle executable ${executor}.cmd not found.`);
            }
        }
        else if (fs.existsSync(executor)) {
            gradleExecStr = executor;
        }
        // Gradle executable should exist.
        if (!gradleExecStr || !fs.existsSync(gradleExecStr)) {
            throw new Error(`Gradle executable [${gradleExecStr}] not found`);
        }
        return gradleExecStr;
    }
    getWrapperFullPath() {
        let executor;
        let gradleExecStr;
        if (this.workspaceFolder &&
            fs.existsSync(path.join(this.workspaceFolder.uri.fsPath, 'gradle', 'wrapper'))) {
            executor = this.workspaceFolder.uri.fsPath + path.sep + 'gradlew';
            if (JavaUtils_1.JavaUtils.IS_WIN) {
                if (fs.existsSync(executor + '.bat')) {
                    gradleExecStr = executor + '.bat';
                }
                else if (fs.existsSync(executor + '.cmd')) {
                    gradleExecStr = executor + '.cmd';
                }
                else {
                    throw new Error(`${executor}.bat not found in the workspace.`);
                }
            }
            else if (fs.existsSync(executor)) {
                gradleExecStr = executor;
            }
        }
        if (!gradleExecStr || !fs.existsSync(gradleExecStr)) {
            throw new Error(`${executor} not found in the workspace.`);
        }
        return gradleExecStr;
    }
    getBuildDir() {
        let buildDir = path.join(this.workspaceFolder.uri.fsPath, 'build', 'libs');
        if (!fs.existsSync(buildDir)) {
            throw Error("no build dir found: " + buildDir);
        }
        return buildDir;
    }
    getWorkSpaceFolder() {
        return this.workspaceFolder;
    }
    getBuildReader() {
        if (!this.buildReader) {
            throw Error("Build reader not initilized yet");
        }
        return this.buildReader;
    }
    getMicroPluginReader() {
        if (!this.microPluginReader) {
            throw Error("Build reader not initilized yet");
        }
        return this.microPluginReader;
    }
    readBuildConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Gradle.detect(this.workspaceFolder)) {
                this.microPluginReader = new GradleMicroPluginReader_1.GradleMicroPluginReader(this.workspaceFolder);
                this.buildReader = new GradleBuildReader_1.GradleBuildReader(this.workspaceFolder);
            }
        });
    }
    generateMicroProject(project, callback) {
        throw new Error("Gradle project generator not supported yet.");
    }
    startPayaraMicro(debugConfig, onData, onExit, onError) {
        var _a;
        if (this.getMicroPluginReader().isDeployWarEnabled() === false
            && this.getMicroPluginReader().isUberJarEnabled() === false) {
            vscode.window.showWarningMessage('Please either enable the deployWar or useUberJar option in fish.payara.micro-gradle-plugin configuration to deploy the application.');
            return;
        }
        let taskManager = new TaskManager_1.TaskManager();
        let taskDefinition;
        if (this.getMicroPluginReader().isUberJarEnabled()) {
            taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultMicroStartUberJarConfig());
        }
        else {
            taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultMicroStartExplodedWarConfig());
        }
        let commands = taskDefinition.command.split(/\s+/);
        if (((_a = this.payaraInstance) === null || _a === void 0 ? void 0 : _a.getDeployOption()) == DeployOption_1.DeployOption.HOT_RELOAD) {
            commands.push('-DhotDeploy=true');
        }
        if (debugConfig) {
            commands.push(`-DpayaraMicro.debug=-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=${debugConfig.port}`);
        }
        return this.fireCommand(commands, onData, onExit, onError);
    }
    reloadPayaraMicro(onExit, onError, metadataChanged, sourcesChanged) {
        var _a;
        if (this.getMicroPluginReader().isUberJarEnabled()) {
            vscode.window.showWarningMessage('The reload action not supported for UberJar artifact.');
            return;
        }
        let taskManager = new TaskManager_1.TaskManager();
        let taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultMicroReloadConfig());
        let commands = taskDefinition.command.split(/\s+/);
        if (((_a = this.payaraInstance) === null || _a === void 0 ? void 0 : _a.getDeployOption()) == DeployOption_1.DeployOption.HOT_RELOAD) {
            commands.push('-DhotDeploy=true');
            if (metadataChanged) {
                commands.push('-DmetadataChanged=true');
            }
            if (Array.isArray(sourcesChanged) && sourcesChanged.length > 0) {
                commands.push(`-DsourcesChanged=${sourcesChanged.join(',')}`);
            }
        }
        return this.fireCommand(commands, () => { }, onExit, onError);
    }
    stopPayaraMicro(onExit, onError) {
        let taskManager = new TaskManager_1.TaskManager();
        let taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultMicroStopConfig());
        let commands = taskDefinition.command.split(/\s+/);
        return this.fireCommand(commands, () => { }, onExit, onError);
    }
    bundlePayaraMicro(onExit, onError) {
        let taskManager = new TaskManager_1.TaskManager();
        let taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultMicroBundleConfig());
        let commands = taskDefinition.command.split(/\s+/);
        return this.fireCommand(commands, () => { }, onExit, onError);
    }
    getDefaultServerBuildConfig(remote) {
        return {
            label: "payara-server-build",
            type: "shell",
            command: "gradle clean build " + (remote ? "war" : "warExplode"),
            group: "build"
        };
    }
    getDefaultMicroBundleConfig() {
        return {
            label: "payara-micro-bundle",
            type: "shell",
            command: `gradle ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.BUNDLE_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroStartUberJarConfig() {
        return {
            label: "payara-micro-uber-jar-start",
            type: "shell",
            command: `gradle ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.BUNDLE_GOAL} ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.START_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroStartExplodedWarConfig() {
        return {
            label: "payara-micro-exploded-war-start",
            type: "shell",
            command: `gradle -DpayaraMicro.exploded=true -DpayaraMicro.deployWar=true ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.WAR_EXPLODE_GOAL} ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.START_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroReloadConfig() {
        return {
            label: "payara-micro-reload",
            type: "shell",
            command: `gradle ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.WAR_EXPLODE_GOAL} ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.RELOAD_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroStopConfig() {
        return {
            label: "payara-micro-stop",
            type: "shell",
            command: `gradle ${PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.STOP_GOAL}`,
            group: "build"
        };
    }
}
exports.Gradle = Gradle;
//# sourceMappingURL=Gradle.js.map