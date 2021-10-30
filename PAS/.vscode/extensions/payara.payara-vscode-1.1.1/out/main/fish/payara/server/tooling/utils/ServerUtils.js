'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUtils = void 0;
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
const path = require("path");
const fs = require("fs");
class ServerUtils {
    /**
     * Builds command line argument containing argument identifier, space
     * and argument value, e.g. <code>--name value</code>.
     *
     * @param name      Command line argument name including dashes at
     *                  the beginning.
     * @param value     Value to be appended prefixed with single space.
     * @return Command line argument concatenated together.
     */
    static cmdLineArgument(name, value) {
        return name + ' ' + value;
    }
    static isValidServerPath(serverPath) {
        return fs.existsSync(path.join(serverPath, 'glassfish', 'bin', 'asadmin'))
            && fs.existsSync(path.join(serverPath, 'bin', 'asadmin'));
    }
}
exports.ServerUtils = ServerUtils;
/**
 * Payara server Java VM root property name.
 */
ServerUtils.PF_JAVA_ROOT_PROPERTY = "com.sun.aas.javaRoot";
/**
 * Payara server home property name.
 *
 *  It's value says it is server installation root but in reality it is just
 *  <code>payara</code> subdirectory under server installation root which
 *  we usually call server home.
 */
ServerUtils.PF_HOME_PROPERTY = "com.sun.aas.installRoot";
/**
 * Payara server domain root property name.
 *
 *  It's value says it is server instance root which is the same.
 */
ServerUtils.PF_DOMAIN_ROOT_PROPERTY = "com.sun.aas.instanceRoot";
/**
 * Payara server Derby root property name.
 */
ServerUtils.PF_DERBY_ROOT_PROPERTY = "com.sun.aas.derbyRoot";
/**
 * Payara server domain name command line argument.
 */
ServerUtils.PF_DOMAIN_ARG = "--domain";
/**
 * Payara server domain directory command line argument.
 */
ServerUtils.PF_DOMAIN_DIR_ARG = "--domaindir";
/** Payara main class to be started when using classpath. */
ServerUtils.PF_MAIN_CLASS = "com.sun.enterprise.glassfish.bootstrap.ASMain";
ServerUtils.DEFAULT_USERNAME = 'admin';
ServerUtils.DEFAULT_PASSWORD = '';
ServerUtils.MASTER_PASSWORD = 'changeit';
ServerUtils.DEFAULT_ADMIN_PORT = 4848;
ServerUtils.DEFAULT_HTTP_PORT = 8080;
ServerUtils.DEFAULT_HOST = 'localhost';
/** Default name of the DAS server. */
ServerUtils.DAS_NAME = "server";
/** Default retry count to check alive status of server. */
ServerUtils.DEFAULT_RETRY_COUNT = 30;
/** Default sleep time in millisecond before retry to check alive status of server. */
ServerUtils.DEFAULT_WAIT = 3000;
//# sourceMappingURL=ServerUtils.js.map