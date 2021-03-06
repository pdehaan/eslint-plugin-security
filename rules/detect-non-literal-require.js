/**
 * Tries to detect calls to require with non-literal argument
 * @author Adam Baldwin 
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    "use strict";

    var getSource = function (token) {
        return token.loc.start.line+ ':  ' + context.getSourceLines().slice(token.loc.start.line-1, token.loc.end.line).join('\n\t');
    }

    return {
        "CallExpression": function (node) {
            if (node.callee.name === 'require') {
                var args = node.arguments;
                if (args && args.length > 0 && args[0].type !== 'Literal') {
                    var token = context.getTokens(node)[0];
                    return context.report(node, 'Found non-literal argument in require\n\t' + getSource(token));
                }
            }

        }

    };

};

