"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["addTester"], [global, require('./StandardImport')], (addTester) => {addTester("true", function(a) {return a === true;}); addTester("false", function(a) {return a === false;}); addTester("jsTrue", function(a) {return !!a;}); addTester("jsFalse", function(a) {return !a;}); addTester("rubyTrue", function(a) {return a !== false && a != null;}); return addTester("rubyFalse", function(a) {return a === false || !(a != null);});});});
//# sourceMappingURL=Truth.js.map
