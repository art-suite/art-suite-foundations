// Assuming ArtPromise is a custom Promise implementation provided by this library.
// It should be Thenable and ideally Promise A+ compatible.

export interface ArtPromise<T> extends PromiseLike<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the ArtPromise.
   * @param onfulfilled The callback to execute when the ArtPromise is resolved.
   * @param onrejected The callback to execute when the ArtPromise is rejected.
   * @returns An ArtPromise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): ArtPromise<TResult1 | TResult2>;

  /**
   * Attaches a callback for only the rejection of the ArtPromise.
   * @param onrejected The callback to execute when the ArtPromise is rejected.
   * @returns An ArtPromise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): ArtPromise<T | TResult>;

  /**
   * Attaches a callback that is invoked when the ArtPromise is settled (fulfilled or rejected).
   * @param onfinally The callback to execute when the ArtPromise is settled.
   * @returns An ArtPromise that will be settled with the same outcome as the original ArtPromise.
   */
  finally(onfinally?: (() => void) | undefined | null): ArtPromise<T>;

  // Static methods similar to standard Promise, if applicable
  // static resolve<T>(value: T | PromiseLike<T>): ArtPromise<T>;
  // static reject<T = never>(reason?: any): ArtPromise<T>;
  // static all<T>(values: Iterable<T | PromiseLike<T>>): ArtPromise<T[]>;
  // ... etc.
}

// If 'Promise' is a class constructor:
export declare class Promise<T> implements ArtPromise<T> {
  constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): ArtPromise<TResult1 | TResult2>;
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): ArtPromise<T | TResult>;
  finally(onfinally?: (() => void) | undefined | null): ArtPromise<T>;

  static resolve<V>(value: V | PromiseLike<V>): ArtPromise<V>;
  static reject<V = never>(reason?: any): ArtPromise<V>;
  static all<V>(values: readonly (V | PromiseLike<V>)[]): ArtPromise<V[]>;
  static race<V>(values: readonly (V | PromiseLike<V>)[]): ArtPromise<V>;
  // Add other static methods if your custom Promise class has them (e.g., allSettled, any)
}

export declare class PromiseWorkerPool {
  /**
   * Creates a pool of promise-based workers with limited concurrency.
   * @param concurrency The maximum number of tasks to run concurrently.
   */
  constructor(concurrency: number);

  /**
   * Adds a task to the worker pool.
   * The task is a function that returns a Promise.
   * @returns A Promise that resolves or rejects with the result of the task.
   */
  add<T>(task: () => PromiseLike<T>): ArtPromise<T>; // Assuming tasks return ArtPromise or compatible
}

export declare class Serializer {
  /**
   * Creates a Serializer to ensure promise-returning functions run one after another.
   */
  constructor();

  /**
   * Adds a promise-returning function to the serialization queue.
   * The function will only be invoked after all previously added functions have settled.
   * @returns A Promise that resolves or rejects with the result of the task.
   */
  add<T>(task: () => PromiseLike<T>): ArtPromise<T>; // Assuming tasks return ArtPromise or compatible
}

/**
 * Checks if a value is a Promise (specifically, an instance of the library's ArtPromise or a thenable).
 * @param value The value to check.
 */
export function isPromise(value: any): value is PromiseLike<any>; // Or `value is ArtPromise<any>` if more specific

/**
 * Checks if a value or any nested part of it (in arrays or objects) is a Promise.
 * @param value The value to check, which can be a nested structure.
 */
export function containsPromises(value: any): boolean;

/**
 * Attaches a Node.js-style callback to a Promise.
 * @param promise The promise to attach the callback to.
 * @param callback The callback function `(error, value) => void`.
 */
export function withCallback<T>(promise: PromiseLike<T>, callback: (error?: any, value?: T) => void): void;

interface ExternallyResolvable<T> {
  promise: ArtPromise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

/**
 * Creates a new ArtPromise that can be resolved or rejected externally.
 * @returns An object containing the promise and its resolve/reject functions.
 */
export function newExternallyResolvable<T>(): ExternallyResolvable<T>;

/**
 * Recursively resolves all Promises found in a nested data structure (objects or arrays).
 * @param collection A value, array, or object potentially containing promises.
 * @returns An ArtPromise that resolves with the same structure, but with all promises resolved.
 */
export function deepAll<T>(collection: T): ArtPromise<DeepResolve<T>>;

// Helper type for deepAll
export type DeepResolve<T> = T extends PromiseLike<infer U>
  ? U
  : T extends object
  ? { [K in keyof T]: DeepResolve<T[K]> }
  : T;

/**
 * Runs an array of promise-returning functions sequentially.
 * @param tasks An array of functions, each returning a Promise.
 * @returns An ArtPromise that resolves with an array of results from the tasks.
 */
export function serialize<T>(tasks: (() => PromiseLike<T>)[]): ArtPromise<T[]>;

/**
 * Inverts the outcome of a Promise. If it resolves, the returned promise rejects with the resolution value.
 * If it rejects, the returned promise resolves with the rejection reason.
 * @param promise The promise to invert.
 */
export function invert<T>(promise: PromiseLike<T>): ArtPromise<any>; // Resolves with rejection reason, rejects with resolution value

/**
 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected).
 * This is a standalone utility function.
 * @param promise The promise to attach the finally callback to.
 * @param onFinally The callback to execute when the promise is settled.
 */
export function promiseFinally<T>(promise: PromiseLike<T>, onFinally: () => void): ArtPromise<T>;

/**
 * Attaches callbacks for the resolution and/or rejection of the Promise.
 * This is a standalone utility function.
 * @param promise The promise to attach callbacks to.
 * @param onFulfilled The callback to execute when the promise is resolved.
 * @param onRejected The callback to execute when the promise is rejected.
 */
export function promiseThen<T, TResult1 = T, TResult2 = never>(
  promise: PromiseLike<T>,
  onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
  onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
): ArtPromise<TResult1 | TResult2>;

/**
 * Rejects a promise if it doesn't settle within a specified time (in milliseconds).
 * @param promise The promise to apply the timeout to.
 * @param ms The timeout duration in milliseconds.
 * @param timeoutReason Optional reason for rejection on timeout.
 */
export function timeout<T>(promise: PromiseLike<T>, ms: number, timeoutReason?: any): ArtPromise<T>;

/**
 * Rejects a promise if it doesn't settle by a specific timestamp (Date.now() format).
 * @param promise The promise to apply the timeout to.
 * @param timestamp The absolute timestamp by which the promise must settle.
 * @param timeoutReason Optional reason for rejection on timeout.
 */
export function timeoutAt<T>(promise: PromiseLike<T>, timestamp: number, timeoutReason?: any): ArtPromise<T>;

interface IntervalControls {
  stop: () => void;
  promise: ArtPromise<void>; // Resolves when the interval is stopped or handler throws
}

/**
 * Creates a repeating interval that executes a handler function.
 * The interval can be stopped, and its completion (or error) can be awaited.
 * @param ms The interval duration in milliseconds.
 * @param handler A function to execute at each interval. If it returns false or a promise resolving to false, the interval stops.
 * @returns An object with `stop` function and a `promise` for the interval's lifecycle.
 */
export function interval(ms: number, handler: () => (void | boolean | PromiseLike<void | boolean>)): IntervalControls;

/**
 * Returns an ArtPromise that resolves with the timestamp passed to `requestAnimationFrame` callback.
 */
export function requestAnimationFrame(): ArtPromise<number>;

/**
 * Returns an ArtPromise that resolves on the next tick of the event loop.
 */
export function nextTick(): ArtPromise<void>;

/**
 * Throws an error using `setTimeout(..., 0)` to ensure it's out of the current promise/call stack.
 * @param error The error to throw.
 */
export function throwErrorOutOfStack(error: any): void;

/**
 * Evaluates a function and if it throws, the error is re-thrown out of the current promise/call stack.
 * @param fn The function to evaluate.
 */
export function evalAndThrowErrorsOutOfStack(fn: () => any): void;