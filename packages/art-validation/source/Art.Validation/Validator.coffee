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
CONCEPTS:

  Each field can have up to three custom functions:

    validate: (v) -> true/false

      Validate is evaludated first. If it returns a false value, validation fails.

      NOTE: Return false for validation failures, DO NOT THROUGH ERRORS

    preprocess: (v1) -> v2

      Preprocess can arbitrarily transform the input value to any output value.

      The output-value is what is passed back after successful validation.

      NOTE: preprocessors should NOT throw validation-related errors

    postValidate: (v) -> true/false

      Post-validate is evaludated last. It works the same as validate, but
      sometimes it's easy to normalize the input first with 'preprocess' and
      THEN validate it.

USAGE:
  new Validator validatorFieldsProps, options

    IN:
      validatorFieldsProps:
        plain object with zero or more field-validations defined:
          fieldName: fieldProps
      options:
        exclusive: true/false
          if true, only fields listed in validatorFieldsProps are allowed.

        context: String
          String to attached to errors for clarity.

    fieldProps:
      string or plainObject
      string: selects fieldProps from one of the standard @FieldTypes (see below)
      plainObject: (all fields are optional)

        validate: (v) -> true/false
          whenever this field is included in an update OR create operation,
            validate() must return true
          NOTE: validate is evaluated BEFORE preprocess

        preprocess: (v1, forCreate) -> v2
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
    for k, v of ft when k != "fields"
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
    {fieldType, fields} = ft
    fieldType ||= "object" if fields
    if fieldType
      merge normalizeFieldProps(fieldType), ft
    else
      ft

  @normalizeFields: (fields) ->
    object fields, normalizeFieldProps

  @normalizeFieldProps: normalizeFieldProps = (ft) ->
    fieldProps = if isPlainObject ft

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

    fieldPropsWithGeneratedPostValidator merge FieldTypes[fieldProps.fieldType], fieldProps

  fieldPropsWithGeneratedPostValidator = (fieldProps) ->
    {postValidate, maxLength, minLength, fields} = fieldProps
    if maxLength? || minLength? || fields?

      if fields
        validator = new Validator fields, exclusive: true
        fieldProps.preprocess = (value, forCreate) -> validator.preprocessFields value, forCreate

      fieldProps.postValidate = (value, fieldName, fields) ->
        if postValidate
          return false unless postValidate value, fieldName, fields
        if value?
          return false if maxLength? && value.length > maxLength
          return false if minLength? && value.length < minLength
          try
            validator?.validate value
            true
          catch
            false
        else
          true

    fieldProps

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

  # 2017-09-01 NEW API:
  # I'm going to drop the async stuff. It just makes this lib more complex than it needs to be
  # with modest savings to other libs. All it does is ensure fields are resolved before doing
  # fully synchronous work.

  #<DEPRICATED>
  preCreate: (fields, options) ->
    log.error "Validator.preCreate is DEPRICATED. Use .validate or .validateCreate"
    Promise.resolve(fields).then (fields) => @preCreateSync fields, options

  preUpdate: (fields, options) ->
    log.error "Validator.preUpdate is DEPRICATED. Use .validateUpdate"
    Promise.resolve(fields).then (fields) => @preUpdateSync fields, options

  validateSync: -> throw new Error "DEPRICATED: use validate"

  preCreateSync: (fields = {}, options) ->
    log.error "preCreateSync is DEPRICATED. use .validateCreate or just .validate"
    @validateCreate fields, options

  preUpdateSync: (fields = {}, options) ->
    log.error "preUpdateSync is DEPRICATED. use validateUpdate"
    @validateUpdate fields, options
  #</DEPRICATED>

  ###
  IN:
    fields: - the object to check
    options:
      context: string - included in validation errors for reference
      logErrors: false - if true, will log.error errors

  OUT: preprocessed fields - if they pass, otherwise error is thrown

  NOTE: missing fields are errors
  ###
  validateCreate: validateCreate = (fields = {}, options) ->
    processedFields = null
    out = try
      @requiredFieldsPresent(fields) &&
      @presentFieldsValid(fields) &&
      @postValidateFields processedFields = @preprocessFields fields, true
    catch error
      log.error Validator: error_in: validateCreate: {fields, options, this: @, error}

    out || @_throwError fields, processedFields, options, true

  validate:       validateCreate

  ###
  IN:
    fields: - the object to check
    options:
      context: string - included in validation errors for reference
      logErrors: false - if true, will log.error errors

  OUT: preprocessed fields - if they pass, otherwise error is thrown

  NOTE: missing fields are ignored
  ###
  validateUpdate: validateUpdate = (fields = {}, options) ->
    out = try
      @presentFieldsValid(fields) &&
      @postValidateFields processedFields =  @preprocessFields fields
    catch error
      log.error Validator: error_in: validateUpdate: {fields, options, this: @, error}

    out || @_throwError fields, processedFields, options

  _throwError: (fields, processedFields, options, forCreate) ->
    info = errors: errors = {}
    messageFields = []

    array @invalidFields(fields), messageFields, (f) =>
      errors[f] = "invalid"
      if @exclusive && !@_fieldProps[f]
        "unexpected '#{f}' field"
      else
        "invalid #{f}"

    array @postInvalidFields(processedFields), messageFields, (f) =>
      errors[f] = "invalid"
      "invalid processed #{f}"

    forCreate && array @missingFields(fields), messageFields, (f) ->
      errors[f] = "missing"
      "missing #{f}"

    message = "#{options?.context ? @context} #{if forCreate then 'Create' else 'Update'}-Validation failed. Invalid fields: #{messageFields.join ', '}"
    info.fields = fields
    throw new ErrorWithInfo message.trim(), info

  ####################
  # VALIDATION CORE
  ####################
  presentFieldPostValid: (fields, fieldName, value) ->
    if fieldProps = @_fieldProps[fieldName]
      {postValidate} = fieldProps
      !postValidate || !value? || value == null || value == undefined || postValidate value, fieldName, fields
    else
      true

  presentFieldValid: (fields, fieldName, value) ->
    if fieldProps = @_fieldProps[fieldName]
      {validate} = fieldProps
      return false if fieldProps.present && !present value
      !validate || !value? || value == null || value == undefined || validate value, fieldName, fields
    else
      !@exclusive

  requiredFieldPresent: (fields, fieldName) ->
    return true unless fieldProps = @_fieldProps[fieldName]
    return false if fieldProps.required && !fields[fieldName]?
    return false if fieldProps.present  && !present fields[fieldName]
    true

  presentFieldsValid: (fields) ->
    for fieldName, fieldValue of fields
      return false unless @presentFieldValid fields, fieldName, fieldValue
    true

  requiredFieldsPresent: (fields) ->
    for fieldName, fieldValue of @_fieldProps
      return false unless @requiredFieldPresent fields, fieldName
    true


  postValidateFields: (fields) ->
    for fieldName, fieldValue of fields
      return false unless @presentFieldPostValid fields, fieldName, fieldValue
    fields

  ####################
  # PREPROCESS CORE
  ####################
  preprocessFields: preprocessFields = (fields, applyDefaults) ->
    processedFields = null
    fields ||= {} if applyDefaults
    fields && for fieldName, props of @_fieldProps
      {preprocess} = props

      value = if undefined != oldValue = fields[fieldName]
        oldValue
      else
        applyDefaults && props.default

      value = preprocess value, applyDefaults if preprocess && value?

      if value != oldValue
        processedFields ||= shallowClone fields
        processedFields[fieldName] = value

    processedFields || fields || {}

  preprocess: preprocessFields

  ####################
  # VALIDATION INFO CORE
  ####################
  invalidFields: (fields) ->
    k for k, v of fields when !@presentFieldValid fields, k, v

  postInvalidFields: (fields) ->
    k for k, v of fields when !@presentFieldPostValid fields, k, v

  missingFields: (fields) ->
    k for k in @_requiredFields when !@requiredFieldPresent fields, k

  ###################
  # PRIVATE
  ###################
  _addField: (field, options) ->
    @_fieldProps[field] = normalizeFieldProps options
