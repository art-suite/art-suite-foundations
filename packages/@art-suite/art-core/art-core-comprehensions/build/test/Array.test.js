"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["testComprehension", "_array", "x2", "even", "Map"], [global, require('./StandardImport')], (testComprehension, _array, x2, even, Map) => {let map; testComprehension([], _array, null); testComprehension([], _array, []); testComprehension([2, 4], _array, {a: 1, b: 2}, x2); testComprehension([2, 4, 6, 8], _array, [1, 2, 3, 4], x2); testComprehension([2, 4, 6, 8], _array, [1, 2, 3, 4], {map: x2}); testComprehension([4, 8], _array, [1, 2, 3, 4], {with: x2, when: even}); testComprehension([4, 8, 12, 16], _array, [1, 2, 3, 4], {with: x2, map: x2}); map = new Map([["a", 1], ["b", 2]]); return testComprehension([2, 4], _array, map, x2);});});
//# sourceMappingURL=Array.test.js.map
