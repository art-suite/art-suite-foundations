
export interface EqualityComparable<T> {
  eq(b: T): boolean;
}

export interface InequalityComparable<T> {
  gt(b: T): boolean;
  lt(b: T): boolean;
  gte(b: T): boolean;
  lte(b: T): boolean;
}

/** Returns true if a is greater than b. Throws if types are not comparable. */
export function gt<T>(a: T, b: T): boolean;

/** Returns true if a is less than b. Throws if types are not comparable. */
export function lt<T>(a: T, b: T): boolean;

/** Returns true if a is greater than or equal to b. Throws if types are not comparable. */
export function gte<T>(a: T, b: T): boolean;

/** Returns true if a is less than or equal to b. Throws if types are not comparable. */
export function lte<T>(a: T, b: T): boolean;

/** Returns true if a equals b using deep equality comparison. */
export function eq<T>(a: T, b: T): boolean;

/** Returns true if a does not equal b using deep equality comparison. */
export function neq<T>(a: T, b: T): boolean;

/** Fast equality check that only works for primitive values and references. */
export function fastEq<T>(a: T, b: T): boolean;

/** Fast inequality check that only works for primitive values and references. */
export function fastNeq<T>(a: T, b: T): boolean;

/** Returns:
 *  - negative number if a < b
 *  - 0 if a == b
 *  - positive number if a > b
 * Throws if types are not comparable.
 */
export function compare<T>(a: T, b: T): number;

/** Deep equality comparison for plain objects or arrays of plain objects. */
export function plainObjectsDeepEq<T extends Record<string, any> | Record<string, any>[]>(a: T, b: T): boolean;

/** Compares objects by specified properties only. */
export function propsEq<T extends Record<string, any>>(a: T, b: T, props: (keyof T)[]): boolean;

/** Deep difference comparison for plain objects or arrays of plain objects. */
export function plainObjectsDeepDiff<T extends Record<string, any> | Record<string, any>[]>(a: T, b: T): Record<string, any>;

/** Returns the difference between two values. */
export function diff<T>(a: T, b: T): Record<string, any>;

/** Shallow equality comparison. */
export function shallowEq<T>(a: T, b: T): boolean;
