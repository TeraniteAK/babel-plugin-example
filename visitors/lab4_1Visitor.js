module.exports = function (babel) {
    const parse = require('@babel/parser').parse

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
            'Program': {
                enter(path, state) {
                    state.set("functionNestCounter", 0)
                }
            },
            'FunctionDeclaration': {
                enter(path, state) {
                    state.set("functionNestCounter", state.get("functionNestCounter") + 1)

                    const insertedASTNode = createInsertedAST("nestNumber", state.get("functionNestCounter"))
                    path.node.body.body.unshift(insertedASTNode)
                },
                exit(path, state) {
                    state.set("functionNestCounter", state.get("functionNestCounter") - 1)
                }
            }
        }
    }
}
