"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "Validator", "assert"], [global, require('../StandardImport')], (test, Validator, assert) => {test("preprocess creates a new object if values change (via default)", function() {let v1, input; v1 = new Validator({count: {fieldType: "number", default: 0}}); return assert.notEqual(v1.preprocess(input = {}, true), input);}); test("preprocess creates a new object if values change (via preprocess)", function() {let v1, input; v1 = new Validator({count: {fieldType: "number", preprocess: (a) => (a | 0) + 1}}); return assert.notEqual(v1.preprocess(input = {count: 1}), input);}); test("preprocess returns the exact object if values don't change (via defaults)", function() {let v1, input; v1 = new Validator({count: {fieldType: "number", default: 0}}); return assert.equal(v1.preprocess(input = {count: 444}, true), input);}); test("preprocess returns the exact object if values don't change (via preprocess)", function() {let v1, input; v1 = new Validator({count: {fieldType: "number", preprocess: (a) => a}}); return assert.equal(v1.preprocess(input = {count: 444}), input);}); test("preprocess does not apply defaults", function() {let v1; v1 = new Validator({count: {fieldType: "number", default: 0}}); assert.eq(v1.preprocess({}), {}); assert.eq(v1.preprocess({count: null}), {count: null}); return assert.eq(v1.preprocess({count: "123"}), {count: "123"});}); test("preprocess does apply preprocess", function() {let v1; v1 = new Validator({count: {fieldType: "number", default: 0, preprocess: (a) => (a | 0) + 1}}); assert.eq(v1.preprocess({}), {}); assert.eq(v1.preprocess({count: null}), {count: null}); return assert.eq(v1.preprocess({count: "123"}), {count: 124});}); return test("preprocess CAN apply preprocess AND default values ARE preprocessed", function() {let v1; v1 = new Validator({count: {fieldType: "number", default: 0, preprocess: (a) => (a | 0) + 1}}); assert.eq(v1.preprocess({}, true), {count: 1}); assert.eq(v1.preprocess({count: null}, true), {count: null}); return assert.eq(v1.preprocess({count: "123"}, true), {count: 124});});});});
//# sourceMappingURL=Preprocess.test.js.map