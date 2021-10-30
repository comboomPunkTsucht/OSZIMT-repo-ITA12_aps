"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const short_1 = __importDefault(require("./short"));
const descriptive_1 = __importDefault(require("./descriptive"));
/** @ignore */
const builtinRelationNameFunctions = {
    short: short_1.default,
    descriptive: descriptive_1.default,
};
function getRelationNameFunctions(relationNameFunctions) {
    return typeof relationNameFunctions === "string" ? builtinRelationNameFunctions[relationNameFunctions] : relationNameFunctions;
}
exports.default = getRelationNameFunctions;
//# sourceMappingURL=index.js.map