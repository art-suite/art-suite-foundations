"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "Validator", "assert", "ValidationError"], [global, require('../StandardImport')], (test, Validator, assert, ValidationError) => {test("basic ValidationError", function() {let v; v = new Validator({name: ["present", "string"]}); return assert.rejects(() => v.validate({name: 123})).then((error) => {assert.instanceOf(error, ValidationError); return assert.eq(error.info, {message: "name is not a valid string (!isString)", fields: ["name"], errors: {name: "not a valid string (!isString)"}, invalidValues: {name: 123}});});}); test("basic getValidationErrorsString", function() {let v; v = new Validator({name: ["present", "string"]}); assert.false(v.isValid({name: 123})); return assert.eq(v.getValidationErrorsString({name: 123}), "name is not a valid string (!isString)");}); return test("basic getValidationErrorsInfo", function() {let v; v = new Validator({name: ["present", "string"]}); assert.false(v.isValid({name: 123})); return assert.eq(v.getValidationErrorsInfo({name: 123}), {message: "name is not a valid string (!isString)", fields: ["name"], errors: {name: "not a valid string (!isString)"}, invalidValues: {name: 123}});});});});
//# sourceMappingURL=ValidationErrors.test.js.map