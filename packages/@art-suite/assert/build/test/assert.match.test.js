"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["pairedAssertTests"], [global, require('./StandardImport')], (pairedAssertTests) => {return pairedAssertTests("match", "notMatch", [[true, "hi frank", /fr/], [false, "hi frank", /fri/]]);});});
//# sourceMappingURL=assert.match.test.js.map
