# @art-suite/art-core-types

A comprehensive utility library for type checking and object introspection with a functional approach.

## Features

- Extensive type checking for primitive and complex types
- Cross-frame compatible type detection
- Deep object traversal and transformation
- Value comparison utilities with custom object support
- Object structure conversion for various formats

## Installation

```bash
npm install @art-suite/art-core-types
```

## API Overview

### Type Checking

Core functions for precise type detection:

```typescript
// Basic type checks
isArray(obj: any): boolean
isString(obj: any): boolean
isNumber(obj: any): boolean
isBoolean(obj: any): boolean
isFunction(obj: any): boolean
isObject(obj: any): boolean
isDate(obj: any): boolean
isRegExp(obj: any): boolean
isError(obj: any): boolean
isPromise(obj: any): boolean

// Advanced type checks
isPlainObject(v: any): boolean          // True for simple key-value objects
isPlainArray(obj: any): boolean         // True for standard arrays
isArrayIterable(source: any): boolean   // True if object has a length property
isNonNegativeInt(x: any): boolean       // True for integers >= 0
isClass(obj: any): boolean              // True for class constructors
isExtendedClass(obj: any): boolean      // True for classes that extend another class

// Special types
isArrayBuffer(obj: any): boolean        // True for ArrayBuffer objects
isTypedArray(obj: any): boolean         // True for typed arrays (Uint8Array etc.)
isArguments(o: any): boolean            // True for arguments objects
isBrowserObject(obj: any): boolean      // True for DOM elements and browser objects

// Cross-frame compatible checks
isPlainObjectFast(v: any): boolean      // faster than isPlainObject
// Works great as long as Node doesn't have multiple contexts
// i.e. multiple different instances of Object
```

### Object Property Inspection

Functions for checking object properties:

```typescript
// Property existence checks
hasProperties(o: any): boolean          // True if object has any properties (including inherited)
hasOwnProperties(o: any): boolean       // True if object has any own properties
isEmptyObject(obj: any): boolean        // True if object has no properties

// Inheritance checks
getSuper(o: object | Function): object | Function      // Gets parent object
getSuperclass(klass: Function): Function | undefined   // Gets superclass of a class
isDirectPrototypeOf(o: any, prototype: any): boolean   // Checks direct prototype relationship
```

### Value Comparison

Functions for comparing values with custom object support:

```typescript
// Comparison operators
gt(a: any, b: any): boolean    // Greater than with object support
gte(a: any, b: any): boolean   // Greater than or equal with object support
lt(a: any, b: any): boolean    // Less than with object support
lte(a: any, b: any): boolean   // Less than or equal with object support
```

### JSON & Structure Conversion

Utilities for converting between different structure formats:

```typescript
// JSON compatibility
isJsonAtomicType(a: any): boolean    // True for string, number, boolean, null
isJsonType(a: any): boolean          // True for any JSON-compatible type
```

### Value Presence

Functions for checking if values are present or empty:

```typescript
// Presence checks
present(obj: any, returnIfNotPresent?: any): any     // Returns obj if present, else returnIfNotPresent
stringIsPresent(str: string): boolean                // True if string has content (not just whitespace)
```

## Examples

### Type Checking

```typescript
import {
  isFunction,
  isPlainObject,
  isPromise,
} from "@art-suite/art-core-types";

// Basic type checking
isFunction(() => {}); // true
isFunction(function () {}); // true
isFunction(class MyClass {}); // true
isFunction("not a function"); // false

// Advanced object checking
isPlainObject({}); // true
isPlainObject(new Date()); // false
isPlainObject(Object.create(null)); // true

// Async type detection
isPromise(Promise.resolve()); // true
isPromise(new Promise((r) => r())); // true
isPromise({ then: () => {} }); // false (needs more than just 'then')
```

## License

MIT
