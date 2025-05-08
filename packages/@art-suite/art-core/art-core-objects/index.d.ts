/** Represents a plain JavaScript object. */
export type PlainObject = Record<string, any>;

/** Represents a value that might be null or undefined. */
export type NotPresent = null | undefined;

/** Helper type to intersect a tuple of objects, preserving known properties. */
export type MergeIntersection<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? Head extends PlainObject
  ? Tail extends any[]
  ? Head & MergeIntersection<Tail>
  : Head
  : unknown
  : unknown;

/**
 * Merges multiple objects into a new object. Known properties are preserved.
 * @param objects Objects to merge. Last one in wins.
 */
export function merge<T extends (PlainObject | NotPresent)[]>(...objects: T): MergeIntersection<T>;

/** Merges objects, ignoring null values from source objects. */
export function mergeWithoutNulls(...objects: object[]): object;

/** Merges objects using a custom merge function. */
export function mergeWith(mergeFn: (a: any, b: any) => any, ...objects: object[]): object;

/** Merges an object with itself, useful for creating a new instance. */
export function mergeWithSelf(object: object): object;

/**
 * Merges source objects into the target object. Known properties are preserved.
 * @param target The target object to merge into.
 * @param sources Source objects to merge from. Last one in wins.
 */
export function mergeInto<T extends PlainObject, S extends (PlainObject | NotPresent)[]>(target: T, ...sources: S): T & MergeIntersection<S>;

/** Merges objects into target, treating null values as deletions. */
export function mergeIntoWithNullDeletes(target: object, ...sources: object[]): object;

/** Merges objects into target unless the unlessFn returns true for a value. */
export function mergeIntoUnless(target: object, unlessFn: (value: any) => boolean, ...sources: object[]): object;

/** Deep merges multiple objects into a new object. */
export function deepMerge(...objects: object[]): object;

/** Checks if an object has all specified properties. */
export function hasAllProps(object: object, ...props: string[]): boolean;

/** Merges the incoming object; if the result would be identical to the first object, return the first object. */
export function pureMerge(...props: PlainObject[]): PlainObject;

/** Shorthand for object creation, alias for pureMerge. */
export function m(...props: PlainObject[]): PlainObject;

/** Returns the number of keys in an object. */
export function objectKeyCount(object: object): number;

/** Checks if an object has any keys. */
export function objectHasKeys(object: object): boolean;

/** Creates a path in an object if it doesn't exist. */
export function vivifyObjectPath(object: object, path: string[]): object;

/** Creates a path in an object and sets its value. */
export function vivifyObjectPathAndSet(object: object, path: string[], value: any): object;

/** Converts an array to an object using a key function. */
export function toObject(array: any[], keyFn: (item: any) => string): object;

/** Converts an array to an object map using a transformation function that returns a [key, value] pair for each element. */
export function arrayToMap<T = any, K extends string | number | symbol = string, V = any>(array: T[], transformFn: (item: T, index: number) => [K, V]): Record<K, V>;

/** Creates a new object with only the specified keys. */
export function select(object: object, ...keys: string[]): object;

/** Creates an array of objects with only the specified keys. */
export function selectAll(objects: object[], ...keys: string[]): object[];

/** Creates a new object with only defined values. */
export function objectWithDefinedValues(object: object): object;

/** Creates a new object with only existing values. */
export function objectWithExistingValues(object: object): object;

/** Creates a new object with only present values. */
export function objectWithPresentValues(object: object): object;

/** Creates a new object with the specified properties. */
export function objectWith(props: object): object;

/** Creates a new object without the specified keys. */
export function objectWithout(object: object, ...keys: string[]): object;

/** Sets a value at a pathed string (e.g., 'a.b.c') in an object. Returns the modified object. */
export function setPathedProperty(object: PlainObject, propertyPath: string, value: any): PlainObject;

/** Expands properties with dot notation into nested objects. */
export function withPathedPropertiesExpanded(object: object): object;

/** Recursively iterates over all scalar values in an object or array. The callback `fn` is invoked with `(value, key)` for each scalar value. */
export function deepEach(object: PlainObject | any[], fn: (value: any, key?: string | number) => void): void;

/** Recursively maps all scalar values in an object or array. The callback `fn` is invoked with `(value)` for each scalar value and its return replaces the value. */
export function deepMap<T extends PlainObject | any[]>(object: T, fn: (value: any) => any): T;

/** Converts an object to a plain structure. */
export function toPlainStructure(object: object): object;

/** Converts an object to a JSON-compatible structure. */
export function toJsonStructure(object: object): object;