# @art-suite/art-core-errors

ErrorWithInfo class for all those times when you need to include data with your thrown error. Also some helpful tools for getting useful information of out stack traces.

## Features

- Access to raw call stack information
- Parsed stack trace information with file, line, column, and function details
- Configurable stack trace limit
- Works in both Node.js and browsers
- TypeScript definitions for complete type safety

## Installation

```bash
npm install @art-suite/art-core-errors
```

## API Overview

### Stack Trace Functions

```typescript
// Get the raw stack trace as an array of strings
rawCallStack(ignoreTop?: number): string[]

// Get parsed stack trace information
callStack(ignoreTop?: number): CallStackLine[]

// Get or set the maximum number of stack frames to capture
stackTraceLimit: number
```

### CallStackLine Interface

```typescript
interface CallStackLine {
  original: string; // Original stack trace line
  function?: string; // Function name if available
  source?: string; // Full source URL
  class?: string; // Class name if function is a method
  classPath?: string[]; // Path to class if nested
  sourceFileName?: string; // Source file name
  sourcePath?: string; // Source path
  sourceHostWithPort?: string; // Source host and port
  sourceLine: number; // Source line number
  sourceColumn: number; // Source column number
  toString(): string; // Returns original stack trace line
}
```

## Examples

```typescript
import {
  rawCallStack,
  callStack,
  stackTraceLimit,
} from "@art-suite/art-core-errors";

// Get raw stack trace lines
const rawStack = rawCallStack();
console.log(rawStack[0]); // "at myFunction (file.js:10:20)"

// Get parsed stack trace information
const stack = callStack();
const firstFrame = stack[0];
console.log(firstFrame.function); // "myFunction"
console.log(firstFrame.sourceLine); // 10
console.log(firstFrame.sourceColumn); // 20
console.log(firstFrame.sourceFileName); // "file.js"

// Configure stack trace limit
stackTraceLimit = 20; // Capture up to 20 stack frames
```

## License

MIT
