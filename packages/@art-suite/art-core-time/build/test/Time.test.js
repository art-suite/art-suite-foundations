"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert", "currentSecond", "Math", "Date", "time"], [global, require('./StandardImport')], (test, assert, currentSecond, Math, Date, time) => {test("currentSecond", function() {return assert.isNumber(currentSecond());}); test("currentSecond matches Date.now", function() {return assert.lt(Math.abs(currentSecond() - Date.now() / 1000), 1);}); return test("time", function() {assert.lt(time(() => 1), .01); return assert.eq(time("logit", () => "foo"), "foo");});});});
//# sourceMappingURL=Time.test.js.map
