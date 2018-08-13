{
  isString
  isNumber
  isDate
  isHexColor
  toMilliseconds
  toDate
  toSeconds
  toLowerCase
  emailRegexp
  urlRegexp
  log
} = require 'art-standard-lib'
{
  booleanDataType
  numberDataType
  stringDataType
  objectDataType
  arrayDataType
  functionDataType
  dateDataType
  anyDataType
  jsonDataType
} = DataTypes = require './DataTypes'

{validStatus} = require 'art-communication-status'
isId = (v) -> isString(v) && v.match ///^[-_a-z0-9]{1,100}$///i
isHexColor = (v) -> (/^#([a-f0-9]{3})|([a-f0-9]{6})/i).test "#{v}"

###
standard FieldType props:
  validate: (v) -> true/false
  preprocess: (v1) -> v2
  required: true/false
  dataType: one of @DataTypes, default: 'string'

You can add your own, too, but they are ignored by this class.
###
# fieldTypes are just easy, pre-defined Objects with the right properties:
# Usage:
#   This:           @fields webPage: @fieldTypes.id
#   is the same as: @fields webPage: validate: (v) -> isId v
#   and this:       @fields webPage: fieldType: "id"
module.exports = FieldTypes =
  boolean:  dataType: booleanDataType
  number:   dataType: numberDataType
  string:   dataType: stringDataType
  object:   dataType: objectDataType
  array:    dataType: arrayDataType
  any:      dataType: anyDataType
  json:     dataType: jsonDataType

  count:    dataType: numberDataType, default: 0

  id:
    required: true
    validate: (v) -> isId v

  date:
    validate:   (v) -> isString(v) || (v instanceof Date)
    preprocess: (v) -> if isString(v) then new Date v else v
    dataType: dateDataType

  timestamp: # milliseconds since 1970; to get the current timestamp: Date.now()
    dataType: numberDataType
    validate:   (v) -> isNumber(v) || isDate v
    preprocess: toMilliseconds
    decode: toDate

  secondsTimestamp: # seconds since 1970; to get the current timestamp: Date.now()/1000
    dataType: numberDataType
    validate:   (v) -> isNumber(v) || isDate v
    preprocess: (v) -> log toSeconds(v) + .5 | 0
    decode: toDate

  color:
    validate:   (v) -> isHexColor v
    preprocess: (v) -> "#{v}"

  email:
    validate: (v) -> isString(v) && v.trim().match emailRegexp
    preprocess: (v) -> v.trim().toLowerCase()

  url:
    validate: (v) -> isString(v) && v.match urlRegexp
    preprocess: (v) -> normalizeUrl v # downcase protocol and domain name

  communicationStatus:
    validate: (v) -> validStatus v

  trimmedString:
    validate: (v) -> isString v
    preprocess: (v) ->
      v = v.trim()
      v.length > 0 && v
    maxLength: 1024 # a reasonable upper cap; can be overridden

  function:
    dataType: functionDataType


# apply defaults
for k, v of FieldTypes
  v.fieldType = k
  v.dataType ||= stringDataType
  v.validate ||= DataTypes[v.dataType].validate
