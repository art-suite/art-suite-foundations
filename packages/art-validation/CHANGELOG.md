# v2.0 Breaking Changes

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
