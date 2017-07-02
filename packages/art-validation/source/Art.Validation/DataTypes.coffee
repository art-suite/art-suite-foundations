{
  isBoolean
  isNumber
  isString
  isPlainObject
  isPlainArray
  isFunction
  isDate
} = require 'art-standard-lib'

module.exports =
  ###
  @dataTypes only includes the Standard Json types:
    except 'null':
      no field has the type of 'null'
      instead, it has some other type and can be 'null' unless it is 'required'
  ###
  boolean:    validate: (a) -> isBoolean a
  number:     validate: (a) -> isNumber a
  string:     validate: (a) -> isString a
  object:     validate: (a) -> isPlainObject a
  array:      validate: (a) -> isPlainArray a
  function:   validate: (a) -> isFunction a
  date:       validate: (a) -> isDate a

  booleanDataType:  "boolean"
  numberDataType:   "number"
  stringDataType:   "string"
  objectDataType:   "object"
  arrayDataType:    "array"
  functionDataType: "function"
  dateDataType:     "date"
