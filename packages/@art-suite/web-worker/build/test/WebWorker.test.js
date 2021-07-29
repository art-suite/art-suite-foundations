"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "assert", "isWebWorker", "webWorkersSupported"], [global, require('./StandardImport')], (describe, test, assert, isWebWorker, webWorkersSupported) => {return describe({inNode: function() {test("isWebWorker should be false", () => assert.eq(isWebWorker, false)); return test("webWorkersSupported should be false", () => assert.eq(webWorkersSupported, false));}});});});
//# sourceMappingURL=WebWorker.test.js.map
