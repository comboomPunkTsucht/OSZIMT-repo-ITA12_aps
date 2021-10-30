"use strict";
//
// arm-parser-types.ts - ARM Parser
// Type definitions, interfaces and basic data classes
// Ben Coleman, 2019
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.CytoscapeNode = void 0;
// ============================================================
class CytoscapeNode {
    constructor(type) {
        this.group = type;
        this.data = {};
    }
}
exports.CytoscapeNode = CytoscapeNode;
//# sourceMappingURL=arm-parser-types.js.map