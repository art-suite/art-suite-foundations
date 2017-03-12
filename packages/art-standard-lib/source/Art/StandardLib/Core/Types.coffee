module.exports = class Types
  @isPromise: (obj) => isFunction obj?.then
  @isRegExp: (obj) => obj instanceof RegExp
  @isNumber: isNumber = (obj) => typeof obj == "number"

  isNonNegativeInt: (x) ->
    ((x | 0) == x) &&
     x >= 0

  @isDate: (obj) => obj && obj.constructor == Date
  @isString: isString = (obj) => typeof obj == "string"
  @isFunction: isFunction = (obj) => typeof obj == "function"
  @isEmptyObject: (obj) => Object.keys(obj).length == 0
  @isBoolean: (obj) => obj == true || obj == false

  # NOTE: cannot detect a class which doesn't extend another
  _functionsPrototype = Object.getPrototypeOf ->
  @isClass: isClass =
    (obj) =>
      !!(
        typeof obj is "function" && (
          # CoffeeScript extending class
          (typeof obj.__super__ is "object") ||

          # ES6 extending class
          (
            (typeof (prototype = Object.getPrototypeOf obj) is "function") &&
            prototype != _functionsPrototype
          ) ||

          # We can't easily detect CoffeeScript or ES6 classes which don't extend another since they are just functions
          # HACK: if its a function with own-properties, its not a plain function, probably a class
          (hasOwnProperties obj) ||

          # HACK: if its a function and its prototype as own-properties, its not a plain function, probably a class
          (obj.prototype && hasProperties obj.prototype)
        )
      )

  @isExtendedClass: isExtendedClass = (obj) =>
    !! (
      typeof obj is "function" && (
        # CoffeeScript extending class
        (typeof obj.__super__ is "object") ||

        # ES6 extending class
        ((typeof (prototype = Object.getPrototypeOf obj) is "function") && prototype != _functionsPrototype)
      )
    )

  # https://jsperf.com/is-array-sbd
  # correct: Array.isArray
  # 3x-8x faster: (o) => o.constructor == Array
  @isArray: isArray = (o) => o? && o.constructor == Array

  # cross-iFrame friendly
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  # IE9+ supported, so we'll just use it directly.
  @isPlainArray:  isArray

  @isNonNegativeInt: isNonNegativeInt = (x) -> (x | 0 == x) && x >= 0
  @isArrayIterable: (source) -> !!(source && isNonNegativeInt source.length)

  @isJsonAtomicType: isJsonAtomicType = (a) -> isString(a) || isNumber(a) || a == true || a == false || a == null
  @isJsonType: (a) -> isJsonAtomicType(a) || isPlainObject(a) || isArray(a)

  @isObject: isObject = (obj) =>
    !!obj && typeof obj == "object" && !isArray obj

  @isDirectPrototypeOf:  isDirectPrototypeOf = (o, prototype) -> !isFunction(o) and prototype.constructor == o.constructor


  ###
  NOTE:
    getSuper doesn't work in CoffeeScript classes objects, but it does on ES6 classes.
    getSuper does work on CoffeeScript class instance objects.

  All about getSuper in ES6 land:

    class A {}
    class B extends A {}
    class C extends B {}

    a = new A
    b = new B
    c = new C

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
    ^  Object.prototypeOf

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
  @getSuper: (o) ->
    throw new Error "getSuper expecting an object" unless (typeof o is "object") || (typeof o is "function")
    _super = Object.getPrototypeOf o
    _super = Object.getPrototypeOf _super if isDirectPrototypeOf o, _super
    _super



  # cross-iFrame friendly
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
  #   valid in IE9+, so I think we can safely use it.
  # another common name for this is: isObjectLiteral or isPojo
  # I like isObjectLiteral, except it should return true for "new Object" - which isn't strictly an object-literal
  # I don't like isPojo (plain-old-javascript-object)
  # - which is just redundent (we're in Javascript, all objects are javascript objects)
  # - and obscure
  # I think I'll stick with isPlainObject - even though I plan to set isArray == isPlainArray and add isArrayLike
  # PERF: https://jsperf.com/is-plain-object
  #   iFrame-friendly test: null == Object.getPrototypeOf Object.getPrototypeOf v
  #   10-70x faster: v.constructor == Object
  @isPlainObject: isPlainObject = (v) -> v? && v.constructor == Object

  ############################
  # helpers
  ############################
  # hasKeys
  @hasProperties: hasProperties = (o) ->
    return true for k of o
    false

  @hasOwnProperties: hasOwnProperties = (o) ->
    return true for k of o when o.hasOwnProperty k
    false


