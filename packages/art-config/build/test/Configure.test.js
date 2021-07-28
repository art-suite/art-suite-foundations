"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "configure", "assert"], [global, require('./StandardImport')], (test, configure, assert) => {return test("configure verbose", function() {let logEntries; logEntries = []; configure({verbose: true, log: (...args) => logEntries.push(args)}); return assert.gt(logEntries.length, 0);});});});
//# sourceMappingURL=Configure.test.js.map
