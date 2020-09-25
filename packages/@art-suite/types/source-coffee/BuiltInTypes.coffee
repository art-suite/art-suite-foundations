# if ArrayBuffer is not defined (as in NodeJs) this will just be undefined and nothing will return true for isArrayBuffer
{Array, ArrayBuffer, Date, RegExp, Object, Function} = global

isArguments   = (obj) -> obj? && typeof obj.length == "number" && obj.toString() == '[object Arguments]'
isArray       = Array.isArray
isBoolean     = (obj) -> obj == true || obj == false
isNumber      = (obj) -> typeof obj == "number"
isObject      = (obj) -> obj? && typeof obj == "object" && !isArray obj
isPromise     = (obj) -> obj? && isFunction(obj.then) && !isFunction obj
isString      = (obj) -> typeof obj == "string"
isTypedArray  = (obj) -> obj?.length >= 0 && obj.length == (obj.length | 0) && isArrayBuffer obj.buffer

# Legacy
isArrayUniversal  =
isPlainArray      = isArray
isPlainObjectUniversal = (v) -> v? && null == Object.getPrototypeOf Object.getPrototypeOf v

if ArtSuiteTypesMultiContextSupport
  isFunction    = (obj) -> (typeof obj == "function") && obj.constructor.name == "Function"
  isClass       = (obj) -> (typeof obj == "function") && obj.constructor.name != Function
  isError       = (obj) -> obj instanceof Error || obj?.constructor.name == "Error"
  isArrayBuffer = (obj) -> obj?.constructor.name == "ArrayBuffer"
  isDate        = (obj) -> obj?.constructor.name == "Date"
  isRegExp      = (obj) -> obj?.constructor.name == "RegExp"
  isPlainObject = isPlainObjectUniversal

else
  isFunction    = (obj) -> (typeof obj == "function") && obj.constructor == Function
  isClass       = (obj) -> (typeof obj == "function") && obj.constructor != Function
  isError       = (obj) -> obj instanceof Error
  isArrayBuffer = (obj) -> obj?.constructor == ArrayBuffer
  isDate        = (obj) -> obj?.constructor == Date
  isRegExp      = (obj) -> obj?.constructor == RegExp
  isPlainObject = (obj) -> obj?.constructor == Object

module.exports = {
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayBuffer,
  isArrayUniversal,
  isBoolean,
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
  isTypedArray,
}
