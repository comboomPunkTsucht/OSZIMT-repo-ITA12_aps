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
exports.GradleMicroPluginReader = void 0;
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
const PayaraMicroGradlePlugin_1 = require("../micro/PayaraMicroGradlePlugin");
class GradleMicroPluginReader {
    constructor(workspaceFolder) {
        this.workspaceFolder = workspaceFolder;
        this.pluginFound = false;
        this.parseBuild();
    }
    parseBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            let reader = this;
            let buildPath = path.join(this.workspaceFolder.uri.fsPath, 'build.gradle');
            if (fse.existsSync(buildPath)) {
                reader.pluginFound = fse.readFileSync(buildPath).includes(PayaraMicroGradlePlugin_1.PayaraMicroGradlePlugin.ID);
                let g2js = require('gradle-to-js/lib/parser');
                let build = yield g2js.parseFile(buildPath);
                if (build.payaraMicro) {
                    let config = build.payaraMicro;
                    reader.deployWar = config.deployWar ? JSON.parse(config.deployWar) : undefined;
                    reader.exploded = config.exploded ? JSON.parse(config.exploded) : undefined;
                    reader.useUberJar = config.useUberJar ? JSON.parse(config.useUberJar) : undefined;
                }
            }
        });
    }
    isPluginFound() {
        return this.pluginFound;
    }
    isDeployWarEnabled() {
        return this.deployWar;
    }
    isUberJarEnabled() {
        return this.useUberJar;
    }
    isExplodedEnabled() {
        return this.exploded;
    }
}
exports.GradleMicroPluginReader = GradleMicroPluginReader;
//# sourceMappingURL=GradleMicroPluginReader.js.map