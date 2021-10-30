"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
    /**
     * Add quotes to string if and only if it contains space characters.
     *
     * Note: does not handle generalized white space (tabs, localized white
     * space, etc.)
     *
     * @param path File path in string form.
     * @return Quoted path if it contains any space characters, otherwise same.
     */
    static quote(path) {
        return path.indexOf(' ') === -1 ? path : "\"" + path + "\"";
    }
    /**
     * Utility method that finds all occurrences of variable references and
     * replaces them with their values.
     * Values are taken from <code>varMap</code> and escaped. If they are
     * not present there, system properties are queried. If not found there
     * the variable reference is replaced with the same string with special
     * characters escaped.
     *
     * @param value String value where the variables have to be replaced with values
     * @param varMap mapping of variable names to their values
     * @return String where the all the replacement was done
     */
    static doSub(input, varMap) {
        let matcher = input.match("\\$\\{([^}]+)\\}");
        if (matcher !== null && matcher.length > 0) {
            varMap.forEach((value, key) => {
                let replacement = this.escapePath(value);
                input = input.replace(new RegExp("\\$\\{" + key + "\\}", 'g'), replacement);
            });
        }
        return input;
    }
    /**
     * Add escape characters for backslash and dollar sign characters in
     * path field.
     *
     * @param path file path in string form.
     * @return adjusted path with backslashes and dollar signs escaped with
     *   backslash character.
     */
    static escapePath(path) {
        return path.replace("\\", "\\\\").replace("$", "\\$");
    }
}
exports.StringUtils = StringUtils;
StringUtils.PATTERN = "\\$\\{([^}]+)\\}";
//# sourceMappingURL=StringUtils.js.map