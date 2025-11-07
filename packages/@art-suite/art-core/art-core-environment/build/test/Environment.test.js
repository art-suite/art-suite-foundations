"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert", "getEnv"], [global, require('./StandardImport')], (test, assert, getEnv) => {let list; list = {isWebWorker: false, isBrowser: false, isNode: true}; Caf.each2(list, (expected, testName) => test(testName, function() {return assert.eq(require('../../build')[testName], expected);})); return test("getEnv", function() {return assert.match(getEnv().NODE, /node/);});});});
//# sourceMappingURL=Environment.test.js.map
