"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert", "fuzzySearch"], [global, require('./StandardImport')], (test, assert, fuzzySearch) => {return test("fuzzySearch", function() {return assert.eq(fuzzySearch("fz", [["I love food"], ["I find pizza appealing", 123, true], ["I fuzzbuzz", "some", "data"]]), [["I fuzzbuzz", "some", "data"], ["I find pizza appealing", 123, true]]);});});});
//# sourceMappingURL=FuzzySearch.test.js.map
