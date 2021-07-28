"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["pairedAssertTests"], [global, require('../StandardImport')], (pairedAssertTests) => {return pairedAssertTests("present", "notPresent", [[true, "hi"], [true, 0], [true, 1], [false, ""], [false, null], [false, undefined]]);});});
//# sourceMappingURL=assert.present.test.js.map
