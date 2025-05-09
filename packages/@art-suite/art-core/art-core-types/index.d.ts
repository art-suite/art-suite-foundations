/**
 * Gets the name of a function.
 */
export function functionName(f: Function): string;

/**
 * Gets the super/parent object of the provided object.
 */
export function getSuper(o: object | Function): object | Function;

/**
 * Gets the superclass of a class.
 */
export function getSuperclass(klass: Function): Function | undefined;

/**
 * Tests if a is greater than b with support for custom object comparison.
 */
export function gt(a: any, b: any): boolean;

/**
 * Tests if a is greater than or equal to b with support for custom object comparison.
 */
export function gte(a: any, b: any): boolean;

/**
 * Tests if a is less than b with support for custom object comparison.
 */
export function lt(a: any, b: any): boolean;

/**
 * Tests if a is less than or equal to b with support for custom object comparison.
 */
export function lte(a: any, b: any): boolean;

/**
 * Checks if an object has its own properties.
 */
export function hasOwnProperties(o: any): boolean;

/**
 * Checks if an object has properties (including inherited ones).
 */
export function hasProperties(o: any): boolean;

/**
 * Tests if an object is an arguments object.
 */
export function isArguments(o: any): boolean;

/**
 * Tests if an object is an array.
 */
export function isArray(obj: any): obj is Array<any>;

/**
 * Tests if an object is an ArrayBuffer.
 */
export function isArrayBuffer(obj: any): obj is ArrayBuffer;

/**
 * Tests if an object is iterable like an array (has length property).
 */
export function isArrayIterable(source: any): boolean;

/**
 * Tests if a value is a boolean.
 */
export function isBoolean(obj: any): obj is boolean;

/**
 * Tests if an object is a browser-specific object (HTML elements, Canvas context).
 */
export function isBrowserObject(obj: any): boolean;

/**
 * Tests if a function is a class constructor.
 */
export function isClass(obj: any): boolean;

/**
 * Tests if an object is a Date.
 */
export function isDate(obj: any): obj is Date;

/**
 * Tests if an object is a direct prototype of another.
 */
export function isDirectPrototypeOf(o: any, prototype: any): boolean;

/**
 * Tests if an object has no properties.
 */
export function isEmptyObject(obj: any): boolean;

/**
 * Tests if an object is an Error instance.
 */
export function isError(obj: any): obj is Error;

/**
 * Tests if a function is a class that extends another class.
 */
export function isExtendedClass(obj: any): boolean;

/**
 * Tests if a value is a function.
 */
export function isFunction(obj: any): obj is Function;

/**
 * Tests if a value is a JSON atomic type (string, number, boolean, null).
 */
export function isJsonAtomicType(a: any): boolean;

/**
 * Tests if a value is a JSON-compatible type.
 */
export function isJsonType(a: any): boolean;

/**
 * Tests if a value is a non-negative integer.
 */
export function isNonNegativeInt(x: any): boolean;

/**
 * Tests if a value is a number.
 */
export function isNumber(obj: any): obj is number;

/**
 * Tests if a value is an object (not null and not an array).
 */
export function isObject(obj: any): boolean;

/**
 * Tests if a value is a plain array.
 */
export function isPlainArray(obj: any): obj is Array<any>;

/**
 * Tests if a value is a plain object (simple key-value object).
 */
export function isPlainObject(v: any): boolean;

/**
 * Faster but less reliable version of isPlainObject.
 */
export function isPlainObjectFast(v: any): boolean;

/**
 * Tests if an object is a Promise.
 */
export function isPromise(obj: any): boolean;

/**
 * Tests if an object is a RegExp.
 */
export function isRegExp(obj: any): obj is RegExp;

/**
 * Tests if a value is a string.
 */
export function isString(obj: any): obj is string;

/**
 * Tests if an object is a typed array.
 */
export function isTypedArray(obj: any): boolean;

/**
 * Gets a descriptive name for an object.
 */
export function objectName(obj: any): string;

/**
 * Tests if a value is present (not null, undefined, false or empty string).
 */
export function present(obj: any, returnIfNotPresent?: any): any;

/**
 * Tests if a string has content (not empty or just whitespace).
 */
export function stringIsPresent(str: string): boolean;

/**
 * Tests if a value exists: i.e. is not null or undefined (false, '', 0, NaN, etc. all 'exist')
 */
export function exists(value: any): boolean;
