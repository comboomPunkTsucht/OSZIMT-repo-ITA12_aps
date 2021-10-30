"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function parse(line) {
    const regex = /"[^"]*"|'[^']*'|\#.*|[^\s"'#]+/g;
    const tokens = [];
    let subcommand = true;
    let m;
    while (m = regex.exec(line)) {
        const text = m[0];
        const length = text.length;
        const isArgument = text.startsWith('-');
        const isComment = text.startsWith('#');
        if (isArgument || isComment) {
            subcommand = false;
        }
        tokens.push({
            kind: subcommand ? 'subcommand' : isArgument ? 'argument_name' :
                isComment ? 'comment' : 'argument_value',
            offset: regex.lastIndex - length,
            length,
            text
        });
    }
    const command = {
        tokens,
        subcommand: [],
        arguments: []
    };
    const args = command.arguments;
    for (const token of tokens) {
        switch (token.kind) {
            case 'subcommand':
                command.subcommand.push(token);
                break;
            case 'argument_name':
                args.push({ name: token });
                break;
            case 'argument_value':
                if (args.length && !('value' in args[args.length - 1])) {
                    args[args.length - 1].value = token;
                }
                else {
                    args.push({ value: token });
                }
                break;
            case 'comment':
                command.comment = token;
                break;
            default:
                utils_1.never(token.kind);
        }
    }
    return command;
}
exports.parse = parse;
function findNode(command, offset) {
    return command.tokens.find(token => token.offset <= offset && token.offset + token.length > offset);
}
exports.findNode = findNode;
//# sourceMappingURL=parser.js.map