module.exports = function (babel) {
    const parse = require('@babel/parser').parse
    const types = require('@babel/types')

    // key: function name ; value: inserted argument name
    let insertedFuncArg = {}

    // function.body 前后添加一句console.log(`[enter] function "${path.node.name}"`)
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
            // including async function
            'FunctionDeclaration': {
                enter(path) {
                    // console.log(`[enter] function "${path.node.name}"`)
                    const insertedASTNode = createInsertedAST("enter", "function " + path.node.id.name)
                    path.node.body.body.unshift(insertedASTNode)

                    // add arg
                    path.node.params.unshift(types.identifier("added_arg"))
                    insertedFuncArg[path.node.id.name] = "added_arg"
                    const insertedCode = createInsertedAST("addArg", "arg name: added_arg" )
                    path.node.body.body.unshift(insertedCode)

                },
                exit(path) {
                    // console.log(`[exit ] function "${path.node.name}"`)
                    const insertedASTNode = createInsertedAST("exit ", "function " + path.node.id.name)
                    path.node.body.body.push(insertedASTNode)
                }
            },
            // anonymous and async function
            'FunctionExpression': {
                enter(path) {
                    if (path.node.async === true) {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("enter", "async")
                            path.node.body.body.unshift(insertedASTNode)
                        }
                    } else {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("enter", "anonymous")
                            path.node.body.body.unshift(insertedASTNode)
                        }
                    }

                    // add arg
                    path.node.params.unshift(types.identifier("added_arg"))
                    const insertedCode = createInsertedAST("addArg", "arg name: added_arg" )
                    path.node.body.body.unshift(insertedCode)
                },
                exit(path) {
                    if (path.node.async === true) {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("exit ", "async")
                            path.node.body.body.push(insertedASTNode)
                        }
                    } else {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("exit ", "anonymous")
                            path.node.body.body.push(insertedASTNode)
                        }
                    }
                }
            },
            // including async arrow function
            'ArrowFunctionExpression': {
                enter(path) {
                    if (path.node.async === true) {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("enter", "async arrow")
                            path.node.body.body.unshift(insertedASTNode)
                        }
                    } else {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("enter", "arrow")
                            path.node.body.body.unshift(insertedASTNode)
                        }
                    }

                    // add arg
                    path.node.params.unshift(types.identifier("added_arg"))
                    const insertedCode = createInsertedAST("addArg", "arg name: added_arg" )
                    path.node.body.body.unshift(insertedCode)
                },
                exit(path) {
                    if (path.node.async === true) {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("exit ", "async arrow")
                            path.node.body.body.push(insertedASTNode)
                        }
                    } else {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("exit ", "arrow")
                            path.node.body.body.push(insertedASTNode)
                        }
                    }
                }
            },
            // class method, including statc method
            'ClassMethod': {
                enter(path) {
                    if (path.node.static === true) {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("enter", "static method " + path.node.key.name)
                            path.node.body.body.unshift(insertedASTNode)
                        }
                    } else {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("enter", "method " + path.node.key.name)
                            path.node.body.body.unshift(insertedASTNode)
                        }
                    }
                },
                exit(path) {
                    if (path.node.static === true) {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("exit ", "static method " + path.node.key.name)
                            path.node.body.body.push(insertedASTNode)
                        }
                    } else {
                        if (path.node.body.type === "BlockStatement") {
                            const insertedASTNode = createInsertedAST("exit ", "method " + path.node.key.name)
                            path.node.body.body.push(insertedASTNode)
                        }
                    }
                }
            },
            "CallExpression": {
                enter(path) {
                    // add arg
                    const firstArg = path.node.arguments[0]
                    const functionName = path.node.callee.name
                    if (types.isIdentifier(firstArg) && insertedFuncArg.hasOwnProperty(functionName)) {
                        path.node.arguments.unshift(types.stringLiteral("myArg"))
                    }
                }
            }
        }
    }
}
