let {assert} = require("chai");
let {
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayIterable,
  isArrayUniversal,
  isBoolean,
  isClass,
  isDate,
  isEmptyObject,
  isError,
  isFunction,
  isNumber,
  isObject,
  isPlainArray,
  isPlainObject,
  isPromise,
  isRegExp,
  isString,
  isTypedArray
} = require("../source");


suite("isPromise", () => {
  test("isPromise Promise.resolve()", () => {
    assert.isTrue(isPromise(Promise.resolve()));
  });
  test("isPromise Promise.reject()", () => {
    let p = Promise.reject()
    assert.isTrue(isPromise(p));
    p.catch(() => { });
  });
  test("isPromise 1 is false", () => {
    assert.isFalse(isPromise(1));
  });
  test("isPromise '' is false", () => {
    assert.isFalse(isPromise(''));
  });
  test("isPromise {} is false", () => {
    assert.isFalse(isPromise({}));
  });
  return test("isPromise Promise is false", () => {
    assert.isFalse(isPromise(Promise));
  });
});

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

suite("isString", () => {
  test("isString 'foo' is true", () => {
    assert.isTrue(isString("foo"));
    assert.isTrue(isString(''));
  });
  return test("isString - non strings are false", () => {
    assert.isFalse(isString());
    assert.isFalse(isString(null));
    assert.isFalse(isString(void 0));
    assert.isFalse(isString(123));
    assert.isFalse(isString({}));
    assert.isFalse(isString([]));
    assert.isFalse(isString(() => { }));
  });
});

suite("isPlainArray", () => {
  test("isPlainArray is isArray", () => assert.equal(isPlainArray, isArray));

  test("isPlainArray []", () => assert.isTrue(isPlainArray([])));

  return test("isPlainArray - false values", () => {
    assert.isFalse(isPlainArray({}));
    assert.isFalse(isPlainArray(123));
    assert.isFalse(isPlainArray(""));
    assert.isFalse(isPlainArray("abc"));
    assert.isFalse(isPlainArray(new Int8Array(4)));
    assert.isFalse(isPlainArray(false));
    assert.isFalse(isPlainArray(null));
    assert.isFalse(isPlainArray(void 0));
  });
});

suite("isFunction", () => {
  test("isFunction(->) is true", () => {
    assert.isTrue(isFunction(() => { }));
  });
  test("isFunction(class Foo) is true", () => {
    var Foo;
    assert.isTrue(isFunction(Foo = (() => {
      function Foo() { }

      return Foo;

    })()));
  });

  return test("isFunction - non functions are false", () => {
    assert.isFalse(isFunction());
    assert.isFalse(isFunction(null));
    assert.isFalse(isFunction(''));
    assert.isFalse(isFunction(void 0));
    assert.isFalse(isFunction(123));
    assert.isFalse(isFunction({}));
    assert.isFalse(isFunction([]));
    assert.isFalse(isFunction("foo"));
  });
});

suite("isDate", () => {
  test("isDate new Date is true", () => {
    assert.isTrue(isDate(new Date));
  });
  test("isDate '' is false", () => {
    assert.isFalse(isDate(""));
  });
  return test("isDate '07-04-2018' is false", () => {
    assert.isFalse(isDate("07-04-2018"));
  });
});

suite("isPlainObject", () => {
  test("isPlainObject {} is true", () => {
    assert.isTrue(isPlainObject({}));
  });
  test("isPlainObject(new class Foo) is false", () => {
    assert.isFalse(isPlainObject(new class Foo {}));
  });
  return test("isPlainObject - non plain objects are false", () => {
    assert.isFalse(isPlainObject());
    assert.isFalse(isPlainObject(null));
    assert.isFalse(isPlainObject(void 0));
    assert.isFalse(isPlainObject(123));
    assert.isFalse(isPlainObject("foo"));
    assert.isFalse(isPlainObject(""));
    assert.isFalse(isPlainObject([]));
    assert.isFalse(isPlainObject(() => { }));
  });
});

suite("isArguments", () => {
  test("actual args", () => {
    assert.isTrue(isArguments((() => {
      return arguments;
    })()));
  });
  test("just array", () => {
    assert.isFalse(isArguments([]));
  });
  test("quacks-like-a-duck-args", () => {
    assert.isFalse(isArguments({
      length: 0,
      callee: () => { }
    }));
  });
  test("null", () => {
    assert.isFalse(isArguments(null));
  });
  return test("1", () => {
    assert.isFalse(isArguments(1));
  });
});

suite("isObject", () => {
  test("isObject {} is true", () => {
    assert.isTrue(isObject({}));
  });
  test("isObject new class Foo is true", () => {
    var Foo;
    assert.isTrue(isObject(new (Foo = (() => {
      function Foo() { }

      return Foo;

    })())));
  });
  test("isObject class Foo is false", () => {
    var Foo;
    assert.isFalse(isObject(Foo = (() => {
      function Foo() { }

      return Foo;

    })()));
  });
  test("isObject [] is false", () => {
    assert.isFalse(isObject([]));
  });
  test("isObject null is false", () => {
    assert.isFalse(isObject(null));
  });
  test("isObject -> is false", () => {
    assert.isFalse(isObject(() => { }));
  });
  return test("isObject - non objects are false", () => {
    assert.isFalse(isObject());
    assert.isFalse(isObject(void 0));
    assert.isFalse(isObject(123));
    assert.isFalse(isObject(''));
    assert.isFalse(isObject("foo"));
  });
});
