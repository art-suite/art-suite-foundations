# @art-suite/art-core-promises

A comprehensive utility library for working with JavaScript Promises, offering enhanced control, concurrency management, and utility functions. Plus, many helpful utility methods. Built on blackbird promise.

## Features

- Custom `Promise` implementation (or extensions) with robust typing.
- `PromiseWorkerPool` for managing concurrent promise-based tasks.
- `Serializer` for ensuring sequential execution of promises.
- Utilities for external promise resolution, deep resolution of promises in structures, and more.
- Async utilities like `interval`, `requestAnimationFrame`, and `nextTick` returning Promises.
- Advanced error handling mechanisms for asynchronous operations.
- TypeScript definitions for complete type safety.

## Installation

```bash
npm install @art-suite/art-core-promises
```

## API Overview

### Core Promise & Resolution

- **`Promise`**: The core custom Promise class/interface.
- **`isPromise(value: any): boolean`**: Checks if a value is a promise.
- **`newExternallyResolvable<T>(): { promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }`**: Creates a new promise that can be resolved or rejected externally.
- **`withCallback(promise: Promise<any>, callback: (error?: any, value?: any) => void): void`**: Attaches a Node.js-style callback to a promise.

### Promise Utilities

- **`containsPromises(value: any): boolean`**: Checks if a value or a nested structure contains any promises.
- **`deepAll(value: any): Promise<any>`**: Resolves all promises within a nested structure (objects, arrays).
- **`invert(promise: Promise<any>): Promise<any>`**: Inverts a promise's outcome (resolution becomes rejection and vice-versa).
- **`timeout(promise: Promise<T>, ms: number, timeoutReason?: any): Promise<T>`**: Rejects a promise if it doesn't settle within a specified time.
- **`timeoutAt(promise: Promise<T>, timestamp: number, timeoutReason?: any): Promise<T>`**: Rejects a promise if it doesn't settle by a specific timestamp.
- **`then(promise: Promise<T>, onFulfilled?, onRejected?): Promise<R>`**: A utility for `then` chaining, potentially for the custom `Promise`.
- **`finally(promise: Promise<any>, onFinally: () => void): Promise<any>`**: A utility for `finally` chaining, potentially for the custom `Promise`.

### Concurrency & Sequencing

- **`PromiseWorkerPool`**: A class to manage a pool of promise-based workers with limited concurrency.
  - `constructor(concurrency: number)`
  - `add<T>(task: () => Promise<T>): Promise<T>`
- **`Serializer`**: A class to serialize promise-returning functions, ensuring they run one after another.
  - `constructor()`
  - `add<T>(task: () => Promise<T>): Promise<T>`
- **`serialize(tasks: (() => Promise<any>)[]): Promise<any[]>`**: A function to run an array of promise-returning functions sequentially.

### Async & Timing Utilities

- **`interval(ms: number, handler: () => (void | boolean | Promise<void | boolean>)): { stop: () => void, promise: Promise<void> }`**: Creates a repeating interval that can be stopped and whose completion can be awaited.
- **`requestAnimationFrame(): Promise<number>`**: Returns a promise that resolves with the timestamp from `requestAnimationFrame`.
- **`nextTick(): Promise<void>`**: Returns a promise that resolves on the next tick of the event loop.

### Error Handling

- **`throwErrorOutOfStack(error: any): void`**: Throws an error in a way that it's less likely to be caught by local promise catch handlers, typically by using a timeout.
- **`evalAndThrowErrorsOutOfStack(fn: () => any): void`**: Evaluates a function and throws any errors out of the current stack.

## Examples

### Externally Resolvable Promise

```typescript
import { newExternallyResolvable } from "@art-suite/art-core-promises";

const ert = newExternallyResolvable<string>();

ert.promise.then(value => console.log(\`Resolved with: \${value}\`));

setTimeout(() => ert.resolve("Hello from the future!"), 1000);
```

### PromiseWorkerPool

```typescript
import { PromiseWorkerPool } from "@art-suite/art-core-promises";

const pool = new PromiseWorkerPool(2); // Max 2 concurrent tasks

const tasks = [
  () => new Promise(resolve => setTimeout(() => resolve(1), 100)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),
  () => new Promise(resolve => setTimeout(() => resolve(3), 150)),
];

tasks.forEach(task => {
  pool.add(task).then(result => console.log(\`Task completed: \${result}\`));
});
// Will run task 1 & 2 concurrently, then task 3.
```

### Deep All

```typescript
import { deepAll, Promise as ArtPromise } from "@art-suite/art-core-promises"; // Assuming custom Promise

const data = {
  user: ArtPromise.resolve({ id: 1, name: "Alice" }),
  posts: [
    ArtPromise.resolve({ title: "Post 1" }),
    Promise.resolve({ title: "Post 2" }), // Mix with standard promises
  ],
  settings: {
    darkMode: ArtPromise.resolve(true),
  },
};

deepAll(data).then((resolvedData) => {
  console.log(resolvedData.user.name); // Alice
  console.log(resolvedData.posts[0].title); // Post 1
});
```

## License

MIT
