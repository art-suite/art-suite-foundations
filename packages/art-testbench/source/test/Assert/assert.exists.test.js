"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["pairedAssertTests"], [global, require('../StandardImport')], (pairedAssertTests) => {return pairedAssertTests("exists", "doesNotExist", [[true, ""], [true, 0], [false, null], [false, undefined]]);});});
//# sourceMappingURL=assert.exists.test.js.map
