module.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i(i.s=2)}([function(e,t){e.exports=require("vscode")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SYNC_EXT_VISIBILITY=t.SYNC_CHECKBOX_VALUE=t.INSTALL_EXT_COMMAND=t.SET_SHOW_ON_STARTUP_COMMAND=t.MICROPROFILE_SHOW_OVERVIEW_CONFIGURATION=void 0,t.MICROPROFILE_SHOW_OVERVIEW_CONFIGURATION="microprofile.alwaysShowOverview",t.SET_SHOW_ON_STARTUP_COMMAND="setShowOnStartup",t.INSTALL_EXT_COMMAND="installExtension",t.SYNC_CHECKBOX_VALUE="syncCheckboxValue",t.SYNC_EXT_VISIBILITY="syncExtensionVisibility"},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(o,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function c(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,c)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const o=i(0),r=i(3),s=i(6),c=i(1);t.activate=function(e){e.subscriptions.push(o.commands.registerCommand("microprofile.overview",()=>n(this,void 0,void 0,(function*(){r.OverviewPage.showOverview(e)})))),e.subscriptions.push(o.commands.registerCommand("microprofile.helper.createMicroProfileStarterProject",()=>n(this,void 0,void 0,(function*(){s.createMicroProfileStarterProjectCmdHandler(e)})))),e.subscriptions.push(o.commands.registerCommand("microprofile.helper.generateMicroProfileRESTClient",()=>n(this,void 0,void 0,(function*(){s.generateMicroProfileRESTClient(e)})))),e.subscriptions.push(o.commands.registerCommand("microprofile.helper.openUrl",t=>n(this,void 0,void 0,(function*(){s.openUrl(e,t)})))),e.subscriptions.push(o.commands.registerCommand("microprofile.helper.installExtension",t=>n(this,void 0,void 0,(function*(){s.installExtension(e,t)})))),o.workspace.getConfiguration().get(c.MICROPROFILE_SHOW_OVERVIEW_CONFIGURATION)&&o.commands.executeCommand("microprofile.overview")},t.deactivate=function(){}},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(o,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function c(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,c)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.OverviewPage=void 0;const o=i(0),r=i(4),s=i(5),c=i(1);class a{constructor(e){this._context=e,this._panelView=this.createOverviewPage(),this.initializeOverview()}static showOverview(e){a.currentPanel?a.currentPanel._panelView.reveal():a.currentPanel=new a(e)}createOverviewPage(){const e=o.window.createWebviewPanel("microprofile.overview","MicroProfile Overview",{viewColumn:o.ViewColumn.One,preserveFocus:!0},{enableScripts:!0,enableCommandUris:!0,retainContextWhenHidden:!0});return e.onDidDispose(()=>{a.currentPanel=void 0}),e}initializeOverview(){return n(this,void 0,void 0,(function*(){const e=this._context.asAbsolutePath("./out/assets/overview/index.html");function t(e){let t=o.workspace.getConfiguration().get(c.MICROPROFILE_SHOW_OVERVIEW_CONFIGURATION);void 0!==t&&e.webview.postMessage({command:c.SYNC_CHECKBOX_VALUE,checkboxValue:t})}function i(e){const t=o.extensions.all.map(e=>e.id.toLowerCase());e.webview.postMessage({command:c.SYNC_EXT_VISIBILITY,installedExtensions:t})}this._panelView.webview.html=yield a.loadTextFromFile(e),t(this._panelView),i(this._panelView),this._context.subscriptions.push(o.extensions.onDidChange(e=>{i(this._panelView)})),this._context.subscriptions.push(o.workspace.onDidChangeConfiguration(e=>{e.affectsConfiguration(c.MICROPROFILE_SHOW_OVERVIEW_CONFIGURATION)&&t(this._panelView)})),this._context.subscriptions.push(this._panelView.webview.onDidReceiveMessage(e=>n(this,void 0,void 0,(function*(){e.command===c.SET_SHOW_ON_STARTUP_COMMAND&&o.workspace.getConfiguration().update(c.MICROPROFILE_SHOW_OVERVIEW_CONFIGURATION,e.visibility,o.ConfigurationTarget.Global),e.command===c.INSTALL_EXT_COMMAND&&(yield o.commands.executeCommand("microprofile.helper.installExtension",e.extName))}))))}))}static loadTextFromFile(e){return n(this,void 0,void 0,(function*(){return(yield this.readFile(e)).toString()}))}}t.OverviewPage=a,a.readFile=r.promisify(s.readFile)},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("fs")},function(e,t,i){"use strict";var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(o,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function c(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,c)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.openUrl=t.installExtension=t.generateMicroProfileRESTClient=t.createMicroProfileStarterProjectCmdHandler=void 0;const o=i(0);function r(e,t,i=!1){return n(this,void 0,void 0,(function*(){return!!function(e){return!!o.extensions.getExtension(e)}(e)||(yield function(e,t){return n(this,void 0,void 0,(function*(){"Install"===(yield o.window.showInformationMessage(t,"Install"))&&(yield o.commands.executeCommand("microprofile.helper.installExtension",e,e))}))}(e,t),!1)}))}t.createMicroProfileStarterProjectCmdHandler=function(e){return n(this,void 0,void 0,(function*(){(yield r("microProfile-community.mp-starter-vscode-ext","MicroProfile Starter for Visual Studio Code is recommended to generate starter projects for Eclipse MicroProfile.",!0))&&(yield o.commands.executeCommand("extension.microProfileStarter"))}))},t.generateMicroProfileRESTClient=function(e){return n(this,void 0,void 0,(function*(){(yield r("microProfile-community.mp-rest-client-generator-vscode-ext","Generator for MicroProfile Rest Client is recommended to generate MicroProfile REST Client Interface template.",!0))&&(yield o.commands.executeCommand("microprofile.restclient.generate"))}))},t.installExtension=function(e,t){return n(this,void 0,void 0,(function*(){return o.window.withProgress({location:o.ProgressLocation.Notification,title:`Installing ${t}...`},e=>o.commands.executeCommand("workbench.extensions.installExtension",t)).then(()=>{o.window.showInformationMessage(`Successfully installed ${t}.`)})}))},t.openUrl=function(e,t){return n(this,void 0,void 0,(function*(){o.commands.executeCommand("vscode.open",o.Uri.parse(t))}))}}]);
//# sourceMappingURL=extension.js.map