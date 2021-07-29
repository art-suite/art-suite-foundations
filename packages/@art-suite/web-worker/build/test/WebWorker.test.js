"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test"], [global, require('./StandardImport')], (test) => {return test("foo", function() {});});});
//# sourceMappingURL=WebWorker.test.js.map
