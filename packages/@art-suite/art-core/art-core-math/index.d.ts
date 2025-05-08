/** Absolute value of a number. */
export function abs(value: number): number;

/** Test if absolute value is greater than a threshold. */
export function absGt(a: number, b: number): boolean;

/** Test if absolute value is greater than or equal to a threshold. */
export function absGte(a: number, b: number): boolean;

/** Test if absolute value is less than a threshold. */
export function absLt(a: number, b: number): boolean;

/** Test if absolute value is less than or equal to a threshold. */
export function absLte(a: number, b: number): boolean;

/** Random boolean value. */
export function boolRand(): boolean;

/** Constrains a value to be within min and max bounds. */
export function bound(value: number, min: number, max: number): number;

/** Round up to nearest integer. */
export function ceil(value: number): number;

/** Converts a number to a string with comma separators for thousands. */
export function commaize(value: number): string;

/** Creates a function that cycles through a sequence of values. */
export function cyclingSequenceFunction(sequence: any[]): () => any;

/** Tests if two float32 values are equal within precision. */
export function float32Eq(a: number, b: number): boolean;

/** Tests if a float32 value is equal to 0 within precision. */
export function float32Eq0(value: number): boolean;

/** Tests if float32 a is greater than b. */
export function float32Gt(a: number, b: number): boolean;

/** Tests if float32 a is greater than or equal to b. */
export function float32Gte(a: number, b: number): boolean;

/** Tests if float32 a is less than b. */
export function float32Lt(a: number, b: number): boolean;

/** Tests if float32 a is less than or equal to b. */
export function float32Lte(a: number, b: number): boolean;

/** The precision level for float32 comparisons. */
export const float32Precision: number;

/** Converts a float32 value to true 0 if within precision of 0. */
export function float32True0(value: number): number;

/** The precision level for float64 comparisons. */
export const float64Precision: number;

/** Tests if two floating point values are equal within precision. */
export function floatEq(a: number, b: number): boolean;

/** Tests if a floating point value is equal to 0 within precision. */
export function floatEq0(value: number): boolean;

/** Tests if floating point a is greater than b. */
export function floatGt(a: number, b: number): boolean;

/** Tests if floating point a is greater than or equal to b. */
export function floatGte(a: number, b: number): boolean;

/** Tests if floating point a is less than b. */
export function floatLt(a: number, b: number): boolean;

/** Tests if floating point a is less than or equal to b. */
export function floatLte(a: number, b: number): boolean;

/** Converts a floating point value to true 0 if within precision of 0. */
export function floatTrue0(value: number): number;

/** Round down to nearest integer. */
export function floor(value: number): number;

/** Gets the fractional part of a number. */
export function fPart(value: number): number;

/** Random integer between min and max inclusive. */
export function intRand(min: number, max: number): number;

/** Gets the integer part of a number. */
export function iPart(value: number): number;

/** Returns the maximum of two or more numbers. */
export function max(...values: number[]): number;

/** Limits the amount a value can change. */
export function maxChange(value: number, targetValue: number, maxChange: number): number;

/** Returns the value with the maximum magnitude. */
export function maxMagnitude(...values: number[]): number;

/** Returns the minimum of two or more numbers. */
export function min(...values: number[]): number;

/** Returns the value with the minimum magnitude. */
export function minMagnitude(...values: number[]): number;

/** Modulo operation that works correctly with negative numbers. */
export function modulo(dividend: number, divisor: number): number;

/** Returns a very large number just below infinity. */
export function nearInfinity(): number;

/** Returns the result of nearInfinity computation. */
export const nearInfinityResult: number;

/** Converts a number to a compact string representation. */
export function numberToTightString(value: number): string;

/** Random number between 0 and 1. */
export function random(): number;

/** Round to nearest integer or decimal place. */
export function round(value: number, decimalPlaces?: number): number;

/** Creates a random number generator with a specific seed. */
export function seededRandomNumberGenerator(seed: number): () => number;

/** Simplifies a number by removing trailing zeros and decimal point if possible. */
export function simplifyNum(value: number): number;

/** Converts a string of numbers to an array of numbers. */
export function stringToNumberArray(str: string): number[];
