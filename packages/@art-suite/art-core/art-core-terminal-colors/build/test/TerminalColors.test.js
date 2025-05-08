"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert", "yellow"], [global, require('./StandardImport')], (test, assert, yellow) => {return test("yellow", function() {return assert.eq(yellow("Hello, world!"), "\u001b[33mHello, world!\u001b[39m");});});});
//# sourceMappingURL=TerminalColors.test.js.map
