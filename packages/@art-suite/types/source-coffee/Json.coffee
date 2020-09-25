{isString, isNumber, isPlainObject, isArray} = global

isJsonAtomicType  = (obj) -> obj == null || obj == true || obj == false || isNumber(obj) || isString(obj)
isJsonType        = (obj) -> isJsonAtomicType(obj) || isPlainObject(obj) || isArray(obj)

module.exports = {isJsonAtomicType, isJsonType}