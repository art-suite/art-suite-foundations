let { Object } = global;
let { isFunction } = require("./BuiltInTypes");
let { hasOwnProperties, hasProperties } = require("./MiscTypes");

_functionsPrototype = Object.getPrototypeOf(() => null);
/* getSuperClass
Must support CoffeeScript 1.x and ES6 style inheritance
*/
let getSuperclass = (klass) => {
  if (isFunction(klass)) {
    let __super__, superclass = Object.getPrototypeOf(klass);
    return (superclass != null && superclass !== _functionsPrototype) ?
      superclass :
      (__super__ = klass.__super__) != null ? __super__.constructor : void 0;
  }
}

let isExtendedClass = (obj) => !!getSuperclass(obj);
let isDirectPrototypeOf = (obj, prototype) => !isClass(obj) && prototype.constructor === obj.constructor;

/* getSuper
  getSuper works for:
    ES6 classes and instances (which implies it works for CaffeineScript, CoffeeScript 2.x)
    CoffeeScript 1.x instances

  getSuper does NOT work for:
    CoffeeScript 1.x classes

  All about getSuper in ES6 land:

    Given:
      class A
      class B extends A
      class C extends B

      a = new A
      b = new B
      c = new C

    Guarantees:
      getSuper(B) == A
      getSuper(C) == B

      getSuper(A.prototype) == Object.prototype
      getSuper(B.prototype) == A.prototype
      getSuper(C.prototype) == B.prototype

      getSuper(b) == A.prototype
      getSuper(c) == B.prototype

  prototype map:

  KEY:
    <->
        <-- .constructor
        --> .prototype
    ^  Object.getPrototypeOf

  MAP:
    A <-> aPrototype

    ^     ^     ^
    |     |     a
    |     |

    B <-> bPrototype

    ^     ^     ^
    |     |     b
    |     |

    C <-> cPrototype

                ^
                c

  Definition of super:

    if instance then prototype's prototype
    else prototype
  */
let getSuper = (obj) => {
  if (!((obj != null) && ((typeof obj === "object") || (typeof obj === "function")))) {
    throw new Error("getSuper expecting an object");
  }

  let _super = Object.getPrototypeOf(obj);
  if (isDirectPrototypeOf(obj, _super)) {
    return Object.getPrototypeOf(_super);
  } else {
    return _super;
  }
};

let isClass = function (obj) {
  if (getSuperclass(obj)) {
    return true;
  } else if (isFunction(obj) && ((hasOwnProperties(obj)) || hasProperties(obj.prototype))) {

    /*
    HACK:
      If obj is a function and has properties or its prototype has properties
      it's a non-standard function,
      and therefor it's -probably- a class
     */
    return true;
  } else {
    return false;
  }
}

module.exports = { isClass, isExtendedClass, getSuperclass, getSuper, isDirectPrototypeOf };
