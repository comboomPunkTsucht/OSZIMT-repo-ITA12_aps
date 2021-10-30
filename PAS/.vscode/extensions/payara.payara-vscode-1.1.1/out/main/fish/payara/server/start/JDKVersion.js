'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDKVersion = void 0;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const vscode_1 = require("vscode");
const _ = require("lodash");
const fse = require("fs-extra");
const cp = require("child_process");
const JavaUtils_1 = require("../tooling/utils/JavaUtils");
class JDKVersion {
    constructor(major, minor, subminor, update, vendor) {
        /**
         * Major version number.
         */
        this.major = 0;
        this.major = major;
        this.minor = minor;
        this.subminor = subminor;
        this.update = update;
        this.vendor = vendor;
    }
    /**
     * Get major version number.
     *
     * @return {number} Major version number.
     */
    getMajor() {
        return this.major;
    }
    /**
     * Get minor version number.
     *
     * @return {number | undefined} Minor version number.
     */
    getMinor() {
        return this.minor;
    }
    /**
     * Get sub-minor version number.
     *
     * @return {number | undefined} Sub-Minor version number.
     */
    getSubMinor() {
        return this.subminor;
    }
    /**
     * Get update version number.
     *
     * @return {number | undefined} Update version number.
     */
    getUpdate() {
        return this.update;
    }
    /**
     * Get JDK Vendor.
     *
     * @return {string | undefined} JDK vendor.
     */
    getVendor() {
        return this.vendor;
    }
    gt(version) {
        if (this.major > version.getMajor()) {
            return true;
        }
        else if (this.major === version.getMajor()) {
            if (this.gtNumber(this.minor, version.getMinor())) {
                return true;
            }
            else if (this.eq(this.minor, version.getMinor())) {
                if (this.gtNumber(this.subminor, version.getSubMinor())) {
                    return true;
                }
                else if (this.eq(this.subminor, version.getSubMinor())) {
                    if (this.gtNumber(this.update, version.getUpdate())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    lt(version) {
        if (this.major < version.getMajor()) {
            return true;
        }
        else if (this.major === version.getMajor()) {
            if (this.ltNumber(this.minor, version.getMinor())) {
                return true;
            }
            else if (this.eq(this.minor, version.getMinor())) {
                if (this.ltNumber(this.subminor, version.getSubMinor())) {
                    return true;
                }
                else if (this.eq(this.subminor, version.getSubMinor())) {
                    if (this.ltNumber(this.update, version.getUpdate())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    ge(version) {
        return this.gt(version) || this.equals(version);
    }
    le(version) {
        return this.lt(version) || this.equals(version);
    }
    gtNumber(v1, v2) {
        if (v1 === undefined) {
            v1 = JDKVersion.DEFAULT_VALUE;
        }
        if (v2 === undefined) {
            v2 = JDKVersion.DEFAULT_VALUE;
        }
        return v1 > v2;
    }
    ltNumber(v1, v2) {
        if (v1 === undefined) {
            v1 = JDKVersion.DEFAULT_VALUE;
        }
        if (v2 === undefined) {
            v2 = JDKVersion.DEFAULT_VALUE;
        }
        return v1 < v2;
    }
    eq(v1, v2) {
        if (v1 === undefined) {
            v1 = JDKVersion.DEFAULT_VALUE;
        }
        if (v2 === undefined) {
            v2 = JDKVersion.DEFAULT_VALUE;
        }
        return v1 === v2;
    }
    equals(other) {
        if (other === null) {
            return false;
        }
        if (this !== other) {
            return false;
        }
        if (this.major !== other.getMajor()) {
            return false;
        }
        if (!this.eq(this.minor, other.getMinor())) {
            return false;
        }
        if (!this.eq(this.subminor, other.getSubMinor())) {
            return false;
        }
        return this.eq(this.update, other.getUpdate());
    }
    toString() {
        let value = this.major.toString();
        if (this.minor !== undefined) {
            value.concat(this.minor.toString());
        }
        if (this.subminor !== undefined) {
            value.concat(this.subminor.toString());
        }
        if (this.update !== undefined) {
            value.concat(this.update.toString());
        }
        return value;
    }
    static toValue(version, vendor) {
        if (version !== null && version.length > 0) {
            let versions = this.parseVersions(version);
            let major = versions[JDKVersion.MAJOR_INDEX];
            let minor = versions[JDKVersion.MINOR_INDEX];
            let subminor = versions[JDKVersion.SUBMINOR_INDEX];
            let update = versions[JDKVersion.UPDATE_INDEX];
            return new JDKVersion(major, minor, subminor, update, vendor);
        }
        else {
            return undefined;
        }
    }
    static getDefaultJDKHome() {
        const config = vscode_1.workspace.getConfiguration();
        let javaHome;
        let javaHomeConfig = config.inspect('java.home');
        if (javaHomeConfig && javaHomeConfig.workspaceValue && !_.isEmpty(javaHomeConfig.workspaceValue)) {
            javaHome = javaHomeConfig.workspaceValue;
        }
        if (!javaHome && javaHomeConfig && javaHomeConfig.globalValue && !_.isEmpty(javaHomeConfig.globalValue)) {
            javaHome = javaHomeConfig.globalValue;
        }
        if (!javaHome) {
            javaHome = process.env.JDK_HOME;
        }
        if (!javaHome) {
            javaHome = process.env.JAVA_HOME;
        }
        return javaHome;
    }
    static getJDKVersion(javaHome) {
        let javaVersion = '';
        let implementor;
        let javaVmExe = JavaUtils_1.JavaUtils.javaVmExecutableFullPath(javaHome);
        // Java VM executable should exist.
        if (!fse.pathExistsSync(javaVmExe)) {
            throw new Error("Java VM " + javaVmExe + " executable not found");
        }
        let result = cp.spawnSync(javaVmExe, ['-XshowSettings:properties', '-version']).output.toString();
        let lines = result.split('\n');
        for (let line of lines) {
            if (line.indexOf('java.version =') !== -1) {
                let KeyValue = line.split('=');
                if (KeyValue.length === 2) {
                    javaVersion = KeyValue[1].trim();
                }
            }
            else if (line.indexOf('java.vendor =') !== -1) {
                let KeyValue = line.split('=');
                if (KeyValue.length === 2) {
                    implementor = KeyValue[1].trim();
                }
            }
        }
        if (javaVersion.length > 0) {
            return JDKVersion.toValue(javaVersion, implementor);
        }
    }
    static isCorrectJDK(jdkVersion, vendor, minVersion, maxVersion) {
        let correctJDK = true;
        if (vendor !== undefined) {
            let jdkVendor = jdkVersion.getVendor();
            if (jdkVendor) {
                correctJDK = jdkVendor.indexOf(vendor) !== -1;
            }
            else {
                correctJDK = false;
            }
        }
        if (correctJDK && minVersion) {
            correctJDK = jdkVersion.ge(minVersion);
        }
        if (correctJDK && maxVersion) {
            correctJDK = jdkVersion.le(maxVersion);
        }
        return correctJDK;
    }
    /**
     * Parses the java version text
     *
     * @param {string} javaVersion the Java Version e.g 1.8.0u222,
     * 1.8.0_232-ea-8u232-b09-0ubuntu1-b09, 11.0.5
     * @return
     * @return {Array}
     */
    static parseVersions(javaVersion) {
        let versions = [1, 0, 0, 0];
        if (javaVersion === null || javaVersion.length <= 0) {
            return versions;
        }
        let javaVersionSplit = javaVersion.split("-");
        let split = javaVersionSplit[0].split(".");
        if (split.length > 0) {
            versions[JDKVersion.MAJOR_INDEX] = parseInt(split[0]);
            if (split.length > 1) {
                versions[JDKVersion.MINOR_INDEX] = parseInt(split[1]);
            }
            if (split.length > 2) {
                split = split[2].split(/[_u]+/);
                versions[JDKVersion.SUBMINOR_INDEX] = parseInt(split[0]);
                if (split.length > 1) {
                    versions[JDKVersion.UPDATE_INDEX] = parseInt(split[1]);
                }
            }
        }
        return versions;
    }
}
exports.JDKVersion = JDKVersion;
JDKVersion.MAJOR_INDEX = 0;
JDKVersion.MINOR_INDEX = 1;
JDKVersion.SUBMINOR_INDEX = 2;
JDKVersion.UPDATE_INDEX = 3;
JDKVersion.VERSION_MATCHER = "(\\d+(\\.\\d+)*)([_u\\-]+[\\S]+)*";
JDKVersion.DEFAULT_VALUE = 0;
//# sourceMappingURL=JDKVersion.js.map