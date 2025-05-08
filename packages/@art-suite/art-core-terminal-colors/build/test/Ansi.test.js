"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert", "stripAnsi", "ansiSafeStringLength"], [global, require('./StandardImport')], (test, assert, stripAnsi, ansiSafeStringLength) => {test("stripAnsi", function() {return assert.eq(stripAnsi("\u001b[31mHello, world!\u001b[0m"), "Hello, world!");}); test("stripAnsi non-ansi string", function() {return assert.eq(stripAnsi("Hello, world!"), "Hello, world!");}); return test("ansiSafeStringLength", function() {return assert.eq(ansiSafeStringLength("\u001b[31mHello, world!\u001b[0m"), ("Hello, world!").length);});});});
//# sourceMappingURL=Ansi.test.js.map
