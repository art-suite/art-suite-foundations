# COMMON API
All comprehensions support four standard input patterns:

```
f(source, with = returnFirst) => into
f(source, options) => into
f(source, into, with = returnFirst) => into
f(source, into, options) => into
```


Where:
  - **f:** is `each/array/object/find/reduce`
  - **source:** can be one of:
    - **array-like:** iterated over using `for (i = 0; i < source.length; i++)`
    - **object:** iterated over using `for (k in source)`
    - **null/undefined:** treated as an empty container (eqivelent to passing in `[]` or `{}`)

  - **options:**
    - **with:** with
    - **when:** when
    - **into:** into

  - **with:**
    - `(value, key, into, whenBlockResult) -> value`
    - Generally, this function generates the 'value' used for each part of the
      iteration. When constructing a new collection, this is the value for each
      entry. ('find' and 'reduce' use this differently)

### each

`each` differences from the common-api:

1) into defaults to source

### object

`object` differences from the common-api:

- **options:**
  - **key:** `(value, key, into, whenBlockResult) -> value`
  - **withKey:** (alias)
  - default key is `v` if source is array-like, `k` if `object`
- `into` defaults to a new object ({})
- each iteration, `into` is updated as folows: `into[options.key()] = with()`

### array

`array` differs from the common-api:

- `into` defaults to a new array []
- each iteration, `into` is updated as folows: `into.push(with())`

### find

`find` differs from common api:

- returns:
  - the last value returned by `with`
  - or returns `undefined` if `with` was never executed

- stops
  - if have when: **!!when() == true**
  - if no when: **!!with() == true**

### reduce

`reduce` differences from the common-api:

- `with` has a different argument order:
  - (into, value, key, whenReturnValue) ->
  - i.e. `into` is passed first instead of last
  - This allows you to drop-in functions that take two args and reduce them to one like:
    - Math.max
    - add = (a, b) => a + b

  - The default `with` still returns `v` (which is now the second argument).

- if into starts out undefined:

    for v = the first value (if when is present, the first value when when is true)
      into = v
      skip: with

- each iteration, `into` is updated as folows: `into = with()`
```

