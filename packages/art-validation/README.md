# ArtValidator

Validate object properties.

### NOTES

* validators are evaluated before preprocessors
* preprocessors should NOT throw validation-related errors

### USAGE

```coffeescript
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
```