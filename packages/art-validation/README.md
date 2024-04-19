# ArtValidator 2.0

Validate object properties.

### NOTES

- validators are evaluated before preprocessors
- preprocessors should NOT throw validation-related errors

### Example

Simplest: _"name", must be a string (or null or undefined)_

```coffeescript
validator = new Validator name: "string"
# or, verbose: new Validator name: fieldType: "string"

assert.true !!validator.validate name: "Alice"
assert.true !!validator.validate {} # name not required

assert.throws -> validator.validate name: 123   # not a string
```

Required: _"name", must be a string (and not null or undefined)_

```coffeescript
validator = new Validator name: "required string"
# or, verbose: new Validator name: required: true, fieldType: "string"

assert.true !!validator.validate name: "Alice"
assert.throws -> validator.validate {} # name required
```

Exclusive: _"name" is the only field allowed_

```coffeescript
validator = new Validator {name: "string"}, exclusive: true
# or, verbose: new Validator {name: fieldType: "string"}, exclusive: true

assert.true !!validator.validate name: "Alice"
assert.throws -> validator.validate name: "Alice" age: 123 # exclusive!
assert.throws -> validator.validate name: 123
```

Three different ways to express field-property sequences:

```coffeescript
new Validator age: required: "integer"  # only `required` and `present` can be expressed this way
new Validator age: "required integer"   # strings are broken up on word boundaries
new Validator age: ["required", "integer"]
```

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
      v is never null nor undefined
      whenever this field is included in an update OR create operation,
        validate() must return true
      NOTE: validate is evaluated BEFORE preprocess

    postValidate: (v) -> true/false
      v is never null nor undefined
      whenever this field is included in an update OR create operation,
        validate() must return true
      NOTE: validate is evaluated AFTER preprocess

    preprocess: (v1) -> v2
      v1 is never null nor undefined
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

    default: value or function
      If field is not included in the object being validated, the default value will be used.
      If the default is a function, it will be invoked with f(fieldName, normalizedFieldProps)
      UNLESS your fieldProps.dataType is "function" in which case the default value is used as-is (see the "defaultFunction" option.

    defaultFunction: (fieldName, normalizedFieldProps) ->
      If your fieldProps.dataType is "function", you can use this to create the default function
      dynamically.
```

