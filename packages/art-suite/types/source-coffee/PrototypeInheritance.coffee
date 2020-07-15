{Object, Function} = global
{isClass} = require("./BuiltInTypes")
_functionsPrototype = Object.getPrototypeOf ->

isExtendedClass = (obj) -> !!getSuperclass obj
isDirectPrototypeOf = isDirectPrototypeOf = (obj, prototype) -> !isClass(obj) and prototype.constructor == obj.constructor

### getSuperClass
  Must support CoffeeScript 1.x and ES6 style inheritance
###
getSuperclass = (klass) ->
  if isClass klass
    # __super__: CoffeeScript v1.x support
    getSuper(klass) || klass.__super__?.constructor

### getSuper
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
###
getSuper = (obj) ->
  throw new Error "getSuper expecting an object" unless obj? && ((typeof obj == "object") || (typeof obj == "function"))
  _super = Object.getPrototypeOf obj
  if isDirectPrototypeOf obj, _super
    Object.getPrototypeOf _super
  else _super

module.exports = {isExtendedClass, getSuperClass, getSuper, isDirectPrototypeOf}

