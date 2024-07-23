# TODO - Plans and Thoughts

- The big upcoming change (as-of v2.x, 2024) is I want to drop support for Created vs Updated validation. I want to simplify and just have single validation. If you need to validate for Created vs Updated, you can create two validators. Update validation, after all, is just Created where all fields are optional.
  - This is a breaking change.
- I also want to support nesting. e.g. `new Validator myField: new Validator mySubField: "string"`.
  - This is an easy, minor change. (I think)
- I want to support validators where the root doesn't have to be an object.
  - This might be a breaking change in how the Validator constructor works, but then again, we might be able make a shared base-class for atomic validators, array validators and object validators.
  - This would add support for atomic and array validators as the root value validated.