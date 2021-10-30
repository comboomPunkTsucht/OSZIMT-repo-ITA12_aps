"use strict";
//
// ARM Viewer - VS Code Extension
// Ben Coleman, 2019
// Main Extension script
//
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
exports.activate = void 0;
/* eslint @typescript-eslint/no-use-before-define: "off" */
const vscode = require("vscode");
const path = require("path");
const arm_parser_1 = require("./lib/arm-parser");
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const NodeCache = require("node-cache");
// Set up telemetry logging
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');
const telemetryExtensionId = packageJson.publisher + '.' + packageJson.name;
const telemetryExtensionVersion = packageJson.version;
const telemetryKey = '0e2a6ba6-6c52-4e94-86cf-8dc87830e82e';
// Main globals
let panel;
let extensionPath;
let themeName;
let editor;
let paramFileContent;
let filters;
let reporter;
let cache;
// Used to buffer/delay updates when typing
let refreshedTime = Date.now();
let typingTimeout;
//
// Main extension activation
//
function activate(context) {
    extensionPath = context.extensionPath;
    context.subscriptions.push(vscode.commands.registerCommand('armView.start', () => {
        // Check for open editors that are showing JSON
        // These are safe guards, the `when` clauses in package.json should prevent this
        if (!vscode.window.activeTextEditor) {
            vscode.window.showErrorMessage('No editor active, open a ARM template JSON file in the editor');
            return;
        }
        else {
            if (!(vscode.window.activeTextEditor.document.languageId === 'json' ||
                vscode.window.activeTextEditor.document.languageId === 'arm-template')) {
                vscode.window.showErrorMessage('Current file is not JSON');
                return;
            }
        }
        // Store the active editor at start
        editor = vscode.window.activeTextEditor;
        paramFileContent = '';
        themeName = vscode.workspace.getConfiguration('armView').get('iconTheme', 'original');
        console.log(`### ArmView: Activating ${extensionPath} with theme ${themeName}`);
        const cacheTime = vscode.workspace.getConfiguration('armView').get('linkedUrlCacheTime', 120);
        cache = new NodeCache({ stdTTL: cacheTime });
        if (panel) {
            // If we already have a panel, show it
            panel.reveal();
            return;
        }
        // Create the panel (held globally)
        panel = vscode.window.createWebviewPanel('armViewer', 'ARM Viewer', {
            preserveFocus: false,
            viewColumn: vscode.ViewColumn.Beside
        }, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'assets'))],
        });
        // Give panel a custom icon
        panel.iconPath = {
            dark: vscode.Uri.file(`${extensionPath}/assets/img/icons/eye-dark.svg`),
            light: vscode.Uri.file(`${extensionPath}/assets/img/icons/eye-light.svg`),
        };
        reporter = new vscode_extension_telemetry_1.default(telemetryExtensionId, telemetryExtensionVersion, telemetryKey);
        context.subscriptions.push(reporter);
        // Load the webview HTML/JS
        panel.webview.html = getWebviewContent();
        // Listen for active document changes, i.e. user typing
        vscode.workspace.onDidChangeTextDocument(() => {
            // console.log("### onDidChangeTextDocument");
            // If an update is scheduled, then skip
            if (typingTimeout) {
                return;
            }
            // Buffer/delay updates by 2 seconds
            if (Date.now() - refreshedTime < 2000) {
                typingTimeout = setTimeout(refreshView, 2000);
                return;
            }
            try {
                refreshView();
            }
            catch (err) {
                // Nadda
            }
        });
        // Listen for active editor changes
        vscode.window.onDidChangeActiveTextEditor(() => {
            // console.log("### onDidChangeActiveTextEditor");
            try {
                // Switch editor and refresh
                if (vscode.window.activeTextEditor) {
                    if (editor.document.fileName !== vscode.window.activeTextEditor.document.fileName) {
                        // Wipe param file on switch
                        paramFileContent = '';
                        if (panel) {
                            panel.webview.postMessage({ command: 'paramFile', payload: '' });
                        }
                        editor = vscode.window.activeTextEditor;
                        refreshView();
                    }
                }
            }
            catch (err) {
                // Nadda
            }
        });
        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(message => {
            // Initial load of content, done at startup
            if (message.command === 'initialized') {
                console.log('### ArmView: Initialization of WebView complete, now parsing template...');
                refreshView();
            }
            // Message from webview - user clicked 'Params' button
            if (message.command === 'paramsClicked') {
                pickParamsFile();
            }
            // Message from webview - user clicked 'Filters' button
            if (message.command === 'filtersClicked') {
                pickFilters();
            }
            // Message from webview - user clicked 'Filters' button
            if (message.command === 'exportPNG') {
                savePNG(message.payload);
            }
        }, undefined, context.subscriptions);
        // Dispose/cleanup
        panel.onDidDispose(() => {
            reporter.dispose();
            panel = undefined;
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        }, null, context.subscriptions);
    }));
}
exports.activate = activate;
function savePNG(pngBase64) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveAs = yield vscode.window.showSaveDialog({ saveLabel: 'Save PNG', filters: { Images: ['png'] } });
        if (saveAs) {
            const buf = Buffer.from(pngBase64, 'base64');
            vscode.workspace.fs.writeFile(saveAs, buf);
        }
    });
}
//
// Prompt user for parameter file and apply it to the parser
//
function pickParamsFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const wsLocalDir = path.dirname(editor.document.fileName);
        if (wsLocalDir) {
            const paramFile = yield vscode.window.showOpenDialog({
                canSelectMany: false,
                defaultUri: vscode.Uri.file(wsLocalDir),
                filters: { JSON: ['json'] },
            });
            if (paramFile) {
                const res = yield vscode.workspace.fs.readFile(paramFile[0]);
                if (res) {
                    paramFileContent = res.toString();
                    const paramFileName = vscode.workspace.asRelativePath(paramFile[0]);
                    if (panel) {
                        panel.webview.postMessage({ command: 'paramFile', payload: paramFileName });
                    }
                }
            }
        }
        refreshView();
    });
}
//
// Prompt user for resource filters
//
function pickFilters() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield vscode.window.showInputBox({ prompt: 'Comma separated list of resource types to filter out. Can be partial strings. Empty string will remove all filters', value: filters, placeHolder: 'e.g. vaults/secrets, securityRules' });
        // Res will be undefined if the user cancels (hits escape)
        if (res !== undefined) {
            filters = res.toString().toLowerCase();
        }
        if (panel) {
            panel.webview.postMessage({ command: 'filtersApplied', payload: filters });
        }
        refreshView();
    });
}
//
// Refresh contents of the view
//
function refreshView() {
    return __awaiter(this, void 0, void 0, function* () {
        // Reset timers for typing updates
        refreshedTime = Date.now();
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        typingTimeout = undefined;
        if (!panel) {
            return;
        }
        if (editor) {
            // Skip non-JSON
            if (!(editor.document.languageId === 'json' || editor.document.languageId === 'arm-template')) {
                return;
            }
            // Parse the source template JSON
            const templateJSON = editor.document.getText();
            // Create a new ARM parser, giving icon prefix based on theme, and name it "main"
            // Additionally passing reporter and editor enables telemetry and linked template discovery in VS Code workspace
            const parser = new arm_parser_1.default(`${extensionPath}/assets/img/azure/${themeName}`, 'main', reporter, editor, cache);
            try {
                const start = Date.now();
                const result = yield parser.parse(templateJSON, paramFileContent);
                console.log(`### ArmView: Parsing took ${Date.now() - start} ms`);
                reporter.sendTelemetryEvent('parsedOK', {
                    filename: editor.document.fileName,
                    nodeCount: result.length.toString(),
                });
                panel.webview.postMessage({ command: 'newData', payload: result });
                panel.webview.postMessage({ command: 'resCount', payload: result.length.toString() });
            }
            catch (err) {
                // Disable logging and telemetry for now
                // console.log('### ArmView: ERROR STACK: ' + err.stack)
                // reporter.sendTelemetryEvent('parseError', {'error': err, 'filename': editor.document.fileName});
                panel.webview.postMessage({ command: 'error', payload: err.message });
            }
        }
        else {
            vscode.window.showErrorMessage('No editor active, open a ARM template JSON file in the editor');
        }
    });
}
//
// Initialize the contents of the webview - called at startup
//
function getWebviewContent() {
    // Send telemetry for activation
    const wsname = vscode.workspace.name || 'unknown';
    reporter.sendTelemetryEvent('activated', { workspace: wsname });
    // Just in case, shouldn't happen
    if (!panel) {
        return '';
    }
    const assetsPath = panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'assets')));
    const iconThemeBase = panel.webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'assets', 'img', 'azure', themeName))).toString();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<script src="${assetsPath}/js/vendor/jquery-3.4.1.slim.min.js"></script>
	<script src="${assetsPath}/js/vendor/cytoscape.min.js"></script>
	<script src="${assetsPath}/js/vendor/cytoscape-snap-to-grid.js"></script>

	<script src="${assetsPath}/js/main.js"></script>
	<link href="${assetsPath}/css/main.css" rel="stylesheet" type="text/css">

	<title>ARM Viewer</title>
</head>
<body>
	<div id="error">
		<div id="errortitle">⚠️ Parser Error</div>
		<div id="errormsg"></div>
	</div>

	<div id="buttons">
		<button onclick="toggleLabels()" title="Toggle Labels"><img src="${assetsPath}/img/toolbar/labels.svg"><span class="lab">&nbsp; Labels</span></button>
		<button onclick="cy.fit()" title="Zoom to fit"><img src="${assetsPath}/img/toolbar/fit.svg"><span class="lab">&nbsp; Re-fit</span></button>
		<button onclick="toggleSnap()" id="snapbut" title="Toggle snap to grid"><img src="${assetsPath}/img/toolbar/snap.svg"><span class="lab">&nbsp; Snap</span></button>
		<span class="lab">Layout:</span>
		<button onclick="reLayout('breadthfirst', true)" title="Relayout as tree"><img src="${assetsPath}/img/toolbar/tree.svg"></button>
		<button onclick="reLayout('grid', true)" title="Relayout as grid"><img src="${assetsPath}/img/toolbar/grid.svg"></button>
		<!--button onclick="reLayout('cose', true)"><img src="${assetsPath}/img/toolbar/cose.svg"></button-->
		&nbsp;&nbsp;
		<button onclick="sendMessage('paramsClicked')" title="Apply parameters file"><img src="${assetsPath}/img/toolbar/params.svg"><span class="lab">&nbsp; Params</span></button>
		<button onclick="sendMessage('filtersClicked')" title="Filter out resource types"><img src="${assetsPath}/img/toolbar/filter.svg"><span class="lab">&nbsp; Filter</span></button>
		&nbsp;&nbsp;
		<button onclick="sendMessage('initialized')" title="Reload/reset"><img src="${assetsPath}/img/toolbar/reload.svg"><span class="lab">&nbsp; Reload</span></button>
		<button onclick="exportPNG()" title="Export view as PNG"><img src="${assetsPath}/img/toolbar/export.svg"><span class="lab">&nbsp; Export</span></button>
	</div>

	<div class="loader"></div>

	<div id="mainview"></div>

	<div id="statusbar">
	  Objects: <span id="statusResCount">0</span> &nbsp | &nbsp
		Snap to grid: <span id="statusSnap">Off</span> &nbsp | &nbsp
		Parameters: <span id="statusParams">none</span> &nbsp | &nbsp
		Filters: <span id="statusFilters">none</span>
	</div>

	<div id="infobox">
	  <div class="panel-heading" onclick="hideInfo()"><img id="infoimg" src=''/> &nbsp; Resource Details</div>
    <div class="panel-body">
      <table id="infotable"></table>
    </div>
	</div>

	<script>
		// **** Init Cytoscape and canvas (function in main.js) ****
		init("${iconThemeBase}");
	</script>

</body>
</html>`;
}
//# sourceMappingURL=extension.js.map