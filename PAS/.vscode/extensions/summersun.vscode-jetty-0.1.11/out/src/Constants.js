'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.YES = { title: 'Yes' };
exports.NO = { title: 'No', isCloseAffordance: true };
exports.CANCEL = { title: 'Cancel', isCloseAffordance: true };
exports.ADD_SERVER = 'Add Jetty Server';
exports.SELECT_SERVER = 'Select Jetty Server';
exports.SELECT_JETTY_DIRECTORY = 'Select Jetty Directory';
exports.DELETE_CONFIRM = 'This Jetty Server is running, are you sure you want to delete it?';
exports.SERVER_RUNNING = 'This Jetty Server is running.';
exports.SERVER_STOPPED = 'This Jetty Server is not running.';
exports.SELECT_WAR_PACKAGE = 'Select War Package';
exports.START_SERVER = 'The Jetty Server needs to be started before browsing. Would you like to start it now?';
// tslint:disable-next-line:no-http-string
exports.LOCALHOST = 'http://localhost';
exports.HTTP_PORT_UNDEFINED = 'http port is undefined in server configuration.';
exports.NO_PACKAGE = 'The selected package is not under current workspace.';
exports.NO_SERVER = 'There is no Jetty Servers.';
exports.WAR_FILE_EXTENSION = '.war';
exports.DEBUG_SESSION_NAME = 'Jetty Debug (Attach)';
var SERVER_STATE;
(function (SERVER_STATE) {
    SERVER_STATE["RunningServer"] = "runningserver";
    SERVER_STATE["IdleServer"] = "idleserver";
})(SERVER_STATE = exports.SERVER_STATE || (exports.SERVER_STATE = {}));
//# sourceMappingURL=Constants.js.map