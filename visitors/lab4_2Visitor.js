const {parse} = require("@babel/parser");
module.exports = function (babel) {
    const parse = require('@babel/parser').parse

    let functionNestCounter = 0

    function createInsertedAST(tag, nodeName) {
        // inserted code: console.log(`[enter] function "${path.node.name}"`)
        // AST: https://astexplorer.net/
        // build AST node
        let code = "console.log(\"[" + tag + "] " + nodeName + "\")"
        let AST = parse(code)
        return AST.program.body[0]
    }

    return {
        visitor: {
            'FunctionDeclaration': {
                enter(path, state) {
                    functionNestCounter += 1

                    const insertedASTNode = createInsertedAST("nestNumber", functionNestCounter)
                    path.node.body.body.unshift(insertedASTNode)
                },
                exit(path, state) {
                    functionNestCounter -= 1
                }
            }
        }
    }
}
