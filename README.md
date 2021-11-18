# babel-plugin-example
JS instrumentation based on babel

## 使用

步骤：
1. git clone
2. npm i
3. npm run run
   这一系列步骤会把"inputCode/example.js"按照"visitors/myVisitor.js"中定义的Visitor的规则进行插桩，插桩后的代码存放在"outputCode/output.js"中。

可以通过修改"index.js"代码，改变输入和输出路径。
