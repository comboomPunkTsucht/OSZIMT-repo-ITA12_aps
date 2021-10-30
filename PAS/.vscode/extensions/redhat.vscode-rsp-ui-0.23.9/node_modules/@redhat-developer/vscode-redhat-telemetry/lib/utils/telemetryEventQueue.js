"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryEventQueue = exports.MAX_QUEUE_SIZE = void 0;
exports.MAX_QUEUE_SIZE = 35;
class TelemetryEventQueue {
    constructor() {
        this.events = [];
    }
    /*
      shift() should work fine until we choose to have high MAX_QUEUE_SIZE
     */
    addEvent(e) {
        var _a, _b;
        if (((_a = this.events) === null || _a === void 0 ? void 0 : _a.length) === exports.MAX_QUEUE_SIZE) {
            this.events.shift();
        }
        (_b = this.events) === null || _b === void 0 ? void 0 : _b.push(e);
    }
    emptyQueue() {
        this.events = undefined;
    }
}
exports.TelemetryEventQueue = TelemetryEventQueue;
//# sourceMappingURL=telemetryEventQueue.js.map