"use strict";
// Copyright 2021 The Bazel Authors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
const vscode_1 = require("vscode");
const vscode_uri_1 = require("vscode-uri");
const bazel_1 = require("../bazel");
const configuration_1 = require("../extension/configuration");
// LABEL_REGEX matches label strings, e.g. @r//x/y/z:abc
const LABEL_REGEX = /"((?:@\w+)?\/\/|(?:.+\/)?[^:]*(?::[^:]+)?)"/;
class BazelGotoDefinitionProvider {
    provideDefinition(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const workspaceInfo = bazel_1.BazelWorkspaceInfo.fromDocument(document);
            if (workspaceInfo === undefined) {
                // Not in a Bazel Workspace.
                return null;
            }
            const range = document.getWordRangeAtPosition(position, LABEL_REGEX);
            const targetText = document.getText(range);
            const match = LABEL_REGEX.exec(targetText);
            const targetName = match[1];
            // don't try to process visibility targets.
            if (targetName.startsWith("//visibility")) {
                return null;
            }
            const queryResult = yield new bazel_1.BazelQuery(configuration_1.getDefaultBazelExecutablePath(), vscode_uri_1.Utils.dirname(document.uri).fsPath, `kind(rule, "${targetName}")`, []).queryTargets();
            if (!queryResult.target.length) {
                return null;
            }
            const location = new bazel_1.QueryLocation(queryResult.target[0].rule.location);
            return new vscode_1.Location(vscode_1.Uri.file(location.path), location.range);
        });
    }
}
exports.BazelGotoDefinitionProvider = BazelGotoDefinitionProvider;
//# sourceMappingURL=bazel_goto_definition_provider.js.map