# @art-suite/art-core-objects

A comprehensive utility library for working with JavaScript objects, providing powerful operations for merging, transforming, and manipulating object structures.

## Features

- Deep and shallow object merging with various strategies
- Object path manipulation and property access
- Object transformation and mapping
- Object structure validation and inspection
- TypeScript definitions for complete type safety

## Installation

```bash
npm install @art-suite/art-core-objects
```

## API Overview

### Object Merging

```typescript
// Basic merging
merge(...objects: object[]): object
mergeWithoutNulls(...objects: object[]): object
mergeWith(mergeFn: (a: any, b: any) => any, ...objects: object[]): object
mergeWithSelf(object: object): object

// In-place merging
mergeInto(target: object, ...sources: object[]): object
mergeIntoWithNullDeletes(target: object, ...sources: object[]): object
mergeIntoUnless(target: object, unlessFn: (value: any) => boolean, ...sources: object[]): object

// Deep merging
deepMerge(...objects: object[]): object
```

### Object Creation and Transformation

```typescript
// Object creation
objectWith(props: object): object
objectWithout(object: object, ...keys: string[]): object
objectWithDefinedValues(object: object): object
objectWithExistingValues(object: object): object
objectWithPresentValues(object: object): object

// Array to object conversion
arrayToMap(array: any[], keyFn: (item: any) => string): object
toObject(array: any[], keyFn: (item: any) => string): object

// Property selection
select(object: object, ...keys: string[]): object
selectAll(objects: object[], ...keys: string[]): object[]
```

### Object Path Operations

```typescript
// Path manipulation
vivifyObjectPath(object: object, path: string[]): object
vivifyObjectPathAndSet(object: object, path: string[], value: any): object
setPathedProperty(object: object, path: string[], value: any): void
withPathedPropertiesExpanded(object: object): object
```

### Object Inspection

```typescript
// Property checking
hasAllProps(object: object, ...props: string[]): boolean
objectHasKeys(object: object): boolean
objectKeyCount(object: object): number
```

### Deep Object Operations

```typescript
// Deep iteration and mapping
deepEach(object: object, fn: (value: any, path: string[]) => void): void
deepMap(object: object, fn: (value: any, path: string[]) => any): object

// Structure conversion
toPlainStructure(object: object): object
toJsonStructure(object: object): object
```

### Utility Functions

```typescript
// Shorthand for object creation
m(props: object): object
```

## Examples

### Object Merging

```typescript
import {
  merge,
  mergeWithoutNulls,
  deepMerge,
} from "@art-suite/art-core-objects";

// Basic merging
const result = merge({ a: 1, b: 2 }, { b: 3, c: 4 });
// { a: 1, b: 3, c: 4 }

// Merge without nulls
const result2 = mergeWithoutNulls({ a: 1, b: 2 }, { b: null, c: 4 });
// { a: 1, b: 2, c: 4 }

// Deep merging
const result3 = deepMerge({ a: { b: 1 } }, { a: { c: 2 } });
// { a: { b: 1, c: 2 } }
```

### Object Path Operations

```typescript
import {
  vivifyObjectPath,
  setPathedProperty,
} from "@art-suite/art-core-objects";

const obj = {};

// Create nested structure
vivifyObjectPath(obj, ["a", "b", "c"]);
// obj = { a: { b: { c: {} } } }

// Set value at path
setPathedProperty(obj, ["a", "b", "c"], 42);
// obj = { a: { b: { c: 42 } } }
```

### Object Transformation

```typescript
import {
  objectWith,
  objectWithout,
  deepMap,
} from "@art-suite/art-core-objects";

// Create object with specific properties
const obj = objectWith({ a: 1, b: 2, c: 3 });
// { a: 1, b: 2, c: 3 }

// Remove properties
const filtered = objectWithout(obj, "b", "c");
// { a: 1 }

// Transform all values
const doubled = deepMap(obj, (value) => value * 2);
// { a: 2, b: 4, c: 6 }
```

### Array to Object Conversion

```typescript
import { arrayToMap } from "@art-suite/art-core-objects";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const userMap = arrayToMap(users, (user) => user.id);
// {
//   1: { id: 1, name: "Alice" },
//   2: { id: 2, name: "Bob" }
// }
```

## License

MIT
