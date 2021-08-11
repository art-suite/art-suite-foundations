"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "Stat", "assert"], [global, require('./StandardImport')], (describe, test, Stat, assert) => {return describe({"Art.Foundation.Tools.Stat": function() {return test("average, min, max, samples", () => {let s; s = new Stat; s.add(1); s.add(2); s.add(3); assert.eq(s.values, [1, 2, 3]); assert.eq(s.values.length, 3); assert.eq(s.average, 2); assert.eq(s.min, 1); assert.eq(s.max, 3); return assert.eq(s.length, 3);});}});});});
//# sourceMappingURL=Stat.test.js.map
