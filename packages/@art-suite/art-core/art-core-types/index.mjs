import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  deepEach,
  deepEachAll,
  deepMap,

  functionName,

  getSuper,
  getSuperclass,

  gt,
  gte,
  lt,
  lte,

  hasOwnProperties,
  hasProperties,
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayIterable,
  isBoolean,
  isBrowserObject,
  isClass,
  isDate,
  isDirectPrototypeOf,
  isEmptyObject,
  isError,
  isExtendedClass,
  isFunction,
  isJsonAtomicType,
  isJsonType,
  isNonNegativeInt,
  isNumber,
  isObject,
  isPlainArray,
  isPlainObject,
  isPlainObjectFast,
  isPromise,
  isRegExp,
  isString,
  isTypedArray,
  objectName,
  exists,
  present,
  stringIsPresent,

  isNull,
  isNotNull,
  isNullish,
  isNotNullish,
} = require('./build');
