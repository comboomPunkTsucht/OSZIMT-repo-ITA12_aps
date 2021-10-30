'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployOption = void 0;
/*
 * Copyright (c) 2021 Payara Foundation and/or its affiliates and others.
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
var DeployOption;
(function (DeployOption) {
    DeployOption.DEFAULT = 'DEFAULT';
    DeployOption.AUTO_DEPLOY = 'AUTO_DEPLOY';
    DeployOption.HOT_RELOAD = 'HOT_RELOAD';
    DeployOption.DEFAULT_DESC = 'Only manual deployment';
    DeployOption.AUTO_DEPLOY_DESC = 'Auto deploy complete application';
    DeployOption.HOT_RELOAD_DESC = 'Incremental deploy modified source files';
    DeployOption.ALL_OPTIONS = new Map([
        [DeployOption.DEFAULT, DeployOption.DEFAULT_DESC],
        [DeployOption.AUTO_DEPLOY, DeployOption.AUTO_DEPLOY_DESC],
        [DeployOption.HOT_RELOAD, DeployOption.HOT_RELOAD_DESC]
    ]);
})(DeployOption = exports.DeployOption || (exports.DeployOption = {}));
//# sourceMappingURL=DeployOption.js.map