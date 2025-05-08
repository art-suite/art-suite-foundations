# @art-suite/art-core-math

A high-performance utility library for mathematical operations with a focus on precision management and practical use cases.

## Features

- Consistent handling of floating-point precision issues
- Specialized comparisons for both absolute and relative values
- Random number generation utilities with seeding capabilities
- TypeScript definitions for complete type safety

## Installation

```bash
npm install @art-suite/art-core-math
```

## API Overview

### Basic Math Operations

Core mathematical functions that provide consistent behavior across platforms:

```typescript
// Absolute value
abs(value: number): number

// Rounding operations
floor(value: number): number
ceil(value: number): number
round(value: number, decimalPlaces?: number): number

// Integer and fractional parts
iPart(value: number): number   // Integer part
fPart(value: number): number   // Fractional part

// Min/Max operations
min(...values: number[]): number
max(...values: number[]): number
minMagnitude(...values: number[]): number  // Returns value with smallest absolute value
maxMagnitude(...values: number[]): number  // Returns value with largest absolute value

// Modulo that works correctly with negative numbers
modulo(dividend: number, divisor: number): number  // Unlike % operator, always returns positive result
```

### Floating-Point Precision Handling

Functions that deal with floating-point precision issues, which can cause unexpected comparison results:

```typescript
// Constants for precision thresholds
float32Precision: number  // Precision for 32-bit floats
float64Precision: number  // Precision for 64-bit floats

// Float32 comparison (for 32-bit floating point operations)
float32Eq(a: number, b: number): boolean    // Equal within float32 precision
float32Eq0(value: number): boolean          // Equal to zero within float32 precision
float32Gt(a: number, b: number): boolean    // Greater than, accounting for precision
float32Gte(a: number, b: number): boolean   // Greater than or equal, accounting for precision
float32Lt(a: number, b: number): boolean    // Less than, accounting for precision
float32Lte(a: number, b: number): boolean   // Less than or equal, accounting for precision
float32True0(value: number): number         // Returns 0 if within float32 precision of 0

// Float64 comparison (for standard JavaScript numbers)
floatEq(a: number, b: number): boolean      // Equal within float64 precision
floatEq0(value: number): boolean            // Equal to zero within float64 precision
floatGt(a: number, b: number): boolean      // Greater than, accounting for precision
floatGte(a: number, b: number): boolean     // Greater than or equal, accounting for precision
floatLt(a: number, b: number): boolean      // Less than, accounting for precision
floatLte(a: number, b: number): boolean     // Less than or equal, accounting for precision
floatTrue0(value: number): number           // Returns 0 if within float64 precision of 0
```

### Absolute Value Comparisons

Convenience functions for comparing the absolute values directly:

```typescript
absGt(a: number, b: number): boolean     // |a| > b
absGte(a: number, b: number): boolean    // |a| >= b
absLt(a: number, b: number): boolean     // |a| < b
absLte(a: number, b: number): boolean    // |a| <= b
```

### Value Constraints and Transformations

Functions for constraining or transforming numeric values:

```typescript
// Constrain a value between min and max
bound(value: number, min: number, max: number): number

// Limit the amount a value can change
maxChange(value: number, targetValue: number, maxChange: number): number

// Very large number handling
nearInfinity(): number            // Returns a very large number just below infinity
nearInfinityResult: number        // Pre-computed result of nearInfinity()
```

### Random Number Generation

Utilities for generating random values:

```typescript
// Basic random generation
random(): number                                    // Random number between 0 and 1
boolRand(): boolean                                // Random boolean (true or false)
intRand(min: number, max: number): number          // Random integer between min and max inclusive

// Seeded random generation for reproducible sequences
seededRandomNumberGenerator(seed: number): () => number  // Creates a random generator with a specific seed
```

### Number Formatting and Conversion

Functions for formatting numbers as strings and converting between formats:

```typescript
// String formatting
commaize(value: number): string                // Adds commas as thousands separators
numberToTightString(value: number): string     // Compact string representation without unnecessary digits
simplifyNum(value: number): number             // Removes trailing zeros and decimal point if possible

// Conversion
stringToNumberArray(str: string): number[]     // Converts a string of numbers to an array of numbers
```

### Special Utilities

Other mathematical utilities for specific use cases:

```typescript
// Sequence generator
cyclingSequenceFunction(sequence: any[]): () => any  // Creates a function that cycles through a sequence
```

## Examples

### Dealing with Floating-Point Precision

```typescript
import { floatEq, floatTrue0 } from "@art-suite/art-core-math";

// Floating-point precision issues
0.1 + 0.2 === 0.3; // false! (equals 0.30000000000000004)
floatEq(0.1 + 0.2, 0.3); // true

// Clean up small floating-point errors
floatTrue0(1e-16); // 0
```

### Bounded Values for Animation

```typescript
import { bound, maxChange } from "@art-suite/art-core-math";

// Ensure value stays within range
bound(velocity, -maxSpeed, maxSpeed); // Clamping a velocity

// Smooth transitions
let currentPosition = 0;
const targetPosition = 100;

// Each frame, move toward target with limited change rate
function animationFrame() {
  currentPosition = maxChange(currentPosition, targetPosition, 5);
  // This ensures we move at most 5 units per frame
}
```

### Consistent Modulo

```typescript
import { modulo } from "@art-suite/art-core-math";

// JavaScript % operator doesn't behave as expected with negative numbers
-5 % 12; // -5
modulo(-5, 12); // 7 (always gives positive result, better for cyclic values)
```

### Random Number Generation

```typescript
import {
  random,
  intRand,
  seededRandomNumberGenerator,
} from "@art-suite/art-core-math";

// Random value between 0 and 1
const probability = random();

// Random integer (inclusive range)
const diceRoll = intRand(1, 6);

// Reproducible random sequence
const seededRandom = seededRandomNumberGenerator(12345);
const value1 = seededRandom(); // Same value every time with seed 12345
const value2 = seededRandom(); // Same second value every time
```

### Number Formatting

```typescript
import { commaize, numberToTightString } from "@art-suite/art-core-math";

// Add thousands separators
commaize(1234567); // "1,234,567"

// Compact representation
numberToTightString(123.0); // "123"
numberToTightString(123.45); // "123.45"
```

## License

MIT
