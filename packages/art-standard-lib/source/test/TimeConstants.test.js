"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "longTimeNames", "assert", "secondsPer", "normalizedTimeNames"], [global, require('./StandardImport')], (test, longTimeNames, assert, secondsPer, normalizedTimeNames) => {return Caf.each2({ms: 1 / 1000, s: 1, m: 60, h: 3600, d: 24 * 3600, w: 24 * 3600 * 7, mo: 24 * 3600 * 365.2425 / 12, y: 24 * 3600 * 365.2425}, (v, k) => test(`secondsPer.${Caf.toString(longTimeNames[k])}`, function() {assert.eq(v, secondsPer[k]); assert.eq(v, secondsPer[longTimeNames[k]]); return assert.eq(v, secondsPer[normalizedTimeNames[k]]);}));});});
//# sourceMappingURL=TimeConstants.test.js.map
