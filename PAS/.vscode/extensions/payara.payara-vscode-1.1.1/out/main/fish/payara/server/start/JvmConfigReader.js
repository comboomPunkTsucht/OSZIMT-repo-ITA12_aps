'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.JvmConfigReader = void 0;
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
const xml2js = require("xml2js");
const JvmOption_1 = require("./JvmOption");
class JvmConfigReader {
    constructor(domainXmlPath, serverName) {
        this.domainXmlPath = domainXmlPath;
        /**
         * Holds <jvm-options> element values
         * e.g
         * <jvm-options>-client</jvm-options>
         * <jvm-options>[1.8.0|1.8.0u120]-Xbootclasspath/p:${com.sun.aas.installRoot}/lib/grizzly-npn-bootstrap-1.6.jar</jvm-options>
         */
        this.jvmOptions = new Array();
        /**
         * Holds all attributes of jvm-config element in the key-value pairs.
         * e.g <java-config debug-options="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=9009">
         */
        this.propMap = new Map();
        this.monitoringEnabled = false;
        this.serverConfigName = '';
        this.readConfig = false;
        this.serverName = serverName;
        this.parseDomainXML();
    }
    parseDomainXML() {
        let reader = this;
        let file = this.domainXmlPath;
        let data = fse.readFileSync(file);
        new xml2js.Parser().parseString(data, function (err, result) {
            if (err) {
                throw new Error(`Unable to parse file ${file} : ${err.message}`);
            }
            if (result && result.domain
                && result.domain.servers
                && result.domain.configs) {
                let servers = result.domain.servers[0].server;
                let configs = result.domain.configs[0].config;
                for (var server of servers) {
                    if (server.$["name"] === reader.serverName) {
                        // <server config-ref="server-config" name="server">
                        reader.serverConfigName = server.$["config-ref"];
                    }
                }
                for (var config of configs) {
                    // <config name="server-config">
                    if (config.$["name"] === reader.serverConfigName) {
                        // <java-config debug-options="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=9009">
                        //     <jvm-options>-client</jvm-options>
                        //     <jvm-options>[1.8.0|1.8.0u120]-Xbootclasspath/p:${com.sun.aas.installRoot}/lib/grizzly-npn-bootstrap-1.6.jar</jvm-options>
                        // </java-config>
                        let javaConfig = config["java-config"][0];
                        for (var jvmOption of javaConfig["jvm-options"]) {
                            reader.jvmOptions.push(new JvmOption_1.JvmOption(jvmOption));
                        }
                        for (let key of Object.keys(javaConfig.$)) {
                            reader.propMap.set(key, javaConfig.$[key]);
                        }
                    }
                }
            }
        });
    }
    getJvmOptions() {
        return this.jvmOptions;
    }
    getPropMap() {
        return this.propMap;
    }
    isMonitoringEnabled() {
        return this.monitoringEnabled;
    }
}
exports.JvmConfigReader = JvmConfigReader;
//# sourceMappingURL=JvmConfigReader.js.map