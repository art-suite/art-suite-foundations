{
  isBoolean
  isNumber
  isString
  isPlainObject
  isPlainArray
  isFunction
  isDate
  isJsonType
  merge
  object
} = require 'art-standard-lib'


###
@dataTypes only includes the Standard Json types:
  except 'null':
    no field has the type of 'null'
    instead, it has some other type and can be 'null' unless it is 'required'
###
base =
  boolean:    validate: isBoolean
  number:     validate: isNumber
  string:     validate: isString
  object:     validate: isPlainObject
  array:      validate: isPlainArray
  function:   validate: isFunction
  date:       validate: isDate
  json:       validate: isJsonType
  any:        {}

module.exports = merge base,
  # for every dataType, declare: booleanDataType: 'boolean'
  object base,
    key: (v, k) -> "#{k}DataType"
    with: (v, k) -> k
