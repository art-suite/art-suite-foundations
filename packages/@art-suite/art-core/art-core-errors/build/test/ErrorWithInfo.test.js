"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "ErrorWithInfo", "assert"], [global, require('./StandardImport')], (test, ErrorWithInfo, assert) => {return test("ErrorWithInfo", function() {let ewi; ewi = new ErrorWithInfo("hi", {a: 1}); return assert.eq(ewi.toString(), "ErrorWithInfo: hi\n\n{info:{a:1}}");});});});
//# sourceMappingURL=ErrorWithInfo.test.js.map
