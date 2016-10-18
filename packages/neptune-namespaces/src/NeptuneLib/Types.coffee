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

  @isPlainArray:  isPlainArray  = (v) -> if v then v.constructor == Array  else false
  @isPlainObject: isPlainObject = (v) -> if v then v.constructor == Object else false

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


