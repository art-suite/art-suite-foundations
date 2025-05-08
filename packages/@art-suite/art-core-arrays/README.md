# @art-suite/art-core-arrays

A high-performance utility library for working with arrays in a pure-functional way.

## Features

- Powerful operations for working with sparse arrays and nested arrays
- Pure functional approach - most operations return new arrays rather than modifying existing ones
- Optimized for performance while maintaining clean semantics
- TypeScript definitions for complete type safety

## Installation

```bash
npm install @art-suite/art-core-arrays
```

## API Overview

### Types

The library provides several useful TypeScript types:

- `SparseArray<T>` - Arrays that may contain null/undefined values
- `NestedArray<T>` - Arrays that may contain other arrays recursively
- `SparseNestedArray<T>` - Recursive arrays that may contain null/undefined values

### Array Transformation

#### Filtering and Flattening

```typescript
// Remove null/undefined or items that don't pass the tester
compact<T>(inputArray: SparseArray<T>, keepTester?: (value: T) => boolean): T[]

// Flatten nested arrays into a single-level array
flatten<T>(...args: NestedArray<T>[]): T[]

// Flatten nested arrays and remove null/undefined values
compactFlatten<T>(inputArray: SparseNestedArrayOrSingleton<T>): T[]

// Flatten multiple arrays and remove null/undefined values
compactFlattenAll<T>(...args: SparseNestedArray<T>[]): T[]

// Custom filtering while flattening
customCompactFlatten<T>(inputArray: SparseNestedArray<T>, customKeepTester: (value: T) => boolean): T[]
```

#### Non-Mutating Operations (Pure Functional)

These functions create new arrays without modifying the original:

```typescript
// Add an element to the end of an array
arrayWith<T>(inputArray: T[] | null | undefined, value: T): T[]

// Get part of an array before an index
arrayWithLeftOfIndex<T>(inputArray: T[] | null | undefined, index: number): T[]

// Get part of an array after an index
arrayWithRightOfIndex<T>(inputArray: T[] | null | undefined, index: number): T[]

// Get part of an array before a value
arrayWithLeftOf<T>(inputArray: T[], value: T): T[]

// Get part of an array after a value
arrayWithRightOf<T>(inputArray: T[], value: T): T[]

// Create a shuffled copy of an array
arrayWithRandomSort<T>(inputArray: T[] | null | undefined): T[]

// Insert an item at a specific index
arrayWithInsertedAt<T>(inputArray: T[], index: number, item: T): T[]

// Create a sorted copy
arrayWithSort<T>(inputArray?: T[], sortFunction?: (a: T, b: T) => number): T[]

// Remove element(s) at an index
arrayWithout<T>(inputArray: T[] | null | undefined, index?: number, amount?: number): T[]

// Remove a specific value
arrayWithoutValue<T>(inputArray: T[] | null | undefined, value: T): T[]

// Remove the last element(s)
arrayWithoutLast<T>(inputArray: T[] | null | undefined, amount?: number): T[]

// Add a value if it doesn't already exist
arrayWithExactlyOne<T>(inputArray: T[] | null | undefined, value: T): T[]

// Move an element by index
arrayWithElementMoved<T>(inputArray: T[], fromIndex: number, toIndex: number): T[]

// Move an element by value
arrayWithElementValueMoved<T>(inputArray: T[], value: T, toIndex: number): T[]

// Replace an element at an index
arrayWithElementReplaced<T>(inputArray: T[], value: T, index: number): T[]

// Truncate array and add a value
truncatedArrayWith<T>(inputArray: T[] | null | undefined, length: number, value: T): T[]

// Create array with only unique values
arrayWithUniqueValues<T>(sortedArray: T[], eqF?: (a: T, b: T) => boolean): T[]
```

#### Mutating Operations

These functions modify the original array:

```typescript
// Remove and return the last element
pop<T>(inputArray: T[] | null | undefined): T | undefined

// Add element to the end
push<T>(inputArray: T[] | null | undefined, element: T): T[]

// Insert an item at an index
insertIntoArray<T>(inputArray: T[], index: number, item: T): T[]

// Move an element from one position to another
moveArrayElement<T>(inputArray: T[], fromIndex: number, toIndex: number): T[]

// Remove elements at an index
remove<T>(inputArray: T[], index: number, amount?: number): T[]

// Remove the first matching value
removeFirstMatch<T>(inputArray: T[], toMatchValue: T): T[]

// Randomly reorder array elements
shuffleArray<T>(inputArray: T[]): T[]

// Stable sort (maintains order of equal elements)
stableSort<T>(inputArray: T[], compareFunction?: (a: T, b: T) => number): T[]
```

### Array Inspection

```typescript
// Get the last element (or at offset from end) without modifying
peek<T>(inputArray: T[] | null | undefined, offset?: number): T | undefined

// Find index of element or array length if not found
getIndexOfOrLength<T>(inputArray: T[], value: T): number

// Find the smallest element according to compare function
findSortedFirst<T>(inputArray: T[] | null | undefined, compareFunction?: (a: T, b: T) => number): T | undefined
```

### Iteration

```typescript
// Recursively iterate over nested arrays
deepArrayEach<T>(inputArray: NestedArray<T>[], f: (value: T) => void): NestedArray<T>[]
```

### Utilities

```typescript
// Create a predicate function that returns true if not null/undefined
keepUnlessNullOrUndefined<T>(a: T): boolean

// Create array from strings, splitting on whitespace
w<T>(...args: SparseNestedArray<string | T>): (string | T)[]
```

## Examples

```typescript
import {
  compact,
  compactFlatten,
  arrayWith,
  arrayWithout,
  w,
} from "@art-suite/art-core-arrays";

// Remove null/undefined values
compact([1, null, 2, undefined, 3]); // [1, 2, 3]

// Custom filtering
compact([1, 2, 3, 4, 5], (x) => x % 2 === 0); // [2, 4]

// Flatten nested arrays and remove null/undefined
compactFlatten([1, [2, null], [[3, undefined], 4]]); // [1, 2, 3, 4]

// Add element to array without mutation
const originalArray = [1, 2, 3];
const newArray = arrayWith(originalArray, 4); // [1, 2, 3, 4]
// originalArray is still [1, 2, 3]

// Remove element from array without mutation
arrayWithout([1, 2, 3, 4], 1); // [1, 3, 4]

// String to array utility
w("hello world"); // ["hello", "world"]
w("one", "two three"); // ["one", "two", "three"]
```

## License

MIT
