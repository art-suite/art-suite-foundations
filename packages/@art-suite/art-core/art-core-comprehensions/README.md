# @art-suite/art-core-comprehensions

A powerful and flexible comprehension library for JavaScript that provides a unified interface for working with arrays, objects, and other iterables. It offers a consistent way to perform common operations like mapping, filtering, and reducing across different data structures.

The biggest difference between this library and other comprehensions is each comprehension function can accept any input container as the source: objects, arrays or anything that is Iterable. The name of the comprehension function indicates the return type:

- `object` returns an object
- `array` returns an array
- `find` returns the found value
- `inject`

## Features

- Unified interface for working with arrays, objects, and other iterables
- Consistent behavior across different data structures
- Support for both synchronous and asynchronous operations
- Type-safe operations with TypeScript support
- Efficient implementations that maintain the original data structure's characteristics

## Installation

```bash
npm install @art-suite/art-core-comprehensions
```

## API Overview

### Core Functions

- **`each(source, callback)`**: Iterates over a source, executing the callback for each item. Returns the source unchanged.
- **`array(source, callback)`**: Creates a new array by applying the callback to each item in the source.
- **`object(source, callback)`**: Creates a new object by applying the callback to each item in the source.
- **`reduce(source, callback, initialValue)`**: Reduces the source to a single value using the callback.
- **`inject(source, callback, initialValue)`**: Alias for `reduce` with a more intuitive name for certain use cases.
- **`find(source, callback)`**: Returns the first item in the source that satisfies the callback.

## Usage Examples

### Basic Array Operations

```javascript
import { array, each, find } from "@art-suite/art-core-comprehensions";

const numbers = [1, 2, 3, 4, 5];

// Map operation
const doubled = array(numbers, (x) => x * 2);
// Result: [2, 4, 6, 8, 10]

// ForEach operation
each(numbers, (x) => console.log(x));
// Logs each number

// Find operation
const firstEven = find(numbers, (x) => x % 2 === 0);
// Result: 2
```

### Object Operations

```javascript
import { object, each } from "@art-suite/art-core-comprehensions";

const data = {
  a: 1,
  b: 2,
  c: 3,
};

// Transform object values
const doubled = object(data, (value, key) => value * 2);
// Result: { a: 2, b: 4, c: 6 }

// Iterate over object
each(data, (value, key) => console.log(`${key}: ${value}`));
// Logs each key-value pair
```

### Reduce Operations

```javascript
import { reduce, inject } from "@art-suite/art-core-comprehensions";

const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = reduce(numbers, (acc, x) => acc + x, 0);
// Result: 15

// Alternative syntax using inject
const product = inject(numbers, (acc, x) => acc * x, 1);
// Result: 120
```

### Working with Different Data Structures

```javascript
import { array, object } from "@art-suite/art-core-comprehensions";

// Array-like object
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const result1 = array(arrayLike, (x) => x.toUpperCase());
// Result: ['A', 'B', 'C']

// Set
const set = new Set([1, 2, 3]);
const result2 = array(set, (x) => x * 2);
// Result: [2, 4, 6]

// Map
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
const result3 = object(map, (value, key) => value * 2);
// Result: { a: 2, b: 4 }
```

## Key Concepts

### Source Types

The library works with various source types:

- Arrays
- Objects
- Sets
- Maps
- Array-like objects
- Any object with a `forEach` method
- Any object with a `map` method
- Any object with a `reduce` method

### Callback Functions

Each operation accepts a callback function that receives:

- The current value
- The current key/index
- The source object
- The current iteration index

### Return Values

- `each`: Returns the source unchanged
- `array`: Returns a new array
- `object`: Returns a new object
- `reduce`/`inject`: Returns the accumulated value
- `find`: Returns the first matching item or undefined

## License

MIT
