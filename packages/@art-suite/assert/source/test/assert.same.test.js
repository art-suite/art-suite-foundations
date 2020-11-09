"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["pairedAssertTests"], [global, require('./StandardImport')], (pairedAssertTests) => {let a; a = {}; return pairedAssertTests("same", "notSame", [[true, 0, 0], [true, a, a], [false, 0, 1], [false, a, {}]]);});});
//# sourceMappingURL=assert.same.test.js.map
