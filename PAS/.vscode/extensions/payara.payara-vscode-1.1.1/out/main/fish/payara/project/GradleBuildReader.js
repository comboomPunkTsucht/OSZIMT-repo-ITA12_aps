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
exports.GradleBuildReader = void 0;
/*
 * Copyright (c) 2020 Payara Foundation and/or its affiliates and others.
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
const fs = require("fs");
const path = require("path");
class GradleBuildReader {
    constructor(workspaceFolder) {
        this.workspaceFolder = workspaceFolder;
        this.groupId = '';
        this.artifactId = '';
        this.version = '';
        this.finalName = '';
        this.parseBuild();
    }
    parseBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            let reader = this;
            reader.artifactId = this.workspaceFolder.name.toLowerCase();
            let buildPath = path.join(this.workspaceFolder.uri.fsPath, 'build.gradle');
            let settingsPath = path.join(this.workspaceFolder.uri.fsPath, 'settings.gradle');
            let g2js = require('gradle-to-js/lib/parser');
            if (fs.existsSync(buildPath)) {
                let build = yield g2js.parseFile(buildPath);
                reader.groupId = build.group;
                reader.version = build.version;
            }
            if (fs.existsSync(settingsPath)) {
                let settings = yield g2js.parseFile(settingsPath);
                reader.artifactId = settings['rootProject.name'];
            }
            if (reader.artifactId && reader.version) {
                reader.finalName = reader.artifactId + '-' + reader.version;
            }
        });
    }
    getGroupId() {
        return this.groupId;
    }
    getArtifactId() {
        return this.artifactId;
    }
    getVersion() {
        return this.version;
    }
    getFinalName() {
        return this.finalName;
    }
}
exports.GradleBuildReader = GradleBuildReader;
//# sourceMappingURL=GradleBuildReader.js.map