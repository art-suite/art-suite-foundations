"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "Validator", "assert", "Object", "isString", "log", "Promise", "findEmailRegexp", "merge", "normalizeFieldProps"], [global, require('../StandardImport')], (describe, test, Validator, assert, Object, isString, log, Promise, findEmailRegexp, merge, normalizeFieldProps) => {return describe({new: function() {return test("new Validator", () => new Validator);}, exclusive: function() {test("exclusive only allows declared fields", () => {let v; v = new Validator({id: "trimmedString"}, {exclusive: true}); v.validate({id: "hi"}); assert.throws(() => v.validate({id: "id", foo: "bar"})); assert.throws(() => v.validateUpdate({id: "id", foo: "bar"})); v.validate({id: "id"}); return v.validateUpdate({id: "id"});}); test("inclusive", () => {let v; v = new Validator({id: "trimmedString"}); v.validate({id: "hi"}); v.validate({id: "id", foo: "bar"}); return v.validateUpdate({id: "id", foo: "bar"});}); return test("true is sufficient for declaring expected fields", () => {let v; v = new Validator({id: true, foo: true}, {exclusive: true}); v.validate({id: "hi"}); v.validate({id: "id", foo: "bar"}); return v.validateUpdate({id: "id", foo: "bar"});});}, trimmedString: function() {test("id: 'trimmedString'", () => {let v; v = new Validator({id: "trimmedString"}); v.validate({id: "ok"}); v.validate({}); return assert.throws(() => v.validate({id: 123}));}); test("required: 'trimmedString'", () => {let v; v = new Validator({id: ["required", "trimmedString"]}); v.validate({id: "hi"}); assert.throws(() => v.validate({id: 123})); return assert.throws(() => v.validate());}); return test("requiredPresent: 'trimmedString'", () => {let v; v = new Validator({id: ["required", "present", {fieldType: "trimmedString"}]}); assert.throws(() => [v.validate({id: 123}), "with number"]); assert.throws(() => [v.validate(), "missing"]); assert.throws(() => [v.validate({id: ""}), "id:''"]); assert.throws(() => [v.validate({id: "  "}), "id:'  '"]); return v.validate({id: "hi"});});}, declarationTypes: function() {test("fieldType: 'id'", () => {let v; v = new Validator({id: {fieldType: "id"}}); assert.throws(() => v.validate({})); v.validateUpdate({}); v.validate({id: "123"}); return assert.rejects(() => v.validate({id: 123})).then(({info}) => assert.eq(Object.keys(info.errors), ["id"]));}); test("validate: ->", () => {let v; v = new Validator({id: {validate: (v) => isString(v)}}); v.validate({}); v.validateUpdate({}); v.validate({id: "123"}); return assert.rejects(() => v.validate({id: 123})).then(({info}) => assert.eq(info.errors, {id: "invalid"}));}); test("preprocess: ->", () => {let v, id; v = new Validator({id: {preprocess: (v) => `${Caf.toString(v)}a`}}); ({id} = v.validateUpdate({id: "123"})); assert.eq(id, "123a"); ({id} = v.validateUpdate({id: 456})); return assert.eq(id, "456a");}); test("present: true", () => {let v; v = new Validator({id: {present: true}}); v.validate({id: "123"}); v.validateUpdate({}); assert.throws(() => v.validate({id: ""})); assert.throws(() => v.validate({id: null})); assert.throws(() => v.validate({id: undefined})); assert.throws(() => v.validateUpdate({id: ""})); assert.throws(() => v.validateUpdate({id: null})); assert.throws(() => v.validateUpdate({id: undefined})); assert.throws(() => v.validate({id: false})); assert.throws(() => v.validateUpdate({id: false})); v.validate({id: 123}); v.validate({id: "abc"}); v.validateUpdate({id: 123}); return v.validateUpdate({id: "abc"});}); test("required: true", () => {let v; v = new Validator({id: {required: true}}); v.validate({id: 123}); v.validateUpdate({}); assert.throws(() => v.validate({})); assert.throws(() => v.validate({id: undefined})); assert.throws(() => v.validateUpdate({id: null})); assert.throws(() => v.validateUpdate({id: undefined})); return assert.rejects(() => v.validate({id: null})).then(({info}) => {log({info}); return assert.eq(info.errors, {id: "missing"});}).then(() => assert.rejects(() => v.validate({id: undefined}))).then(({info}) => assert.eq(info.errors, {id: "missing"}));}); return test("instanceof: Foo", () => {let Foo, Bar, v; Foo = Caf.defClass(class Foo extends Object {}); Bar = Caf.defClass(class Bar extends Foo {}); v = new Validator({foo: {instanceof: Foo}}); Promise.resolve(); v.validate({foo: new Foo}); v.validate({foo: new Bar}); v.validate({foo: null}); return assert.rejects(() => v.validate({foo: {}})).then(({info}) => assert.eq(info.errors, {foo: "invalid"}));});}, compoundTests: function() {return test("'required', validate: ->", () => {let v; v = new Validator({foo: ["required", {validate: (v) => v.match(RegExp(`^email\\:${Caf.toString(findEmailRegexp.source)}\$`))}]}); assert.throws(() => v.validate({id: 123})); assert.throws(() => v.validate({foo: "test@test.com"})); assert.throws(() => v.validate({foo: "email:metest"})); return assert.rejects(() => v.validate({foo: "email:me"})).then(({info}) => assert.eq(info.errors, {foo: "invalid"})).then(() => assert.rejects(() => v.validateUpdate({foo: "email:me"}))).then(({info, stack}) => assert.eq(info.errors, {foo: "invalid"})).then(() => v.validateUpdate());});}, customFieldTypes: function() {return test("accepts custom fields", () => {let v, customFieldTypes; v = new Validator({myField: "myCustomFieldType"}, {customFieldTypes: customFieldTypes = {myCustomFieldType: "string"}}); assert.eq(v.customFieldTypes, customFieldTypes); assert.eq(v.fields, {myField: merge(normalizeFieldProps("string"), {fieldType: "myCustomFieldType"})}); v.validate({myField: "aString"}); return assert.throws(() => v.validate({myField: 123}));});}});});});
//# sourceMappingURL=Validator.test.js.map