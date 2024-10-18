"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "Validator", "assert"], [global, require('../StandardImport')], (test, Validator, assert) => {return test("inspectedObjects", function() {let v1; v1 = new Validator({count: {fieldType: "number"}}); return assert.isObject(v1.inspectedObjects);});});});
//# sourceMappingURL=ValidatorMisc.test.js.map
