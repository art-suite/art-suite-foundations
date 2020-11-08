"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert", "Promise"], [global, require('../StandardImport')], (test, assert, Promise) => {test("only requires partial match", function() {return assert.selectedEq({foo: 1}, {foo: 1, bar: 2});}); return test("fails correctly", function() {return Promise.then(() => assert.selectedEq({foo: 2}, {foo: 1, bar: 2})).catch((error) => {assert.match(error.message, /expected(.|\n)*to equal selected props/); return assert.doesNotMatch(error.message, "not defined");});});});});
//# sourceMappingURL=assert.selectedEq.test.js.map
