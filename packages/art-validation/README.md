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

Alternatives:

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
```

# Breaking Changes with 1.0

- maxLength and minLength tests for arrays were expressed inconsistently with the rest of the API in v1, and there was therefor no way to express a minLength or maxLength test for the individual elements in an array.

  ```coffeescript
  # v1
  myField: array: maxLength: 10 # array can't be longer than 10 elements

  # v2
  myField:
    array: maxLength: 20  # individual elements can't be longer than 20
    maxLength: 10         # array can't be longer than 10 elements
  ```

- In v2, only `required` and `present` can be used as nested-object-tags:

```coffeescript
# v1
myField: required: "string" # hard-deprecated in v1
myField: required: fieldType: "string" # OK
# became: required: true, fieldType: "string"

myField: foobar: fieldType: "string"
# became: foobar: true, fieldType: "string"

# v2
myField: required: "string" # allowed, once again! (but only for 'required' and 'present')
# now becomes: required: true, fieldType: "string"

myField: foobar: fieldType: "string"
# now becomes: foobar: fieldType: "string"
# note, the {fieldType: "string"}, being a property on foobar, a
# custom property, is completely ignored by the Validator.
```
