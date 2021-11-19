const babel = require("@babel/core");
const fs = require('fs')
inputCodePath = 'inputCode/example.js'
outputCodePath = 'outputCode/output.js'
pluginPath = './visitors/myVisitor.js'

const inputCode = fs.readFileSync(inputCodePath, 'utf8')
console.log(inputCode)

const { code } = babel.transform(inputCode, {
    plugins: [
        pluginPath
    ]
})

console.log(code); // var b = 1
fs.writeFileSync(outputCodePath, code, {flag: 'w+'});