"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.INPUT_OPTIONS = {
    FROM_FILE: "Generate from an OpenAPI file",
    FROM_URL: "Generate from a url",
};
exports.GENERATOR_JAR_PATH = path.join(__dirname, "../node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator.jar");
exports.SPEC_VALIDATION_EXCEPTION = "SpecValidationException";
//# sourceMappingURL=constants.js.map