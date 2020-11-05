"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let Object = global.Object, String = global.String, Function = global.Function, Error = global.Error, describe; return {test: function(...args) {return global.test(...args);}, describe: describe = function(a, b) {if (Caf.is(a, Object)) {Caf.each2(a, (v, k) => (Caf.is(v, Function)) ? global.describe(k, () => {v(); return undefined;}) : global.describe(k, () => describe(v)));} else {if (Caf.is(a, String) && Caf.is(b, Function)) {global.describe(a, () => {b(); return undefined;});} else {throw new Error("describe was expecting an object structure or a string & function");};}; return undefined;}};});
//# sourceMappingURL=Jest.js.map
