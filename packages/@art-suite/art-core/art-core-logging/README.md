# @art-suite/art-core-logging

This exists for two reasons:

1. Why are logs so hard to read? They don't need to be! Now you can quickly read 10x more complicated logs at a glance
2. Easily add and remove logging even in the middle of an expression. Since each log command returns the last value passed into it, you can just wrap any value or expression in a log statement to log it w/o changing your code. Need more context in your log? Just add any thing else you want to log before the actual value you want to return. This works especially well in more functional, less-imperative coding styles.

A powerful and flexible logging utility for Node.js and browser environments. Provides advanced inspection, call stack analysis, conditional logging, and various output formatting options.

## Features

- Versatile `log` function with sub-methods for different log levels and options (`log.error`, `log.warn`, `log.full`, `log.unquoted`).
- Customizable logging with `log.withOptions` and labeled logging with `log.labeled`.
- Dynamic control over logging output with `showLogging()` and `hideLogging()`.
- Promise-specific logging utilities: `logPromise`, `logPromiseProblems`, `logPromiseErrors`, `logRejectedPromises`.
- Detailed call stack information: `CallStackLine` class, `rawCallStack()`, `callStack()`
- Advanced object inspection: `failsafeInspect`, `formattedInspect`, `InspectedObjectLiteral` for custom output, and `toInspectedObjects` factory.
- Utility for converting errors to strings (`errorToString`).
- Tab alignment for cleaner console output (`alignTabs`).
- Control over whitespace formatting in logs (`postWhitespaceFormatting`).
- TypeScript definitions for complete type safety.

## Expressive Inline Logging (Passthrough Logging)

> Inspecting any point in your code via logging just got 10x easier.

One of the most powerful features of this logging library is its ability to seamlessly integrate logging into your expressions without breaking your code flow. Since each log command returns the last value passed into it, you can wrap any value or expression in a log statement without changing your code's behavior.

It's so much easier to both add and remove a log statement, especially if you code in a more functional vs imperative style.

### Examples

```javascript
// Log a value while still using it
const result = log(complexCalculation()); // logs the result AND returns it

// Log intermediate values in a chain
const finalResult = someArray
  .map(log) // logs each item as it's processed
  .filter((x) => x > 0)
  .reduce((a, b) => a + b);

// Log with additional context
const value = log("Processing item:", someValue, returnedValue); // logs both the message and value, returns the value

// Log in the middle of an expression
const result = processData(
  log("Input:", input), // logs input and passes it through, but the "Input:" string is just for logging
  otherParam
);

// Log multiple values but return the last one
const finalValue = log(
  "Step 1:",
  step1Result,
  "Step 2:",
  step2Result,
  finalResult // this is what gets returned
);
```

This is much more convenient than the traditional approach of breaking out expressions into temporary variables just for logging:

```javascript
// Old way - requires temporary variables
const temp = complexCalculation();
console.log(temp);
const result = temp;

// New way - clean and concise
const result = log(complexCalculation());
```

## Installation

```bash
npm install @art-suite/art-core-logging
```

## API Overview

### Core Logging Function (`log`)

- **`log(message?: any, ...optionalParams: any[]): void`**: The main logging function. Also acts as an object with sub-methods:
  - **`log.full(message?: any, ...optionalParams: any[]): void`**: Logs with maximum array/object inspection depth.
  - **`log.withOptions(options: LogOptions): (...args: any[]) => void`**: Returns a new log function configured with the given options.
  - **`log.labeled(...args: any[]): void`**: Logs arguments as labeled key-value pairs (especially useful in CoffeeScript/CaffeineScript).
  - **`log.unquoted(message?: any, ...optionalParams: any[]): void`**: Logs strings without quotes and arrays/objects without brackets/braces.
  - **`log.error(message?: any, ...optionalParams: any[]): void`**: Logs a message as an error.
  - **`log.warn(message?: any, ...optionalParams: any[]): void`**: Logs a message as a warning.

### Logging Control

- **`showLogging(): void`**: Enables logging output.
- **`hideLogging(): void`**: Disables logging output.

### Promise Logging

- **`logPromise(promise: Promise<any>, label?: string): Promise<any>`**: Logs the resolution/rejection of a promise.
- **`logPromiseProblems(promise: Promise<any>, label?: string): Promise<any>`**: Logs only rejections of a promise.
- **`logPromiseErrors(promise: Promise<any>, label?: string): Promise<any>`**: Similar to `logPromiseProblems`, focuses on errors.
- **`logRejectedPromises(promise: Promise<any>, label?: string): Promise<any>`**: Specifically logs rejected promises.

### Call Stack Utilities

- **`CallStackLine`**: A class representing a single line/frame in a call stack, providing parsed details.
- **`rawCallStack(ignoreTop?: number): string[]`**: Returns the raw call stack as an array of strings.
- **`callStack(ignoreTop?: number): CallStackLine[]`**: Returns the call stack as an array of `CallStackLine` objects.

### Inspection and Formatting

- **`errorToString(error: any): string`**: Converts an error object or any value to a string representation.
- **`alignTabs(text: string): string`**: Aligns text based on tab characters for better readability.
- **`failsafeInspect(value: any, options?: object): string`**: Inspects a value, attempting to produce a string representation without throwing errors.
- **`formattedInspect(value: any, options?: object): string`**: Provides a more detailed and formatted inspection of a value.
- **`toInspectedObjects(value: any): string | InspectedObjectLiteral | object`**: Factory/helper related to custom inspection; objects can implement a `toInspectedObjects()` method that returns a string, an `InspectedObjectLiteral`, or a plain object for custom formatting.
- **`InspectedObjectLiteral`**: A class whose instances can be returned from `toInspectedObjects()` to provide a pre-formatted literal string that won't be further quoted by the logger.
- **`inspectedObjectLiteral(value: string): InspectedObjectLiteral`**: A factory function to create an `InspectedObjectLiteral` instance.
- **`postWhitespaceFormatting(str: string, options?: object): string`**: Applies post-processing whitespace formatting to a string, potentially based on options.

## Examples

### Basic Logging

```typescript
import { log } from "@art-suite/art-core-logging";

log("Simple message");
log.error("This is an error!", { details: "something went wrong" });
log.warn("This is a warning.");
log.full([1, 2, 3, Array(100).fill(4)]); // Shows full array
```

### Labeled Logging

```coffeescript
# CoffeeScript/CaffeineScript Example
{ log } = require "@art-suite/art-core-logging"

user = name: "Alice", age: 30
log.labeled user, status: "active"
# Output might be: user: { name: "Alice", age: 30 }, status: "active"
```

### Promise Logging

```typescript
import { logPromise, Promise } from "@art-suite/art-core-logging"; // Assuming custom Promise or polyfill

const myPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Promise resolved!"), 100)
);
logPromise(myPromise, "MyTask");
```

### Custom Inspection

```typescript
import {
  log,
  InspectedObjectLiteral,
  inspectedObjectLiteral,
} from "@art-suite/art-core-logging";

class MySpecialClass {
  constructor(private value: string) {}

  // Custom inspection for art-core-logging
  toInspectedObjects() {
    // Return a pre-formatted string that won't be quoted
    return inspectedObjectLiteral(`MySpecialClass(${this.value})`);
  }
}

const special = new MySpecialClass("Hello");
log(special); // Output might be: MySpecialClass(Hello)
```

## License

MIT
