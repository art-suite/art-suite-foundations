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

let mutuallyExclusiveTestObjects = [
  [null],
  [undefined],
  ["0",                 isNumber],
  ["1",                 isNumber],
  ["({})",              isPlainObject],
  ["[]",                isArray],
  ["/./",               isRegExp],
  ["''",                isString],
  ["'1'",               isString],
  ["true",              isBoolean],
  ["false",             isBoolean],
  ["(() => 0)",         isFunction],
  ["(function(){})",    isFunction],
  ["new Date()",        isDate],
  ["Promise.resolve()", isPromise],
];

let mutuallyExclusiveTestFunctions = {
  isNumber,
  isPlainObject,
  isArray,
  isString,
  isBoolean,
  isDate,
  isPromise,
  isFunction
};

suite("mutually exclusive types", () => {
  for (fName in mutuallyExclusiveTestFunctions) {
    let suiteTestFunction = mutuallyExclusiveTestFunctions[fName];
    suite(fName, () => {
      mutuallyExclusiveTestObjects.map(([testObjectJs, testFunction]) => {
        let shouldBe = testFunction === suiteTestFunction;
        test(`${shouldBe} === ${fName}(${testObjectJs})`, () => {
          assert.equal(
            suiteTestFunction(eval(testObjectJs)),
            shouldBe
          );
        })
      })
    })
  }
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
