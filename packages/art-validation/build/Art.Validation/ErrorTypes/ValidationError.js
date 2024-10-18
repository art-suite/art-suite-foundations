"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["ErrorWithInfo"], [global, require('art-standard-lib')], (ErrorWithInfo) => {let ValidationError; return ValidationError = Caf.defClass(class ValidationError extends ErrorWithInfo {});});});
//# sourceMappingURL=ValidationError.js.map
