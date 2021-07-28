
###
Set: global.ArtStandardLibMultipleContextTypeSupport = true
Before the first time you require this file if you need to be able to test objects
from multiple contexts.

When do you need this?
  - when working with iFrames
  - when working with Node's 'repl' or 'vm'

What is the differences?
  With: slower, but other-wise the same
  Without: plain-arrays and plain-objects from other contexts
    are not detected with isArray, isPlainArray, isPlainObject
###
{ArtStandardLibMultipleContextTypeSupport} = global

module.exports = class Types
  @isPromise: (obj) => obj? && isFunction(obj.then) && !isFunction obj
  @isRegExp:  if ArtStandardLibMultipleContextTypeSupport
      (obj) => obj.constructor.name == "RegExp"
    else
      (obj) => obj.constructor == RegExp
  @isNumber: isNumber = (obj) => typeof obj == "number"

  isNonNegativeInt: (x) ->
    ((x | 0) == x) &&
     x >= 0

  @isError:                   (obj) => obj? && obj instanceof Error
  @isDate:                    (obj) => obj?.constructor == Date
  @isString: isString =       (obj) => typeof obj == "string"
  @isFunction: isFunction =   (obj) => typeof obj == "function"
  @isEmptyObject:             (obj) => Object.keys(obj).length == 0
  @isBoolean:                 (obj) => obj == true || obj == false

  @isArrayBuffer: isArrayBuffer = if global.ArrayBuffer
      (obj) -> obj? && obj.constructor == ArrayBuffer
    else -> false
  @isTypedArray: (obj) -> obj? && obj.length >= 0 &&  obj.length == (obj.length | 0) && isArrayBuffer obj.buffer

  _functionsPrototype = Object.getPrototypeOf ->
  # @getSuperclass: getSuperclass = (klass) ->
  #   (typeof (prototype = Object.getPrototypeOf klass) is "function") &&
  #   (prototype != _functionsPrototype) &&
  #   prototype

  @getSuperclass: getSuperclass = (klass) ->
    if isFunction klass
      if (superclass = Object.getPrototypeOf klass)? && superclass != _functionsPrototype
        superclass
      else
        klass.__super__?.constructor

      # # CoffeeScript 1.x inheritance
      # superclass = if (s = klass.__super__) && Object.hasOwnProperty("__super__") ?.constructor

      # # ES6 inheritance
      # superclass ?= Object.getPrototypeOf klass

      # if isFunction(superclass) && superclass != _functionsPrototype
      #   superclass

  ###
  NAME: isClass
  IN: obj:anything
  OUT: boolean

  Classes are Functions in JavaScript, and there is no built-in way to tell
  the differences even though, as-of ES6, there actually is a difference.

  WARNING #1: This function cannot reliably detect a class which doesn't extend another.

  TRUE-POSITIVES:
    100% true if obj is an extended class
    probably-true if obj is a function AND
      obj has enumerable properties or
      obj's prototype has enumerable properties

  FALSE-POSITIVES:
    If you passed in a function with one or more manually set, enumerable properties.

  FALSE-NEGATIVES:
    If you passed in a 'class' with no enumerable prototype properties and no enumerable
    static/class properties.

  WARNING #2:
    Static/class methods declared with ES6 class syntax ARE NOT ENUMERABLE (face-palm).
    Therefor, in this case, FALSE-NEGATIVES are possible even if you have class methods.

    It's just too costly to check for non-enumerable methods.

  RECOMENDAION:
    To make your classes reliabily detectable: ALWAYS extend something.
    If you aren't extending anything else, extend Object.
    This is what CaffeineScript does.

  WHY hasOwnProperties for obj and hasProperties for obj.prototype???
    hasProperties is faster
    hasOwnProperties because _functionsPrototype actuall has getName added to it
    already by NeptuneNamespaces to normalize getting the name of things.
    I could probably make that a non-enumerable...
  ###
  @isClass: isClass =
    (obj) =>
      if getSuperclass obj then true
      else if isFunction(obj) && ((hasOwnProperties obj) || hasProperties obj.prototype)
        ###
        HACK:
          If obj is a function and has properties or its prototype has properties
          it's a non-standard function,
          and therefor it's -probably- a class
        ###
        true

      else false

  oldIsClass =
    (obj) =>
      !!(
        typeof obj is "function" && (
          # CoffeeScript extending class
          (typeof obj.__super__ is "object") ||

          # Correctly detects any CaffeineScript class AND
          # Any ES6/CoffeeScript2 class with an 'extends' clause
          (getSuperclass obj) ||

          # NOTE! Static/Class methods which are declared INSIDE an ES6 class definition are no enumerable! In other words,
          # The following 'hasOwnProperties' hack doesn't work with clases declared this way. This includes normla ES6 and CoffeeScript v2 classes!
          #     Of course, CaffeineScript gets it right - class-methods SHOULD be enumerable.
          #     But, CaffeineScript doesn't rely on this hack anyway... (See above)
          # We can't easily detect CoffeeScript or ES6 classes which don't extend another since they are just functions
          # HACK: if its a function with own-properties, its not a plain function, probably a class
          (hasOwnProperties obj) ||

          # HACK: if its a function and its prototype as own-properties, its not a plain function, probably a class
          (obj.prototype? && hasProperties obj.prototype)
        )
      )

  @isExtendedClass: isExtendedClass = (obj) => !!getSuperclass obj


  # https://jsperf.com/is-array-sbd
  # correct: Array.isArray
  # 3x-8x faster: (o) => o.constructor == Array
  @isArrayUniversal: Array.isArray
  @isArray: isArray = # if ArtStandardLibMultipleContextTypeSupport
    @isArrayUniversal
  # else
  #   (o) => o? && isNumber(o.length) && o.constructor == Array

  @isArguments: (o) ->
    o? &&
    typeof o.length == "number" &&
    o.toString() == '[object Arguments]'

  # cross-iFrame friendly
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  # IE9+ supported, so we'll just use it directly.
  @isPlainArray:  isArray

  @isNonNegativeInt: isNonNegativeInt = (x) -> x? && x >= 0
  @isArrayIterable: (source) -> source? && isNonNegativeInt source.length

  @isJsonAtomicType: isJsonAtomicType = (a) -> isString(a) || isNumber(a) || a == true || a == false || a == null
  @isJsonType: (a) -> isJsonAtomicType(a) || isPlainObject(a) || isArray(a)

  @isObject: isObject = (obj) =>
    obj? && typeof obj == "object" && !isArray obj

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
  @isPlainObjectUniversal: (v) -> v? && null == Object.getPrototypeOf Object.getPrototypeOf v

  @isPlainObject: isPlainObject = if ArtStandardLibMultipleContextTypeSupport
    @isPlainObjectUniversal
  else
    (v) -> v? && v.constructor == Object


  ############################
  # helpers
  ############################
  # hasKeys
  @hasProperties: hasProperties = (o) ->
    return false unless o?
    return true for k of o
    false

  @hasOwnProperties: hasOwnProperties = (o) ->
    return false unless o?
    return true for k of o when o.hasOwnProperty k
    false


