module.exports = function (babel) {
    const parse = require('@babel/parser').parse
    const _ = require('lodash')
    const {blockStatement} = require("@babel/types");

    // save the positions of prisma instrument comments
    let instrumentFlags = []

    // function.body 前后添加一句console.log(`[enter] function "${path.node.name}"`)
    function createInsertedAST(tag, nodeName) {
        // inserted code: console.log(`[enter] function "${path.node.name}"`)
        // AST: https://astexplorer.net/
        // build AST node
        let code = "console.log(\"[" + tag + "] " + nodeName + "\")"
        let AST = parse(code)
        return AST.program.body[0]
    }

    function makeShadow(node) {
        node && (node._shadow_ = true)
        return node
    }

    function isShadow(node) {
        return Boolean(node && node._shadow_)
    }

    function isToInst(path, instrumentFlags) {
        return _.includes(instrumentFlags, path.node.start)
    }

    return {
        visitor: {
            'Program': {
                enter(path) {
                    // global var init
                    // key: function name ; value: inserted argument name
                    instrumentFlags = []
                    path.parent.comments.forEach((item) => {
                        if(item.value.includes("[prisma inst flag]")) {
                            instrumentFlags.push(item.end + 2)
                        }
                    })
                }
            },
            // including async function
            'FunctionDeclaration': {
                enter(path) {
                    if (!isToInst(path, instrumentFlags)) return

                    // console.log(`[enter] function "${path.node.name}"`)
                    const insertedASTNode = createInsertedAST("enter", "function " + path.node.id.name)
                    path.node.body.body.unshift(insertedASTNode)

                    // check if shadowed
                    if (isShadow(path.node)) return
                    // make shadow function
                    const originalFunc = makeShadow(_.cloneDeep(path.node))
                    const newFunc = makeShadow(_.cloneDeep(path.node))
                    newFunc.id.name += "1"
                    path.replaceWith(blockStatement([originalFunc, newFunc]))
                },
                exit(path) {
                    if (!isToInst(path, instrumentFlags)) return

                    // console.log(`[exit ] function "${path.node.name}"`)
                    const insertedASTNode = createInsertedAST("exit ", "function " + path.node.id.name)
                    path.node.body.body.push(insertedASTNode)
                }
            },
        }
    }
}
