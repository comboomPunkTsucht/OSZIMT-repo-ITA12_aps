"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const jmespath = require("jmespath");
const vscode_1 = require("vscode");
const process = require("process");
const azService_1 = require("./azService");
const parser_1 = require("./parser");
const utils_1 = require("./utils");
const spinner = require("elegant-spinner");
function activate(context) {
    const azService = new azService_1.AzService(azNotFound);
    context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider('azcli', new AzCompletionItemProvider(azService), ' '));
    context.subscriptions.push(vscode_1.languages.registerHoverProvider('azcli', new AzHoverProvider(azService)));
    const status = new StatusBarInfo(azService);
    context.subscriptions.push(status);
    context.subscriptions.push(new RunLineInTerminal());
    context.subscriptions.push(new RunLineInEditor(status));
    context.subscriptions.push(vscode_1.commands.registerCommand('ms-azurecli.installAzureCLI', installAzureCLI));
}
exports.activate = activate;
const completionKinds = {
    group: vscode_1.CompletionItemKind.Module,
    command: vscode_1.CompletionItemKind.Function,
    argument_name: vscode_1.CompletionItemKind.Variable,
    argument_value: vscode_1.CompletionItemKind.EnumMember,
    snippet: vscode_1.CompletionItemKind.Snippet
};
class AzCompletionItemProvider {
    constructor(azService) {
        this.azService = azService;
    }
    provideCompletionItems(document, position, token) {
        const line = document.lineAt(position).text;
        const parsed = parser_1.parse(line);
        const start = parsed.subcommand[0];
        if (start && start.offset + start.length < position.character && start.text !== 'az') {
            return;
        }
        const node = parser_1.findNode(parsed, position.character - 1);
        if (node && node.kind === 'comment') {
            return;
        }
        // TODO: Use the above instead of parsing again.
        const upToCursor = line.substr(0, position.character);
        const rawSubcommand = (/^\s*(([^-\s][^\s]*\s+)*)/.exec(upToCursor) || [])[1];
        if (typeof rawSubcommand !== 'string') {
            return Promise.resolve([]);
        }
        const subcommand = rawSubcommand.trim()
            .split(/\s+/);
        const args = this.getArguments(line);
        const argument = (/\s(--?[^\s]+)\s+[^-\s]*$/.exec(upToCursor) || [])[1];
        const prefix = (/(^|\s)([^\s]*)$/.exec(upToCursor) || [])[2];
        const lead = /^-*/.exec(prefix)[0];
        return this.azService.getCompletions(subcommand[0] === 'az' ? { subcommand: subcommand.slice(1).join(' '), argument, arguments: args } : {}, token.onCancellationRequested)
            .then(completions => completions.map(({ name, kind, detail, documentation, snippet, sortText }) => {
            const item = new vscode_1.CompletionItem(name, completionKinds[kind]);
            if (snippet) {
                item.insertText = new vscode_1.SnippetString(snippet);
            }
            else if (lead) {
                item.insertText = name.substr(lead.length);
            }
            if (detail) {
                item.detail = detail;
            }
            if (documentation) {
                item.documentation = documentation;
            }
            if (sortText) {
                item.sortText = sortText;
            }
            return item;
        }));
    }
    getArguments(line) {
        const args = {};
        let name;
        for (const match of allMatches(/-[^\s"']*|"[^"]*"|'[^']*'|[^\s"']+/g, line, 0)) {
            if (match.startsWith('-')) {
                name = match;
                if (!(name in args)) {
                    args[name] = null;
                }
            }
            else {
                if (name) {
                    args[name] = match;
                }
                name = undefined;
            }
        }
        return args;
    }
}
class AzHoverProvider {
    constructor(azService) {
        this.azService = azService;
    }
    provideHover(document, position, token) {
        const line = document.lineAt(position.line).text;
        const command = parser_1.parse(line);
        const list = command.subcommand;
        if (list.length && list[0].text === 'az') {
            const node = parser_1.findNode(command, position.character);
            if (node) {
                if (node.kind === 'subcommand') {
                    const i = list.indexOf(node);
                    if (i > 0) {
                        const subcommand = list.slice(1, i + 1)
                            .map(node => node.text).join(' ');
                        return this.azService.getHover({ subcommand }, token.onCancellationRequested)
                            .then(text => text && new vscode_1.Hover(text.paragraphs, new vscode_1.Range(position.line, node.offset, position.line, node.offset + node.length)));
                    }
                }
                else if (node.kind === 'argument_name') {
                    const subcommand = command.subcommand.slice(1)
                        .map(node => node.text).join(' ');
                    return this.azService.getHover({ subcommand, argument: node.text }, token.onCancellationRequested)
                        .then(text => text && new vscode_1.Hover(text.paragraphs, new vscode_1.Range(position.line, node.offset, position.line, node.offset + node.length)));
                }
            }
        }
    }
}
class RunLineInTerminal {
    constructor() {
        this.disposables = [];
        this.disposables.push(vscode_1.commands.registerTextEditorCommand('ms-azurecli.runLineInTerminal', editor => this.run(editor)));
    }
    run(editor) {
        return vscode_1.commands.executeCommand('workbench.action.terminal.runSelectedText');
    }
    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
}
class RunLineInEditor {
    constructor(status) {
        this.status = status;
        this.queryEnabled = false;
        this.disposables = [];
        this.statusBarSpinner = spinner();
        this.statusBarItemText = '';
        // using backtick (`) as continuation character on Windows, backslash (\) on other systems
        this.continuationCharacter = process.platform === "win32" ? "`" : "\\";
        this.runningCommandCount = 0;
        this.disposables.push(vscode_1.commands.registerTextEditorCommand('ms-azurecli.toggleLiveQuery', editor => this.toggleQuery(editor)));
        this.disposables.push(vscode_1.commands.registerTextEditorCommand('ms-azurecli.runLineInEditor', editor => this.run(editor)));
        this.disposables.push(vscode_1.workspace.onDidCloseTextDocument(document => this.close(document)));
        this.disposables.push(vscode_1.workspace.onDidChangeTextDocument(event => this.change(event)));
        this.commandRunningStatusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.disposables.push(this.commandRunningStatusBarItem);
    }
    run(source) {
        this.refreshContinuationCharacter();
        const command = this.getSelectedCommand(source);
        if (command.length > 0) {
            this.runningCommandCount += 1;
            const t0 = Date.now();
            if (this.runningCommandCount === 1) {
                this.statusBarItemText = `Azure CLI: Waiting for response`;
                this.statusBarUpdateInterval = setInterval(() => {
                    if (this.runningCommandCount === 1) {
                        this.commandRunningStatusBarItem.text = `${this.statusBarItemText} ${this.statusBarSpinner()}`;
                    }
                    else {
                        this.commandRunningStatusBarItem.text = `${this.statusBarItemText} [${this.runningCommandCount}] ${this.statusBarSpinner()}`;
                    }
                }, 50);
            }
            this.commandRunningStatusBarItem.show();
            clearTimeout(this.hideStatusBarItemTimeout);
            this.parsedResult = undefined;
            this.query = undefined; // TODO
            return this.findResultDocument()
                .then(document => vscode_1.window.showTextDocument(document, vscode_1.ViewColumn.Two, true))
                .then(target => replaceContent(target, JSON.stringify({ 'Running command': command }) + '\n')
                .then(() => utils_1.exec(command))
                .then(({ stdout }) => stdout, ({ stdout, stderr }) => JSON.stringify({ stderr, stdout }, null, '    '))
                .then(content => replaceContent(target, content)
                .then(() => this.parsedResult = JSON.parse(content))
                .then(undefined, err => { }))
                .then(() => this.commandFinished(t0)))
                .then(undefined, console.error);
        }
    }
    refreshContinuationCharacter() {
        // the continuation character setting can be changed after the extension is loaded
        const settingsContinuationCharacter = vscode_1.workspace.getConfiguration('azureCLI', null).get('lineContinuationCharacter', "");
        if (settingsContinuationCharacter.length > 0) {
            this.continuationCharacter = settingsContinuationCharacter;
        }
        else {
            this.continuationCharacter = process.platform === "win32" ? "`" : "\\";
        }
    }
    getSelectedCommand(source) {
        const commandPrefix = "az";
        if (source.selection.isEmpty) {
            var lineNumber = source.selection.active.line;
            if (source.document.lineAt(lineNumber).text.length === 0) {
                vscode_1.window.showInformationMessage("Please put the cursor on a line that contains a command (or part of a command).");
                return "";
            }
            // look upwards find the start of the command (if necessary)
            while (!source.document.lineAt(lineNumber).text.trim().toLowerCase().startsWith(commandPrefix)) {
                lineNumber--;
            }
            // this will be the first (maybe only) line of the command
            var command = this.stripComments(source.document.lineAt(lineNumber).text);
            while (command.trim().endsWith(this.continuationCharacter)) {
                // concatenate all lines into a single command
                lineNumber++;
                command = command.trim().slice(0, -1) + this.stripComments(source.document.lineAt(lineNumber).text);
            }
            return command;
        }
        else {
            // execute only the selected text
            const selectionStart = source.selection.start;
            const selectionEnd = source.selection.end;
            if (selectionStart.line === selectionEnd.line) {
                // single line command
                return this.stripComments(source.document.getText(new vscode_1.Range(selectionStart, selectionEnd)));
            }
            else {
                // multiline command
                command = this.stripComments(source.document.lineAt(selectionStart.line).text.substring(selectionStart.character));
                for (let index = selectionStart.line + 1; index <= selectionEnd.line; index++) {
                    if (command.trim().endsWith(this.continuationCharacter)) {
                        command = command.trim().slice(0, -1); // remove continuation character from command
                    }
                    var line = this.stripComments(source.document.lineAt(index).text);
                    if (line.trim().toLowerCase().startsWith(commandPrefix)) {
                        vscode_1.window.showErrorMessage("Multiple command selection not supported");
                        return "";
                    }
                    // append this line to the command string
                    if (index === selectionEnd.line) {
                        command = command + line.substring(0, selectionEnd.character); // only append up to the end of the selection
                    }
                    else {
                        command = command + line;
                    }
                }
                return command;
            }
        }
    }
    stripComments(text) {
        if (text.trim().startsWith("#")) {
            return this.continuationCharacter; // don't let a whole line comment terminate a sequence of command fragments
        }
        var i = text.indexOf("#");
        if (i !== -1) {
            // account for hash characters that are embedded in strings in the JMESPath query
            while (this.isEmbeddedInString(text, i)) {
                i = text.indexOf("#", i + 1); // find next #
            }
            return text.substring(0, i);
        }
        // no comment found
        return text;
    }
    // true if the specified position is in a string literal (surrounded by single quotes)
    isEmbeddedInString(text, position) {
        var stringStart = text.indexOf("'"); // start of string literal
        if (stringStart !== -1) {
            while (stringStart !== -1) {
                var stringEnd = text.indexOf("'", stringStart + 1); // end of string literal
                if ((stringEnd !== -1) && (stringStart < position) && (stringEnd > position)) {
                    return true; // the given position is embedded in a string literal
                }
                stringStart = text.indexOf("'", stringEnd + 1);
            }
        }
        return false;
    }
    commandFinished(startTime) {
        this.runningCommandCount -= 1;
        this.statusBarItemText = 'Azure CLI: Executed in ' + (Date.now() - startTime) + ' milliseconds';
        this.commandRunningStatusBarItem.text = this.statusBarItemText;
        if (this.runningCommandCount === 0) {
            clearInterval(this.statusBarUpdateInterval);
            // hide status bar item after 10 seconds to keep status bar uncluttered
            this.hideStatusBarItemTimeout = setTimeout(() => this.commandRunningStatusBarItem.hide(), 10000);
        }
    }
    toggleQuery(source) {
        this.queryEnabled = !this.queryEnabled;
        this.status.liveQuery = this.queryEnabled;
        this.status.update();
        this.updateResult();
    }
    findResultDocument() {
        const showResultInNewEditor = vscode_1.workspace.getConfiguration('azureCLI', null).get('showResultInNewEditor', false);
        if (this.resultDocument && !showResultInNewEditor) {
            return Promise.resolve(this.resultDocument);
        }
        return vscode_1.workspace.openTextDocument({ language: 'json' })
            .then(document => this.resultDocument = document);
    }
    close(document) {
        if (document === this.resultDocument) {
            this.resultDocument = undefined;
        }
    }
    change(e) {
        if (e.document.languageId === 'azcli' && e.contentChanges.length === 1) {
            const change = e.contentChanges[0];
            const range = change.range;
            if (range.start.line === range.end.line) {
                const line = e.document.lineAt(range.start.line).text;
                const query = this.getQueryArgument(line);
                if (query !== this.query) {
                    this.query = query;
                    if (this.queryEnabled) {
                        this.updateResult();
                    }
                }
            }
        }
    }
    updateResult() {
        if (this.resultDocument && this.parsedResult) {
            const resultEditor = vscode_1.window.visibleTextEditors.find(editor => editor.document === this.resultDocument);
            if (resultEditor) {
                try {
                    const result = this.queryEnabled && this.query ? jmespath.search(this.parsedResult, this.query) : this.parsedResult;
                    replaceContent(resultEditor, JSON.stringify(result, null, '    '))
                        .then(undefined, console.error);
                }
                catch (err) {
                    if (!(err && err.name === 'ParserError')) {
                        // console.error(err); Ignore because jmespath sometimes fails on partial queries.
                    }
                }
            }
        }
    }
    getQueryArgument(line) {
        return (/\s--query\s+("([^"]*)"|'([^']*)'|([^\s"']+))/.exec(line) || [])
            .filter(group => !!group)[2];
    }
    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
}
class StatusBarInfo {
    constructor(azService) {
        this.azService = azService;
        this.liveQuery = false;
        this.disposables = [];
        this.disposables.push(this.info = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left));
        this.disposables.push(vscode_1.window.onDidChangeActiveTextEditor(() => this.update()));
        this.disposables.push({ dispose: () => this.timer && clearTimeout(this.timer) });
        this.refresh()
            .catch(console.error);
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.status = yield this.azService.getStatus();
            this.update();
            this.timer = setTimeout(() => {
                this.refresh()
                    .catch(console.error);
            }, 5000);
        });
    }
    update() {
        const texts = [];
        if (this.status && this.status.message) {
            texts.push(this.status.message);
        }
        if (this.liveQuery) {
            texts.push('Live Query');
        }
        this.info.text = texts.join(', ');
        const editor = vscode_1.window.activeTextEditor;
        const show = this.info.text && editor && editor.document.languageId === 'azcli';
        this.info[show ? 'show' : 'hide']();
    }
    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
}
function allMatches(regex, string, group) {
    return {
        [Symbol.iterator]: function* () {
            let m;
            while (m = regex.exec(string)) {
                yield m[group];
            }
        }
    };
}
function replaceContent(editor, content) {
    const document = editor.document;
    const all = new vscode_1.Range(new vscode_1.Position(0, 0), document.lineAt(document.lineCount - 1).range.end);
    const edit = new vscode_1.WorkspaceEdit();
    edit.replace(document.uri, all, content);
    return vscode_1.workspace.applyEdit(edit)
        .then(() => editor.selections = [new vscode_1.Selection(0, 0, 0, 0)]);
}
function azNotFound(wrongVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = wrongVersion ? '\'az\' >= 2.0.5 required, please update your installation.' : '\'az\' not found on PATH, please make sure it is installed.';
        const result = yield vscode_1.window.showInformationMessage(message, {
            title: 'Documentation',
            run: installAzureCLI
        });
        if (result && result.run) {
            result.run();
        }
    });
}
function installAzureCLI() {
    vscode_1.env.openExternal(vscode_1.Uri.parse('https://aka.ms/GetTheAzureCLI'));
}
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map