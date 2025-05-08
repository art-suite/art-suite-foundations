"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "assert", "push", "peek", "pop"], [global, require('./StandardImport')], (describe, test, assert, push, peek, pop) => {return describe({push: function() {return test("push", () => assert.eq(push([1, 2, 3], 4), [1, 2, 3, 4]));}, peek: function() {return test("peek", () => {assert.eq(peek([1, 2, 3], 0), 3); assert.eq(peek([1, 2, 3], 1), 2); assert.eq(peek([1, 2, 3], 2), 1); return assert.eq(peek([1, 2, 3], 3), undefined);});}, pop: function() {return test("pop", () => {assert.eq(pop([1, 2, 3]), 3); assert.eq(pop([1, 2, 3]), 2); assert.eq(pop([1, 2, 3]), 1); return assert.eq(pop([1, 2, 3]), undefined);});}});});});
//# sourceMappingURL=Stacks.js.map
