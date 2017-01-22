module.exports = class Types
  @isPromise: (obj) => isFunction obj?.then
  @isRegExp: (obj) => obj instanceof RegExp
  @isNumber: isNumber = (obj) => typeof obj == "number"

  # tests for all built-in array-like types
  ###
  Maybe we should just the API for array compatibility rather than specific types.
    typeof obj == "object" &&
      && isFunction obj.forEach
      && isFunction obj.indexOf
      && isNumber obj.length
  ###
  # TODO: depricate; possibly rename to isArrayLike - but probably change it's tests to Duck-typing tests
  @isArray: isArray =
    if self.Uint8ClampedArray
      (obj) -> !!obj && (
        obj.constructor == Array ||
        obj instanceof Uint8ClampedArray ||
        obj instanceof Int8Array     ||
        obj instanceof Uint8Array    ||
        obj instanceof Int16Array    ||
        obj instanceof Uint16Array   ||
        obj instanceof Int32Array    ||
        obj instanceof Uint32Array   ||
        obj instanceof Float32Array  ||
        obj instanceof Float64Array
      )
    else
      # IE 11 compatible
      (obj) -> !!obj && (
        obj.constructor == Array ||
        # obj instanceof Uint8ClampedArray ||
        obj instanceof Int8Array     ||
        obj instanceof Uint8Array    ||
        obj instanceof Int16Array    ||
        obj instanceof Uint16Array   ||
        obj instanceof Int32Array    ||
        obj instanceof Uint32Array   ||
        obj instanceof Float32Array  ||
        obj instanceof Float64Array
      )

  @isDate: (obj) => obj && obj.constructor == Date
  @isString: isString = (obj) => typeof obj == "string"
  @isFunction: isFunction = (obj) => typeof obj == "function"
  @isEmptyObject: (obj) => Object.keys(obj).length == 0
  @isBoolean: (obj) => obj == true || obj == false
  @isClass: isClass = (obj) =>
    !! (
      typeof obj is "function" && (
        # any CoffeeScript class which inherits from another has __super__
        (typeof obj.__super__ is "object") ||
        # We can't easily detect CoffeeScript classes which don't inherit since they are just Functions
        # so we do this surrogate test:
        (hasOwnProperties obj) ||
        (obj.prototype && hasProperties obj.prototype)
      )
    )

  @isJsonAtomicType: isJsonAtomicType = (a) -> isString(a) || isNumber(a) || a == true || a == false || a == null
  @isJsonType: (a) -> isJsonAtomicType(a) || isPlainObject(a) || isPlainArray(a)

  @isObject: isObject = (obj) =>
    !!obj && typeof obj == "object" && !isPlainArray obj

  # cross-iFrame friendly
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  # IE9+ supported, so we'll just use it directly.
  @isPlainArray:  isPlainArray  = Array.isArray

  # cross-iFrame friendly
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
  #   valid in IE9+, so I think we can safely use it.
  # another common name for this is: isObjectLiteral or isPojo
  # I like isObjectLiteral, except it should return true for "new Object" - which isn't strictly an object-literal
  # I don't like isPojo (plain-old-javascript-object)
  # - which is just redundent (we're in Javascript, all objects are javascript objects)
  # - and obscure
  # I think I'll stick with isPlainObject - even though I plan to set isArray == isPlainArray and add isArrayLike
  @isPlainObject: isPlainObject = (v) -> !!v && null == Object.getPrototypeOf Object.getPrototypeOf v

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


