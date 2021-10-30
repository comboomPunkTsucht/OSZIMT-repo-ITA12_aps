'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayaraMicroGradlePlugin = void 0;
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
var PayaraMicroGradlePlugin;
(function (PayaraMicroGradlePlugin) {
    PayaraMicroGradlePlugin.ID = 'fish.payara.micro-gradle-plugin';
    PayaraMicroGradlePlugin.START_GOAL = 'microStart';
    PayaraMicroGradlePlugin.STOP_GOAL = 'microStop';
    PayaraMicroGradlePlugin.BUNDLE_GOAL = 'microBundle';
    PayaraMicroGradlePlugin.RELOAD_GOAL = 'microReload';
    PayaraMicroGradlePlugin.WAR_EXPLODE_GOAL = 'warExplode';
})(PayaraMicroGradlePlugin = exports.PayaraMicroGradlePlugin || (exports.PayaraMicroGradlePlugin = {}));
//# sourceMappingURL=PayaraMicroGradlePlugin.js.map