"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "Validator", "assert"], [global, require('./StandardImport')], (describe, test, Validator, assert) => {return describe({"art-validation": function() {return test("Validator is defined and works as expected", () => {let v; v = new Validator({id: {fieldType: "trimmedString", maxLength: 5}}); assert.throws(() => v.validateCreate({id: "  too long man"})); return v.validateCreate({id: "abc"});});}});});});
//# sourceMappingURL=PackagesPrevioslyFactoredOut.test.js.map
