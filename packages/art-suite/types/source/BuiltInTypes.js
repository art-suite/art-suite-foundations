let { Array, ArrayBuffer, Date, RegExp, Object, Function, ArtSuiteTypesMultiContextSupport } = global;

let
  isArguments = (obj) => (obj != null) && typeof obj.length === "number" && obj.toString() === '[object Arguments]',
  isArray = Array.isArray,
  isBoolean = (obj) => obj === true || obj === false,
  isNumber = (obj) => typeof obj === "number",
  isObject = (obj) => (obj != null) && typeof obj === "object" && !isArray(obj),
  isPromise = (obj) => (obj != null) && isFunction(obj.then) && !isFunction(obj),
  isString = (obj) => typeof obj === "string",
  isTypedArray = (obj) => (obj != null ? obj.length : void 0) >= 0 && obj.length === (obj.length | 0) && isArrayBuffer(obj.buffer);

let isArrayUniversal = isPlainArray = isArray;
let isPlainObjectUniversal = function (v) { return (v != null) && null === Object.getPrototypeOf(Object.getPrototypeOf(v)) };

let isFunction, isClass, isError, isArrayBuffer, isDate, isRegExp, isPlainObject;

if (ArtSuiteTypesMultiContextSupport) {
  isFunction = (obj) => (typeof obj === "function") && obj.constructor.name === "Function";
  isError = (obj) => obj instanceof Error || (obj != null ? obj.constructor.name : void 0) === "Error";
  isArrayBuffer = (obj) => (obj != null ? obj.constructor.name : void 0) === "ArrayBuffer";
  isDate = (obj) => (obj != null ? obj.constructor.name : void 0) === "Date";
  isRegExp = (obj) => (obj != null ? obj.constructor.name : void 0) === "RegExp";
  isPlainObject = isPlainObjectUniversal;

} else {
  isFunction = (obj) => (typeof obj === "function") && obj.constructor === Function;
  isError = (obj) => obj instanceof Error;
  isArrayBuffer = (obj) => (obj != null ? obj.constructor : void 0) === ArrayBuffer;
  isDate = (obj) => (obj != null ? obj.constructor : void 0) === Date;
  isRegExp = (obj) => (obj != null ? obj.constructor : void 0) === RegExp;
  isPlainObject = (obj) => (obj != null ? obj.constructor : void 0) === Object;
}

module.exports = {
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayBuffer,
  isArrayUniversal,
  isBoolean,
  isDate,
  isError,
  isFunction,
  isNumber,
  isObject,
  isPlainArray,
  isPlainObject,
  isPromise,
  isRegExp,
  isString,
  isTypedArray
};
