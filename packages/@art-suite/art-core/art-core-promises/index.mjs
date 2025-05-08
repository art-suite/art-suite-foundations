import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  PromiseWorkerPool,
  Promise,
  isPromise,
  containsPromises,
  withCallback,
  newExternallyResolvable,
  deepAll,
  Serializer,
  serialize,
  invert,
  finally: promiseFinally, // aliasing because 'finally' is a reserved word
  then: promiseThen,       // aliasing in case 'then' causes issues in some contexts or for clarity
  timeout,
  timeoutAt,
  interval,
  requestAnimationFrame,
  nextTick,
  throwErrorOutOfStack,
  evalAndThrowErrorsOutOfStack
} = require('./build');

// Re-export aliased names if direct names are preferred by convention in the project
// If 'Promise.prototype.then' and 'Promise.prototype.finally' are the primary way,
// then the standalone 'then' and 'finally' utilities might be named differently or
// this re-export might not be needed if the build step handles it.
export { promiseFinally as finally, promiseThen as then };