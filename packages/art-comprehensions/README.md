# API

### Functions

```javascript
each();
array();
object();
find();
inject();
reduce();
```

### COMMON API

All comprehensions support four standard input patterns:

```
f() => undefined
f(source) => into
f(source, with) => into
f(source, into, with) => into

f(source, options) => into
f(source, into, options) => into
```

Where:

- **f:** is `each/array/object/find/reduce`
- **source:** can be one of:

  - **array-like:** iterated over using `for (i = 0; i < source.length; i++)`
  - **object:** iterated over using `for (k in source)`
  - **null/undefined:** treated as an empty container (eqivelent to passing in `[]` or `{}`)

- **options:**

  - **when**: `(value, key) -> booleanish` if this returns falsish, iteration will skip to the next value/key.
  - **with**: `(value, key) -> new value` (see with, below)
  - **map**: `(value, key) -> value` gets called AFTER `when` but before `with` (most useful with `reduce()`)
  - **into/returning/inject**: any (these are alias of each other)

- **with:**
  - `(value, key) -> new value`
  - Generally, this function generates the 'value' used for each part of the
    iteration. When constructing a new collection, this is the value for each
    entry. ('find' and 'reduce' use this differently)

### each

Iterate over the source container. By default, just returns the source container.

```
each(source) => source
each(source, with) => source
each(source, into, with) => into

each(source, options) => options.into ? source
each(source, into, options) => into
```

`each` differs from the common-api:

1. into defaults to source
2. each doesn't modify source

### object

Create a new object derived fromthe source container. The default behavior differs slightly between array-sources and object-sources:

- **from-array**:

```
object(source) => new {} derived from source
object(source, with) => new {} derived from source
object(source, options) => options.into ? new {} derived from source

object(source, into, with) => into
object(source, into, options) => into
```

`object` differences from the common-api:

- **options:**
  - **key:** `(value, key, into, whenBlockResult) -> value`
  - **withKey:** (alias: key)
  - default key is `v` if source is array-like, `k` if `object`
- `into` defaults to a new object ({})
- each iteration, `into` is updated as folows: `into[options.key()] = with()`

### array

Create a new array from the values and keys of the source container.

```
array(source) => new [] containing all values from source
array(source, with) => new [] of 'with' applied to each value in source
array(source, into, with) => into

array(source, options) => options.into ? new [] derived from source
array(source, into, options) => into
```

`array` differs from the common-api:

- `into` defaults to a new array []
- each iteration, `into` is updated as folows: `into.push(with())`

### find

Find an element in the `source` container.

```
find(source) => first trueish value from source
find(source, with) => first trueish value returned from 'with'
find(source, options) => a value from 'options.with' or directly from source
```

`find` differs from common api:

- returns:

  - the last value returned by `with`
  - or returns `undefined` if `with` was never executed

- stops
  - if have when: **!!when() == true**
  - if no when: **!!with() == true**

### reduce and inject

These comprehensions are very similar. Inject always injects an initial `last` value (from inject/into/returning value if passed in, undefined otherwise). Reduce never injects a value.

- `last` gets initialized to
  - for inject: inject/into/returning
  - for reduce: the first value in source
- `with` has a different argument order:

  - (last, value, key) ->
  - This allows you to drop-in functions that take two args and reduce them to one like:

    - add = (a, b) => a + b

  - The default `with` still returns `v` (which is now the second argument).
  - Note, for reduce, with gets called N-1 times, for inject, with gets called N times.

- each iteration, `last` is updated as follows: `last = with(last, value, key)`
- `map` is super handy; it gets called AFTER `when` but before `with`

```javascript
// sum records containing amount
reduce(source, 0, {map: ({amount}) -> amount, with: add})
```
