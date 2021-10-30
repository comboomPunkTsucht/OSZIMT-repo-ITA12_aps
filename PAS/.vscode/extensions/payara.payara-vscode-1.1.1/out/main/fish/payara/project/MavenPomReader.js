'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MavenPomReader = void 0;
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
const fse = require("fs-extra");
const path = require("path");
const xml2js = require("xml2js");
class MavenPomReader {
    constructor(workspaceFolder) {
        this.workspaceFolder = workspaceFolder;
        this.groupId = '';
        this.artifactId = '';
        this.version = '';
        this.finalName = '';
        this.parsePom();
    }
    parsePom() {
        let reader = this;
        let pomPath = path.join(this.workspaceFolder.uri.fsPath, 'pom.xml');
        if (fse.existsSync(pomPath)) {
            let data = fse.readFileSync(pomPath);
            let parser = new xml2js.Parser({
                trim: true,
                explicitArray: true
            });
            parser.parseString(data, function (err, result) {
                if (err) {
                    throw new Error(`Unable to parse file ${pomPath} : ${err.message}`);
                }
                if (result.project) {
                    let project = result.project;
                    reader.groupId = project.groupId[0];
                    reader.artifactId = project.artifactId[0];
                    reader.version = project.version[0];
                    reader.finalName = reader.parseBuild(project.build);
                    if (project.profiles
                        && project.profiles[0].profile) {
                        for (let profile of project.profiles[0].profile) {
                            if (reader.finalName.length > 0) {
                                break;
                            }
                            reader.finalName = reader.parseBuild(profile.build);
                        }
                    }
                    if (reader.finalName.length < 1) {
                        reader.finalName = `${reader.artifactId}-${reader.version}`;
                    }
                }
            });
        }
    }
    parseBuild(build) {
        if (build
            && build[0]
            && build[0].finalName) {
            return build[0].finalName;
        }
        return '';
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
exports.MavenPomReader = MavenPomReader;
//# sourceMappingURL=MavenPomReader.js.map