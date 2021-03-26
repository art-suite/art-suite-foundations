let { assert } = require("chai");
let { isClass } = require("../source");

suite("isClass common", () => {
  test("isClass function is false", () => {
    assert.isFalse(isClass(() => { }));
    assert.isFalse(isClass(function (a) { }));
    assert.isFalse(isClass(function (a, b) { }));
  });

  return test("isClass - non class objects are false", () => {
    assert.isFalse(isClass());
    assert.isFalse(isClass(null));
    assert.isFalse(isClass(void 0));
    assert.isFalse(isClass(123));
    assert.isFalse(isClass("foo"));
    assert.isFalse(isClass([]));
    assert.isFalse(isClass({}));
    assert.isFalse(isClass(() => { }));
  });
})