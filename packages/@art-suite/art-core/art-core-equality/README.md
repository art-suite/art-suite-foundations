# @art-suite/art-core-equality

Comprehensive equality and comparison utilities for JavaScript values, including deep equality, object comparison, and difference detection.

Object can implement custom comparisons with the simple eq, lt, lte and gte api.

## Installation

```bash
npm install @art-suite/art-core-equality
```

## API

### Comparison Functions

```javascript
import {
  gt, // greater than
  lt, // less than
  gte, // greater than or equal
  lte, // less than or equal
  eq, // deep equality
  neq, // deep inequality
  compare, // returns -1, 0, or 1
} from "@art-suite/art-core-equality";

// Basic comparisons
gt(5, 3); // true
lt(3, 5); // true
gte(5, 5); // true
lte(3, 5); // true

// Deep equality
eq({ a: 1 }, { a: 1 }); // true
neq({ a: 1 }, { a: 2 }); // true

// Compare returns -1, 0, or 1
compare(3, 5); // -1
compare(5, 5); // 0
compare(5, 3); // 1
```

### Fast Equality

```javascript
import { fastEq, fastNeq } from "@art-suite/art-core-equality";

// Fast equality only works for primitives and references
fastEq(1, 1); // true
fastEq({}, {}); // false (different references)
fastNeq(1, 2); // true
```

### Object Comparison

```javascript
import { plainObjectsDeepEq, propsEq } from "@art-suite/art-core-equality";

// Deep equality for objects
plainObjectsDeepEq({ a: 1 }, { a: 1 }); // true

// Compare specific properties
propsEq({ a: 1, b: 2 }, { a: 1, b: 3 }, ["a"]); // true
```

### Difference Detection

```javascript
import { diff, plainObjectsDeepDiff } from "@art-suite/art-core-equality";

// Get differences between objects
diff({ a: 1, b: 2 }, { a: 1, b: 3 }); // {b: 3}
plainObjectsDeepDiff({ a: 1 }, { a: 2 }); // {a: 2}
```

### Shallow Equality

```javascript
import { shallowEq } from "@art-suite/art-core-equality";

// Shallow equality check
shallowEq({ a: 1 }, { a: 1 }); // false (different references)
shallowEq([1], [1]); // false (different references)
```
