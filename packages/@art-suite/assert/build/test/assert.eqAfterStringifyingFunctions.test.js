"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["pairedAssertTests", "test", "assert"], [global, require('./StandardImport')], (pairedAssertTests, test, assert) => {pairedAssertTests("eqAfterStringifyingFunctions", "neqAfterStringifyingFunctions", [[true, function(a) {return a;}, function(a) {return a;}]]); return test("baseline eq failes", function() {assert.rejects(() => assert.eq((a) => a, (a) => a)); return assert.eqAfterStringifyingFunctions((a) => a, (a) => a);});});});
//# sourceMappingURL=assert.eqAfterStringifyingFunctions.test.js.map
