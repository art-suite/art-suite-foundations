let { isString, isNumber, isPlainObject, isArray } = global

let
  isJsonAtomicType = function (obj) { return obj === null || obj === true || obj === false || isNumber(obj) || isString(obj); },
  isJsonType = function (obj) { return isJsonAtomicType(obj) || isPlainObject(obj) || isArray(obj); };

module.exports = { isJsonAtomicType, isJsonType };
