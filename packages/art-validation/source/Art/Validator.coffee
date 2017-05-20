StandardLib = require 'art-standard-lib'

{
  merge, log, BaseObject, shallowClone
  isNumber, isString, isPlainObject, isPlainArray
  Promise
  isBoolean
  formattedInspect
  present
  select
  emailRegexp
  mergeIntoUnless
  w
  isFunction
  clone
  ErrorWithInfo
  array
  object
  isDate
  pushIfNotPresent
} = StandardLib

{validStatus} = require 'art-communication-status'

###
NOTES:

  validators are evaluated before preprocessors

  preprocessors should NOT throw validation-related errors

  TODO?: We could add postValidators to allow you to validate AFTER the preprocessor...

USAGE:
  new Validator validatorFieldsProps, options

    IN:
      validatorFieldsProps:
        plain object with zero or more field-validations defined:
          fieldName: fieldProps
      options:
        exclusive: true/false
          if true, only fields listed in validatorFieldsProps are allowed.

    fieldProps:
      string or plainObject
      string: selects fieldProps from one of the standard @fieldTypes (see below)
      plainObject: (all fields are optional)

        validate: (v) -> true/false
          whenever this field is included in an update OR create operation,
            validate() must return true
          NOTE: validate is evaluated BEFORE preprocess

        preprocess: (v1) -> v2
          whenever this field is included in an update OR create operation,
            after validation succeeds,
            value = preprocess value
          NOTE: validate is evaluated BEFORE preprocess

        required: true/false/string
          if true/string
            when creating records, this field must be included
          if string
            fieldProps = merge fieldProps, fieldTypes[string]

        present: true/false
          if true
            when creating records, this field must be include and 'present' (see Art.Foundation.present)

        fieldType: string
          fieldProps = merge fieldTypes[string], fieldProps

        dataType: string
          sepecify which of the standard Json data-types this field contains
          This is not used by Validator itself, but is available for clients to reflect on field-types.
          Must be one of the values in: @dataTypes

        instanceof: class
          in addition to passing validate(), if present, the value must also be an instance of the
          specified class

EXAMPLES:
  new

###

{BaseObject} = require 'art-class-system'

isId = (v) -> isString(v) && v.match ///^[-_a-z0-9]+$///i
isHexColor = (v) -> isString(v) && v.match /^#([a-f0-9]{3})|([a-f0-9]{6})/i

module.exports = class Validator extends BaseObject

  ###
  @dataTypes only includes the Standard Json types:
    except 'null':
      no field has the type of 'null'
      instead, it has some other type and can be 'null' unless it is 'required'
  ###
  @dataTypes: dataTypes =
    boolean:    validate: (a) -> isBoolean a
    number:     validate: (a) -> isNumber a
    string:     validate: (a) -> isString a
    object:     validate: (a) -> isPlainObject a
    array:      validate: (a) -> isPlainArray a
    function:   validate: (a) -> isFunction a
    date:       validate: (a) -> isDate a

  booleanDataType   = "boolean"
  numberDataType    = "number"
  stringDataType    = "string"
  objectDataType    = "object"
  arrayDataType     = "array"
  functionDataType  = "function"
  dateDataType      = "date"

  ###
  standard FieldType props:
    validate: (v) -> true/false
    preprocess: (v1) -> v2
    required: true/false
    dataType: one of @dataTypes, default: 'string'

  You can add your own, too, but they are ignored by this class.
  ###
  # fieldTypes are just easy, pre-defined Objects with the right properties:
  # Usage:
  #   This:           @fields webPage: @fieldTypes.id
  #   is the same as: @fields webPage: validate: (v) -> isId v
  #   and this:       @fields webPage: fieldType: "id"
  @fieldTypes: fieldTypes =
    boolean:  dataType: booleanDataType
    number:   dataType: numberDataType
    string:   {}
    object:   dataType: objectDataType
    array:    dataType: arrayDataType

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
      preprocess: (v) -> if isNumber then v else v - 0

    color:
      validate: (v) -> isHexColor v

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
      preprocess: (v) -> v.trim()

    function:
      dataType: functionDataType

  # apply defaults
  for k, v of fieldTypes
    v.fieldType = k
    v.dataType ||= stringDataType
    v.validate ||= dataTypes[v.dataType].validate

  normalizeInstanceOfProp = (ft) ->
    if _instanceof = ft.instanceof
      {validate} = ft
      merge ft,
        validate: (v) ->
          (v instanceof _instanceof) &&
          (!validate || validate v)
    else
      ft

  normalizePlainObjectProps = (ft) ->
    out = null
    for k, v of ft
      if isPlainObject subObject = v
        out = shallowClone ft unless out
        out[k] = true
        mergeIntoUnless out, normalizePlainObjectProps subObject
    out || ft

  normalizeDepricatedProps = (ft) ->
    if ft.requiredPresent
      throw new Error "DEPRICATED: requiredPresent. Use: present: true"
    if isString ft.required
      throw new Error "DEPRICATED: required can no longer specifiy the field-type. Use: required: fieldType: myFieldTypeString OR 'required myFieldTypeString'"
    if isString ft.present
      throw new Error "DEPRICATED: present can no longer specifiy the field-type. Use: present: fieldType: myFieldTypeString OR 'present myFieldTypeString'"
    ft

  normalizeFieldTypeProp = (ft) ->
    if ft.fieldType
      merge normalizeFieldProps(ft.fieldType), ft
    else
      ft

  @normalizeFields: (fields) ->
    object fields, normalizeFieldProps

  @normalizeFieldProps: normalizeFieldProps = (ft) ->
    ft = if isPlainObject ft

      normalizeFieldTypeProp normalizeInstanceOfProp normalizeDepricatedProps normalizePlainObjectProps ft

    else if isPlainArray ftArray = ft
      processed = for ft in ftArray
        normalizeFieldProps ft
      merge processed...

    else if isString strings = ft
      ft = {}
      for string in w strings
        if subFt = fieldTypes[string]
          ft.fieldType = string
          mergeIntoUnless ft, subFt
        else
          ft[string] = true
      ft

    else
      throw new Error "fieldType must be a string or plainObject. Was: #{formattedInspect ft}"

    merge fieldTypes[ft.fieldType], ft

  constructor: (fieldDeclarationMap, options) ->
    @_fieldProps = {}
    @_requiredFields = []
    @addFields fieldDeclarationMap
    if options
      {@exclusive, @context} = options

  @property "exclusive"

  addFields: (fieldDeclarationMap) ->
    for field, fieldOptions of fieldDeclarationMap
      fieldOptions = @_addField field, fieldOptions
      if fieldOptions.required || fieldOptions.present
        pushIfNotPresent @_requiredFields, field
    null

  @getter
    inspectedObjects: ->
      Validator: @_fieldProps


  ###
  IN:
    fields: object with fields to validate OR Promise returning said object

  OUT:
    promise.then (validatedPreprocessedFields) ->
    .catch (validationFailureInfoObject) ->
  ###
  preCreate: preCreate = (fields, options) -> Promise.resolve(fields).then (fields) => @preCreateSync fields, options
  validate: preCreate


  ###
  IN:
    fields: object with fields to validate OR Promise returning said object

  OUT:
    promise.then (validatedPreprocessedFields) ->
    .catch (validationFailureInfoObject) ->
  ###
  preUpdate: (fields, options) -> Promise.resolve(fields).then (fields) => @preUpdateSync fields, options

  ###
  IN:
    fields: - the object to check
    options:
      context: string - included in validation errors for reference
      logErrors: false - if true, will log.error errors

  OUT: preprocessed fields - if they pass, otherwise error is thrown
  ###
  preCreateSync: preCreateSync = (fields, options) ->
    if @requiredFieldsPresent(fields) && @presentFieldsValid fields
      @preprocessFields fields, true
    else @_throwError fields, options, true

  validateSync: preCreateSync

  ###
  OUT: preprocessed fields - if they pass, otherwise error is thrown
  ###
  preUpdateSync: (fields, options) ->
    if @presentFieldsValid fields
      @preprocessFields fields
    else @_throwError fields, options

  _throwError: (fields, options, forCreate) ->
    info = errors: errors = {}
    messageFields = []

    array @invalidFields(fields), messageFields, (f) ->
      errors[f] = "invalid"
      "invalid #{f}"

    forCreate && array @missingFields(fields), messageFields, (f) ->
      errors[f] = "missing"
      "missing #{f}"

    log.error Validator_preCreate_errors: {options, info} if options?.logErrors
    message = "Invalid fields for #{options?.context || @context || "Validator"} #{if forCreate then 'create' else 'update'}: #{messageFields.join ', '}"
    info.fields = fields #if options?.includeFieldsInErrors
    throw new ErrorWithInfo message, info

  ####################
  # VALIDATION CORE
  ####################
  presentFieldValid: (fields, fieldName) ->
    if fieldProps = @_fieldProps[fieldName]
      {validate} = fieldProps
      !validate || !(value = fields[fieldName])? || value == null || value == undefined || validate value, fieldName, fields
    else
      !@exclusive

  requiredFieldPresent: (fields, fieldName) ->
    return true unless fieldProps = @_fieldProps[fieldName]
    return false if fieldProps.required && !fields[fieldName]?
    return false if fieldProps.present  && !present fields[fieldName]
    true

  presentFieldsValid: (fields) ->
    for fieldName, __ of fields
      return false unless @presentFieldValid fields, fieldName
    true

  requiredFieldsPresent: (fields) ->
    for fieldName, __ of @_fieldProps
      return false unless @requiredFieldPresent fields, fieldName
    true

  ####################
  # PREPROCESS CORE
  ####################
  preprocessFields: (fields, applyDefaults) ->
    processedFields = null
    fields ||= {} if applyDefaults
    fields && for fieldName, props of @_fieldProps
      {preprocess} = props

      value = (oldValue = fields[fieldName]) ? (applyDefaults && props.default)
      value = preprocess value if preprocess && value?

      if value != oldValue
        processedFields ||= shallowClone fields
        processedFields[fieldName] = value

    processedFields || fields

  ####################
  # VALIDATION INFO CORE
  ####################
  invalidFields: (fields) ->
    k for k, v of fields when !@presentFieldValid fields, k

  missingFields: (fields) ->
    k for k in @_requiredFields when !@requiredFieldPresent fields, k

  ###################
  # PRIVATE
  ###################
  _addField: (field, options) ->
    @_fieldProps[field] = normalizeFieldProps options
