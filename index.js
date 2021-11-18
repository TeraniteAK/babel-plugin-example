const babel = require("@babel/core");
const fs = require('fs')
inputCodePath = 'inputCode/lab4.js'
outputCodePath = 'outputCode/outputLab4.js'
pluginPath = './visitors/lab4Visitor.js'

const inputCode = fs.readFileSync(inputCodePath, 'utf8')
console.log(inputCode)

const { code } = babel.transform(inputCode, {
    plugins: [
        pluginPath
    ]
})

console.log(code); // var b = 1
fs.writeFileSync(outputCodePath, code, {flag: 'w+'});