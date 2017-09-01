{
  merge, log, BaseClass, shallowClone
  isString, isPlainObject, isPlainArray
  Promise
  formattedInspect
  present
  select
  emailRegexp
  mergeIntoUnless
  w
  clone
  ErrorWithInfo
  array
  object
  isDate
  pushIfNotPresent
  toDate
  toMilliseconds
  toSeconds
} = require 'art-standard-lib'

{
  booleanDataType
  numberDataType
  stringDataType
  objectDataType
  arrayDataType
  functionDataType
  dateDataType
} = require './DataTypes'

FieldTypes = require './FieldTypes'

{BaseClass} = require 'art-class-system'
DataTypes = require './DataTypes'

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
      string: selects fieldProps from one of the standard @FieldTypes (see below)
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
            fieldProps = merge fieldProps, FieldTypes[string]

        present: true/false
          if true
            when creating records, this field must be include and 'present' (see Art.Foundation.present)

        fieldType: string
          fieldProps = merge FieldTypes[string], fieldProps

        dataType: string
          sepecify which of the standard Json data-types this field contains
          This is not used by Validator itself, but is available for clients to reflect on field-types.
          Must be one of the values in: DataTypes

        instanceof: class
          in addition to passing validate(), if present, the value must also be an instance of the
          specified class

EXAMPLES:
  new

###

module.exports = class Validator extends BaseClass

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
        if subFt = FieldTypes[string]
          ft.fieldType = string
          mergeIntoUnless ft, subFt
        else
          ft[string] = true
      ft

    else if ft == true
      FieldTypes.any
    else
      throw new Error "fieldType must be a string or plainObject. Was: #{formattedInspect ft}"

    merge FieldTypes[ft.fieldType], ft

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
  preCreateSync: preCreateSync = (fields = {}, options) ->
    out = try
      @requiredFieldsPresent(fields) &&
      @presentFieldsValid(fields) &&
      @preprocessFields fields, true
    catch error
      log.error Validator: error_in: preCreateSync: {fields, options, this: @, error}

    out || @_throwError fields, options, true

  validateSync: preCreateSync

  ###
  OUT: preprocessed fields - if they pass, otherwise error is thrown
  ###
  preUpdateSync: (fields = {}, options) ->
    out = try
      @presentFieldsValid(fields) &&
      @preprocessFields fields
    catch error
      log.error Validator: error_in: preUpdateSync: {fields, options, this: @, error}

    out || @_throwError fields, options

  _throwError: (fields, options, forCreate) ->
    info = errors: errors = {}
    messageFields = []

    array @invalidFields(fields), messageFields, (f) =>
      errors[f] = "invalid"
      if @exclusive && !@_fieldProps[f]
        "unexpected '#{f}' field"
      else
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

      value = if undefined != oldValue = fields[fieldName]
        oldValue
      else
        applyDefaults && props.default

      value = preprocess value if preprocess && value?

      if value != oldValue
        processedFields ||= shallowClone fields
        processedFields[fieldName] = value

    processedFields || fields || {}

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
