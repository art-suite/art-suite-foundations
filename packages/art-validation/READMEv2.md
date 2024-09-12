# Validator2

## Goals:

- express objects and arrays naturally - e.g. the simplest way to use should be the right way
- Allow nested Validators
- Remove Creation vs Updated validation - just one validation; make two validators for creation and update
- Support top-level validators for non-objects
- support tuples
- Solid openapi export support
- we believe in permissive tools - by default fields are optional and extra fields are allowed
- Primary use case is JSON schema definition and validation.
  - All data over the wire is JSON
  - All data stored is read and written as JSON
     - The database can store data in any format "it wants" (i.e. that you configured it to), but the database ORM will accept and return JSON objects.
  - Non-JSON datatypes will be well-supported, but only for "in memory processing" - they must either be stripped or converted to JSON before being stored.

## Major Changes from V1

- Breaking: No more support for Create vs Update validation
  - This simplifies a lot!
  - It's easy enough to create two validators, one for create and one for update.
- New: Nested validators
- New: Root-level non-object value types support (currently Validator v1 requires an object as the root value)
- Breaking: definitions look more like pure JSON - based on the principle: "the Easiest way to use an API should be the Right way"

## Details

The basic idea is that only strings or Validator instances express validation. Plain objects and arrays express structure. Objects represent records, arrays express repeating tuples (the most common s a 1-tuple i.e. all items in the array are the same type).

Strings are used to express simple, common validators. More complex validators need to be instances of Validator.

Because we'll be creating more Validator instances, we'll provide three factory function:

```coffee
# #1: validator - lets you quickly define complex validators almost purely "by example" - i.e. objects and arrays represent validating objects and arrays directly
validator = (validationDefinition, validationOptions) ->
validator = (validationOptionsInstance, validationDefinition) ->
  # to put the options first, use the "validationOptions" function below

# #2: customValidator - lets you differentiate validation options from validation definitions
validationOptions = parseValidationOptions
# useful for swapping the order of arguments in validator. Example:
# validator
#   validationOptions {...}
#   validationDefinition

# #3: customValidator - lets you define a fully custom validator - which just only expects a validationOptions object
customValidator = (_validationOptions) -> validator validationOptions _validationOptions
# "customValidator" is just shorthand for: validator validationOptions {...}
```

### Atomic Validators

```coffee
# just validator a string
validator "string"

# required string
validator "required string"

# string with minimum length
validator "string minLength: 5"

# 'present' string (minLength: 1 after trimming)
validator "present string"
```

### Structure

```coffee
# just validator an object
validator {}

# object with some fields
validator
  name: "string"
  age: "number"

# nested objects
validator
  name: "string"
  address:
    street: "string"
    city: "string"
    state: "string"
    zip: "string"
```

```coffee
# array
validator []

# array of strings
validator [] "string"

# array of array of strings
validator [] [] "string"

# array of x, y, z
validator []
  "number name:x"
  "number name:y"
  "number name:z"
```

```coffee
# array of objects
validator []
  name: "string"
  age:  "number"

# object with array fields
validator
  name: "string"
  addresses: []
    street: "string"
    city:   "string"
    state:  "string"
    zip:    "string"
```

#### Configuring Structure Validators

```coffee
# combine string-based options with structure
# OPTION A: validation options second
validator
  name: "string"
  age:  "number"
  "required exclusive"

# OPTION B: validation options first
validator
  validationOptions "required exclusive"
  name: "string"
  age:  "number"

# OPTION C: validation options second, but explicit
validator
  name: "string"
  age:  "number"
  validationOptions
    required:   true # this means the OBJECT is required, but name and age are not individually required
    exclusive:  true # this means only the listed fields are allowed

# array of strings, max-length 5
validator
  [] "string"
  maxLen: 5

# nested
validator
  name:  "string"
  addresses: validator
    []
      street: "string"
      city:   "string"
      state:  "string"
      zip:    "string"

    "maxLength: 3" # maximum 3 addresses
```

Structure-specific options:
- "exclusive" - use with objects; only the specified fields are allowed

### Custom Validators and Validation Options

```coffee
# "customValidator" is just shorthand for: validator validationOptions {...}
customValidator validationOptions
```

Validation Options:

-  Main validation props and functions
  - required: true                # if true, null and undefined are not accepted
  - exclusive: true               # if true, only the specified fields are allowed
  - deepRequired: true            # if true, all fields are required recursively
  - deepExclusive: true           # if true, only the specified fields are allowed recursively
  - default: value                # used if value is null or undefined
  - validate: (value) -> true     # if the field is not null or undefined, this is called next
  - preprocess: (value) -> value  # after validate, preprocess is called
  - postValidate: (value) -> true # after preprocess is called, postValidate is called
  - getValidationErrors: (value, fieldPath = "") -> []
    - value: value
    - fieldPath: "string"
    - errorIs: "string"

- documentation - not required for validation, but useful for field definition (e.g. for openapi)
  - name: "x"
  - description: "The x-coordinate"
  - examples: [] value

- conversion
  - toJson: -> jsonValue     # for all non-custom types, this is a no-op (except undefined becomes null)
  - fromJson: (jsonValue) -> # for all non-custom types, this is a no-op


### Validator2 API

```coffee
class Validator2
  # CHANGE: the standard custom validation functions work identically!
  # this changes - it is the same as the validate function passed in for custom validators
  # it just returns t/f - it doesn't throw errors
  validate:     (value) -> true
  preprocess:   (value) -> value  # should only call on validated values
  postValidate: (value) -> true # should only call on preprocessed values
  getValidationErrors: (value, fieldPath = "") -> []
    value:      value
    fieldPath:  "string"
    errorIs:    "string"

  @getters "name", "description", "examples", "required", "default"

  # using validators:
  isValid: (value) ->
    # tests required
    # tests with validate
    # runs preprocess
    # tests with postValidate
    # returns true if all tests pass

  getValidated: (value) -> value # throws if there is a validation error - error message will contain part of getValidationErrorString unless its too long
  getValidationErrorString: (value, fieldPath = "") -> "string" # concats all validation errors nicely
```

### String Declaration Structure

FieldTypes: number, string, boolean, integer
Boolean options: required, present
Value Options:
- "minLength: integer"
- "maxLength: integer"
- "min: number"
- "max: number"


### Null and Undefined

All data is stored as JSON. We also want to maximize ease of use. So, it is our opinion that null and undefined are mostly interchangeable except in the following semantics:

- A field that is present by has the value "undefined" is the same as the field not being present.
- When stored in a database, "null" fields are removed and thus "null" and "undefined" are the same.
- When writing over existing data (or merging data), a field that has the value "null" means "set this field to null" while "undefined" means "leave this field unchanged"
- Note: we ALWAYS process data objects pure-functionally - we never mutate an object containing data, only create new objects out of old values.

```coffee
merge
  {} name: "shane", age:  123
  {} name: "john"
# out: {name: "john", age: 123}

merge
  {} name: "shane", age:  123
  {} name: "john", age: undefined
# out: {name: "john", age: 123}

merge
  {} name: "shane", age:  123
  {} name: "john", age: null
# out: {name: "john", age: null}

write id: "abc123", name: "shane", age: 123
write id: "abc123", name: "john", age: null
read()
# out: id: "abc123", name: "john" # age was removed
```

- This, in the STORAGE, null fields are removed, but in TRANSIT, null fields are preserved.
- In both cases, present yet undefined fields are always removed as soon as they are detected.


# 2024-8-5

```coffee
class Validator2
  # chain definition
  @getter
    required: -> @with required: true
    exclusive: -> @with exclusive: true
    present: -> @with present: true

  @getter
    :isExclusive
    :isRequired
    :isPresent
    options: -> # all the options as an object

  regex:        (regex)  -> @withExtraValidation (value) ~> regex.test value
  min:          (number) -> @withExtraValidation (value) ~> value >= number
  max:          (number) -> @withExtraValidation (value) ~> value <= number
  lessThan:     (number) -> @withExtraValidation (value) ~> value < number
  greaterThan:  (number) -> @withExtraValidation (value) ~> value > number
  minLength:    (number) -> @withExtraValidation (value) ~> number <= value.length
  maxLength:    (number) -> @withExtraValidation (value) ~> number >= value.length

  default: (value) -> @with default: value
  with: (validationOptions...) ->
    new Validator2 @options
    @clone validationOptions...

  withExtraValidation: (validate) -> @with validate: (value) ~>
    @validate value
    && validate value

validator = (ValidationStructure, ValidationOptions...) -> new Validator2

validator.string = validator "string"
validator.number = validator "number"
validator.boolean = validator "boolean"
validator.null = validator "null"
validator.enum = (values...) -> new Validator2 validate: (value) -> value in values

# all the current field types:
validator.url = # a working url validator
validator.uuid = # a working uuid validator
validator.email = # a working email validator
validator.date = # a working date validator
...

ValidationStructure = validator.union
  validator.enum
    "string" "number" "boolean" "function"
    "null"      # the string "null" means only null is allowed
    "function"  # any function
  "null"        # an actual null means anything allowed
  validator.map ValidationStructure
  validator.is Validator
  [] ValidationStructure
  # Array meaning:
  #   array-length 0: array of anything
  #   array-length 1: provide a validator or validationStructure - all elements must match this type
  #   array-length >1: define type a tuples - in the future there may be an option for repeating tuples (e.g. [x,y,z, x,y,z, x,y,z])
  "function" # if a function is provided, it will be invoked when the validator is first USED, and its results will be used to initialize the validator - use this for recursive type declarations

ValidationOptions = validator.union
  "required"
  "optional"
  "present"
  "exclusive"

  default: null
  validate: "function"      # any -> boolean if input is a valid input-type
  preprocess: "function"    # input-type -> normalized-type
  postValidate: "function"  # normalized-type -> boolean
  fromString: "function"    # string -> normalized-type
  toString: "function"      # normalized-type -> string
  fromJson: "function"      # json -> normalized-type
  toJson: "function"        # normalized-type -> json
  description: "string"
  examples: []

  # what about ArtEry specific fields???
  link: validator.union "boolean", "string"

# union types - if any validator matches, it's valid; preprocess with the first valid validator
validator.union = (validators...) -> new Validator2
  validate: (value) -> find validator in-array validators when validator.validate value with true
  preprocess: (value) -> find validator in-array validators when validator.validate value with validator.preprocess value

validator.intersection = (validators...) -> new Validator2
  # only valid if ALL validators are valid
  validate: (value) -> !find validator in-array validators when !validator.validate value with true
  # run every validator's preprocessor in order
  preprocess: (value) -> reduce v, validator in-array validators inject value with validator.preprocess v

validator.map = (validator) -> new Validator2 validate: (value) ->
  isPlainObject value
  !find v, k from value when !validator.validate v
  validator.validate value

validator.is = (type) -> new Validator2 validate: (value) -> value is type

# Chain Definition examples
validator.string.required
validator.string.min 1
"string min:1" ???

# defining recursive validation using a function to delay the definition of the recursive element until it's first used
LinkedList = validator.union
  next: validator.union "null", -> LinkedList
  value: "string"
```

QUESTION: do we do string-parsing for definition OR only allow the atomic types as strings?
- gut: let's NOT for now and see how far we get
- if we only use certain string-literals, we may be able to generate "realtime" Typescript inference
  - e.g. `validator.type` would be the TypeScript type defined by the definition