'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOutputWindowProvider = void 0;
const vscode = require("vscode");
const path = require("path");
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
class ProjectOutputWindowProvider {
    constructor() {
        this.outputWindows = new Map();
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    }
    updateStatusBar(text) {
        this.statusBar.text = text;
        this.statusBar.show();
    }
    hideStatusBar() {
        this.statusBar.hide();
    }
    static getInstance() {
        if (!ProjectOutputWindowProvider.instance) {
            ProjectOutputWindowProvider.instance = new ProjectOutputWindowProvider();
        }
        return ProjectOutputWindowProvider.instance;
    }
    get(key) {
        let windowName = typeof key === 'string' ? key : path.basename(key.uri.fsPath);
        let instance = this.outputWindows.get(windowName);
        if (!instance) {
            instance = vscode.window.createOutputChannel(windowName);
            this.outputWindows.set(windowName, instance);
        }
        return instance;
    }
}
exports.ProjectOutputWindowProvider = ProjectOutputWindowProvider;
//# sourceMappingURL=ProjectOutputWindowProvider.js.map