let {assert} = require("chai");
let {
  isArrayIterable
} = require("../source");

suite("isArrayIterable", () => {
  test("isArrayIterable [] is true", () => {
    assert.isTrue(isArrayIterable([]));
  });
  test("isArrayIterable Int8Array is true", () => {
    assert.isTrue(isArrayIterable(new Int8Array(4)));
  });
  test("isArrayIterable arguments is true", () => {
    assert.isTrue(isArrayIterable(arguments));
  });
  test("isArrayIterable string is true", () => {
    assert.isTrue(isArrayIterable("hi"));
    assert.isTrue(isArrayIterable(''));
  });
  test("isArrayIterable {length: 10} is true", () => {
    assert.isTrue(isArrayIterable({
      length: 10
    }));
  });
  return test("isArrayIterable - non arrays are false", () => {
    assert.isFalse(isArrayIterable());
    assert.isFalse(isArrayIterable(null));
    assert.isFalse(isArrayIterable(void 0));
    assert.isFalse(isArrayIterable({}));
    assert.isFalse(isArrayIterable(123));
  });
});
