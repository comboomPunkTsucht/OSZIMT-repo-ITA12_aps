'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maven = void 0;
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
const MavenPomReader_1 = require("./MavenPomReader");
const PayaraMicroMavenPlugin_1 = require("../micro/PayaraMicroMavenPlugin");
const ProjectOutputWindowProvider_1 = require("./ProjectOutputWindowProvider");
const MavenMicroPluginReader_1 = require("./MavenMicroPluginReader");
const TaskManager_1 = require("./TaskManager");
const DeployOption_1 = require("../common/DeployOption");
class Maven {
    constructor(payaraInstance, workspaceFolder) {
        this.payaraInstance = payaraInstance;
        this.workspaceFolder = workspaceFolder;
        this.readBuildConfig();
    }
    static detect(workspaceFolder) {
        let pom = path.join(workspaceFolder.uri.fsPath, 'pom.xml');
        return fs.existsSync(pom);
    }
    buildProject(remote, callback, silent) {
        let taskManager = new TaskManager_1.TaskManager();
        let taskDefinition = taskManager.getPayaraConfig(this.workspaceFolder, this.getDefaultServerBuildConfig(remote));
        let commands = taskDefinition.command.split(/\s+/);
        return this.fireCommand(commands, () => { }, (code) => {
            if (code === 0 && this.workspaceFolder) {
                let targetDir = this.getBuildDir();
                let artifacts = fs.readdirSync(targetDir);
                let artifact = null;
                for (var i = 0; i < artifacts.length; i++) {
                    var filename = path.join(targetDir, artifacts[i]);
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
                vscode.window.showErrorMessage(`Maven Build Failure: ${this.workspaceFolder.name}`);
            }
        }, (error) => {
            vscode.window.showErrorMessage(`Error building project ${this.workspaceFolder.name}: ${error.message}`);
        }, silent);
    }
    fireCommand(commands, dataCallback, exitCallback, errorCallback, silent) {
        if (commands.length <= 1) {
            throw new Error(`Invalid command definition ${commands.join(" ")}`);
        }
        let mavenExe = commands[0];
        let args = commands.splice(1, commands.length);
        if (mavenExe === "mvnw") {
            mavenExe = this.getWrapperFullPath();
        }
        else {
            mavenExe = this.getExecutableFullPath(undefined);
        }
        if (!this.workspaceFolder) {
            throw new Error("WorkSpace path not found.");
        }
        let jdkHome;
        let env = {};
        if (this.payaraInstance && (jdkHome = this.payaraInstance.getJDKHome())) {
            env['JAVA_HOME'] = jdkHome;
        }
        let process = cp.spawn(mavenExe, args, { cwd: this.workspaceFolder.uri.fsPath, env: env });
        if (process.pid) {
            let outputChannel = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().get(this.workspaceFolder);
            if (silent !== true) {
                outputChannel.show(false);
            }
            if (jdkHome) {
                outputChannel.append("Java Platform: " + jdkHome + '\n');
            }
            outputChannel.append("> " + mavenExe + ' ' + args.join(" ") + '\n');
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
        let mavenHome = config.get('maven.home');
        if (!mavenHome) {
            mavenHome = process.env.M2_HOME;
            if (!mavenHome) {
                mavenHome = process.env.MAVEN_HOME;
            }
        }
        return mavenHome;
    }
    getExecutableFullPath(mavenHome) {
        if (!mavenHome) {
            mavenHome = this.getDefaultHome();
        }
        if (!mavenHome) {
            throw new Error("Maven home path not found.");
        }
        let mavenHomeEndsWithPathSep = mavenHome.charAt(mavenHome.length - 1) === path.sep;
        let mavenExecStr;
        let executor = mavenHome;
        if (!mavenHomeEndsWithPathSep) {
            executor += path.sep;
        }
        executor += 'bin' + path.sep + 'mvn';
        if (JavaUtils_1.JavaUtils.IS_WIN) {
            if (fs.existsSync(executor + '.bat')) {
                mavenExecStr = executor + ".bat";
            }
            else if (fs.existsSync(executor + '.cmd')) {
                mavenExecStr = executor + ".cmd";
            }
            else {
                throw new Error(`Maven executable ${executor}.cmd not found.`);
            }
        }
        else if (fs.existsSync(executor)) {
            mavenExecStr = executor;
        }
        // Maven executable should exist.
        if (!mavenExecStr || !fs.existsSync(mavenExecStr)) {
            throw new Error(`Maven executable [${mavenExecStr}] not found`);
        }
        return mavenExecStr;
    }
    getWrapperFullPath() {
        let executor;
        let mavenExecStr;
        if (this.workspaceFolder &&
            fs.existsSync(path.join(this.workspaceFolder.uri.fsPath, '.mvn', 'wrapper'))) {
            executor = this.workspaceFolder.uri.fsPath + path.sep + 'mvnw';
            if (JavaUtils_1.JavaUtils.IS_WIN) {
                if (fs.existsSync(executor + '.bat')) {
                    mavenExecStr = executor + '.bat';
                }
                else if (fs.existsSync(executor + '.cmd')) {
                    mavenExecStr = executor + '.cmd';
                }
                else {
                    throw new Error(`${executor}.cmd not found in the workspace.`);
                }
            }
            else if (fs.existsSync(executor)) {
                mavenExecStr = executor;
            }
        }
        if (!mavenExecStr || !fs.existsSync(mavenExecStr)) {
            throw new Error(`${executor} not found in the workspace.`);
        }
        return mavenExecStr;
    }
    getBuildDir() {
        let targetDir = path.join(this.workspaceFolder.uri.fsPath, 'target');
        if (!fs.existsSync(targetDir)) {
            throw Error("no target dir found: " + targetDir);
        }
        return targetDir;
    }
    getWorkSpaceFolder() {
        return this.workspaceFolder;
    }
    getBuildReader() {
        if (!this.pomReader) {
            throw Error("Pom reader not initilized yet");
        }
        return this.pomReader;
    }
    getMicroPluginReader() {
        if (!this.microPluginReader) {
            throw Error("Pom reader not initilized yet");
        }
        return this.microPluginReader;
    }
    readBuildConfig() {
        if (Maven.detect(this.workspaceFolder)) {
            this.microPluginReader = new MavenMicroPluginReader_1.MavenMicroPluginReader(this.workspaceFolder);
            this.pomReader = new MavenPomReader_1.MavenPomReader(this.workspaceFolder);
        }
    }
    generateMicroProject(project, callback) {
        var _a;
        let mavenHome = this.getDefaultHome();
        if (!mavenHome) {
            throw new Error("Maven home path not found.");
        }
        let mavenExe = this.getExecutableFullPath(mavenHome);
        // Maven executable should exist.
        if (!fs.existsSync(mavenExe)) {
            throw new Error("Maven executable [" + mavenExe + "] not found");
        }
        const cmdArgs = [
            "archetype:generate",
            `-DarchetypeArtifactId=payara-micro-maven-archetype`,
            `-DarchetypeGroupId=fish.payara.maven.archetypes`,
            `-DarchetypeVersion=1.0.5`,
            `-DgroupId=${project.groupId}`,
            `-DartifactId=${project.artifactId}`,
            `-Dversion=${project.version}`,
            `-Dpackage=${project.package}`,
            `-DpayaraMicroVersion=${project.payaraMicroVersion}`,
            '-DaddPayaraApi=true',
            '-DinteractiveMode=false'
        ];
        let process = cp.spawn(mavenExe, cmdArgs, { cwd: (_a = project.targetFolder) === null || _a === void 0 ? void 0 : _a.fsPath });
        if (process.pid) {
            let outputChannel = ProjectOutputWindowProvider_1.ProjectOutputWindowProvider.getInstance().get(`${project.artifactId}`);
            outputChannel.show(false);
            let logCallback = (data) => outputChannel.append(data.toString());
            if (process.stdout !== null) {
                process.stdout.on('data', logCallback);
            }
            if (process.stderr !== null) {
                process.stderr.on('data', logCallback);
            }
            process.on('error', (err) => {
                console.log('error: ' + err.message);
            });
            process.on('exit', (code) => {
                if (code === 0 && project.targetFolder && project.artifactId) {
                    callback(vscode.Uri.file(path.join(project.targetFolder.fsPath, project.artifactId)));
                }
            });
        }
        return process;
    }
    startPayaraMicro(debugConfig, onData, onExit, onError) {
        var _a;
        if (this.getMicroPluginReader().isDeployWarEnabled() === false
            && this.getMicroPluginReader().isUberJarEnabled() === false) {
            vscode.window.showWarningMessage('Please either enable the deployWar or useUberJar option in payara-micro-maven-plugin configuration to deploy the application.');
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
            commands.push(`-Ddebug=-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=${debugConfig.port}`);
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
            command: "mvn resources:resources compiler:compile " + (remote ? "war:war" : "war:exploded"),
            group: "build"
        };
    }
    getDefaultMicroBundleConfig() {
        return {
            label: "payara-micro-bundle",
            type: "shell",
            command: `mvn install ${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.GROUP_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.ARTIFACT_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.BUNDLE_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroStartUberJarConfig() {
        return {
            label: "payara-micro-uber-jar-start",
            type: "shell",
            command: `mvn install ${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.GROUP_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.ARTIFACT_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.BUNDLE_GOAL} ${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.GROUP_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.ARTIFACT_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.START_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroStartExplodedWarConfig() {
        return {
            label: "payara-micro-exploded-war-start",
            type: "shell",
            command: `mvn resources:resources compiler:compile war:exploded -Dexploded=true -DdeployWar=true ${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.GROUP_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.ARTIFACT_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.START_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroReloadConfig() {
        return {
            label: "payara-micro-reload",
            type: "shell",
            command: `mvn resources:resources compiler:compile war:exploded ${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.GROUP_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.ARTIFACT_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.RELOAD_GOAL}`,
            group: "build"
        };
    }
    getDefaultMicroStopConfig() {
        return {
            label: "payara-micro-stop",
            type: "shell",
            command: `mvn ${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.GROUP_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.ARTIFACT_ID}:${PayaraMicroMavenPlugin_1.PayaraMicroMavenPlugin.STOP_GOAL}`,
            group: "build"
        };
    }
}
exports.Maven = Maven;
//# sourceMappingURL=Maven.js.map