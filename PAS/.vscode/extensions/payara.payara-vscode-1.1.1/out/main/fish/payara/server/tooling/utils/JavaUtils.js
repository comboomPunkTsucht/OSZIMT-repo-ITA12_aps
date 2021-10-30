'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaUtils = void 0;
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
const os = require("os");
class JavaUtils {
    /**
     * Append quoted Java VM system property
     * <code>-D"&lt;name&gt;=&lt;value&gt;"</code> into {@link StringBuilder}
     * instance.
     *
     * @param name  Java VM system property name.
     * @param value Java VM system property value.
     */
    static systemProperty(name, value) {
        return JavaUtils.VM_SYS_PROP_OPT
            + JavaUtils.VM_SYS_PROP_QUOTE
            + name
            + JavaUtils.VM_SYS_PROP_ASSIGN
            + value
            + JavaUtils.VM_SYS_PROP_QUOTE;
    }
    /**
     * Build Java VM executable full path from Java Home directory.
     * <p/>
     * @param javaHome Full path to Java Home directory.
     * @return Java VM executable full path.
     */
    static javaVmExecutableFullPath(javaHome) {
        return this.javaExecutableFullPath(javaHome, JavaUtils.JAVA_VM_EXE);
    }
    /**
     * Build Java VM executable full path from Java Home directory.
     * <p/>
     * @param javaHome Full path to Java Home directory.
     * @return Java VM executable full path.
     */
    static javaProcessExecutableFullPath(javaHome) {
        return this.javaExecutableFullPath(javaHome, JavaUtils.JAVA_PROCESS_EXE);
    }
    static javaExecutableFullPath(javaHome, type) {
        let javaHomeLen = javaHome.length;
        let javaHomeEndsWithPathSep = javaHome.charAt(javaHomeLen - 1) === path.sep;
        // Build string.
        let javaExecStr = javaHome;
        if (!javaHomeEndsWithPathSep) {
            javaExecStr += path.sep;
        }
        javaExecStr += JavaUtils.JAVA_BIN_DIR + path.sep + type;
        if (JavaUtils.IS_WIN) {
            javaExecStr += ".exe";
        }
        return javaExecStr;
    }
    /**
     * Parses parameters from a given string in shell-like manner and append
     * them to executable file.
     * <p/>
     * Users of the Bourne shell (e.g. on Unix) will already be familiar with
     * the behavior. For example you should be able to:
     * <ul>
     * <li/>Include command names with embedded spaces, such as
     * <code>c:\Program Files\jdk\bin\javac</code>.
     * <li/>Include extra command arguments, such as <code>-Dname=value</code>.
     * <li/>Do anything else which might require unusual characters
     * or processing. For example:
     * <p/><code><pre>
     * "c:\program files\jdk\bin\java" -Dmessage="Hello /\\/\\ there!" -Xmx128m
     * </pre></code>
     * <p/>This example would create the following executable name and
     * arguments:
     * <ol>
     * <li/> <code>c:\program files\jdk\bin\java</code>
     * <li/> <code>-Dmessage=Hello /\/\ there!</code>
     * <li/> <code>-Xmx128m</code>
     * </ol>
     * Note that the command string does not escape its backslashes--under
     * the assumption that Windows users will not think to do this, meaningless
     * escapes are just left as backslashes plus following character.
     * </ul>
     * <em>Caveat</em>: even after parsing, Windows programs (such as the
     * Java launcher) may not fully honor certain characters, such as quotes,
     * in command names or arguments. This is because programs under Windows
     * frequently perform their own parsing and unescaping (since the shell
     * cannot be relied on to do this). On Unix, this problem should not occur.
     * <p/>
     * @param {string} args A String to parse
     * @return {Array} An array of executable file and parameters to be passed to it.
     */
    static parseParameters(args) {
        let NULL = 0;
        let INPARAM = 1;
        let INPARAMPENDING = 2;
        let STICK = 4;
        let STICKPENDING = 8;
        let params = ([]);
        let c;
        let state = NULL;
        let buff = '';
        let slength = args.length;
        for (let i = 0; i < slength; i++) {
            c = args.charAt(i);
            if (c.trim() === '') { // check whitespace
                if (state === NULL) {
                    if (buff.length > 0) {
                        params.push(buff);
                        buff = '';
                    }
                }
                else if (state === STICK) {
                    params.push(buff);
                    buff = '';
                    state = NULL;
                }
                else if (state === STICKPENDING) {
                    buff += '\\';
                    params.push(buff);
                    buff = '';
                    state = NULL;
                }
                else if (state === INPARAMPENDING) {
                    state = INPARAM;
                    buff += '\\' + c;
                }
                else { // INPARAM
                    buff += c;
                }
                continue;
            }
            if (c === '\\') {
                if (state === NULL) {
                    ++i;
                    if (i < slength) {
                        let cc = args.charAt(i);
                        if (cc === '\"' || cc === '\\') {
                            buff += cc;
                        }
                        else if (cc.trim() === '') { // check whitespace
                            buff += c;
                            --i;
                        }
                        else {
                            buff += c;
                            buff += cc;
                        }
                    }
                    else {
                        buff += '\\';
                        break;
                    }
                    continue;
                }
                else if (state === INPARAM) {
                    state = INPARAMPENDING;
                }
                else if (state === INPARAMPENDING) {
                    buff += '\\';
                    state = INPARAM;
                }
                else if (state === STICK) {
                    state = STICKPENDING;
                }
                else if (state === STICKPENDING) {
                    buff += '\\';
                    state = STICK;
                }
                continue;
            }
            if (c === '\"') {
                if (state === NULL) {
                    state = INPARAM;
                }
                else if (state === INPARAM) {
                    state = STICK;
                }
                else if (state === STICK) {
                    state = INPARAM;
                }
                else if (state === STICKPENDING) {
                    buff += '\"';
                    state = STICK;
                }
                else { // INPARAMPENDING
                    buff += '\"';
                    state = INPARAM;
                }
                continue;
            }
            if (state === INPARAMPENDING) {
                buff += '\\';
                state = INPARAM;
            }
            else if (state === STICKPENDING) {
                buff += '\\';
                state = STICK;
            }
            buff += c;
        }
        // collect
        if (state === INPARAM) {
            params.push(buff);
        }
        else if ((state & (INPARAMPENDING | STICKPENDING)) !== 0) {
            buff += '\\';
            params.push(buff);
        }
        else {
            if (buff.length !== 0) {
                params.push(buff);
            }
        }
        let retArgs = new Array(params.length);
        let i = 0;
        for (let index121 = 0; index121 < params.length; index121++) {
            let param = params[index121];
            {
                retArgs[i++] = param;
            }
        }
        return retArgs;
    }
}
exports.JavaUtils = JavaUtils;
/** Java executables directory underJava home. */
JavaUtils.JAVA_BIN_DIR = "bin";
/** Java VM executable file name (without path). */
JavaUtils.JAVA_VM_EXE = "java";
/** Java Process file name (without path). */
JavaUtils.JAVA_PROCESS_EXE = "jps";
/** Java SE JDK class path option. */
JavaUtils.VM_CLASSPATH_OPTION = "-cp";
/** Java VM system property option. */
JavaUtils.VM_SYS_PROP_OPT = "-D";
/** Java VM system property quoting character. */
JavaUtils.VM_SYS_PROP_QUOTE = '"';
/** Java VM system property assignment. */
JavaUtils.VM_SYS_PROP_ASSIGN = "=";
JavaUtils.PATH_SEPARATOR = "path.separator"; //os.osName();
JavaUtils.IS_WIN = os.platform() === 'win32';
//# sourceMappingURL=JavaUtils.js.map