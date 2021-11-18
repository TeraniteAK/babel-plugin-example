module.exports = function (babel) {
    const parse = require('@babel/parser').parse

    // function.body 前后添加一句console.log(`[enter] function "${path.node.name}"`)
    function createInsertedAST(tag, nodeName) {
        // inserted code: console.log(`[enter] function "${path.node.name}"`)
        // AST: https://astexplorer.net/
        let code = "console.log(\"[" + tag + "] " + nodeName + "\")"
        let AST = parse(code)
        return AST.program.body[0]
    }

    return {
        visitor: {
            // including async function
            'FunctionDeclaration': {
                enter(path) {
                    // console.log(`[enter] function "${path.node.name}"`)
                    const insertedASTNode = createInsertedAST("enter", "function " + path.node.id.name)
                    path.node.body.body.unshift(insertedASTNode)
                },
                exit(path) {
                    // console.log(`[exit ] function "${path.node.name}"`)
                    const insertedASTNode = createInsertedAST("exit ", "function " + path.node.id.name)
                    path.node.body.body.push(insertedASTNode)
                }
            }
        }
    }
}