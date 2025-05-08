type NotPresent = null | undefined;

export type NestedArray<T> = T | NestedArray<T>[];
export type SparseItem<T> = T | NotPresent;
export type SparseArray<T> = SparseItem<T>[];
export type SparseNestedArray<T> = NestedArray<SparseItem<T>>;
export type SparseNestedArrayOrSingleton<T> = SparseNestedArray<T> | T;

type KeepTester<T> = (value: T) => boolean;

/** Removes null/undefined or anything that returns false for the keepTester. */
export function compact<T>(inputArray: SparseArray<T>, keepTester?: KeepTester<T>): T[];

/** Recursively flattens nested arrays into a single array. */
export function flatten<T>(...args: NestedArray<T>[]): T[];

/** Recursively flattens nested arrays and removes null/undefined values. */
export function compactFlatten<T>(inputArray: SparseNestedArrayOrSingleton<T>): T[];

/** Recursively flattens nested arrays and removes null/undefined or anything that returns false for the customKeepTester. */
export function customCompactFlatten<T>(inputArray: SparseNestedArray<T>, customKeepTester: KeepTester<T>): T[];

/** Recursively flattens multiple arrays and removes null/undefined values. */
export function compactFlattenAll<T>(...args: SparseNestedArray<T>[]): T[];

/** Recursively iterates over arrays and calls f on each non-array element. */
export function deepArrayEach<T>(inputArray: NestedArray<T>[], f: (value: T) => void): NestedArray<T>[];

/** Returns the last element (or element at offset from end) of an array without modifying it. */
export function peek<T>(inputArray: T[] | null | undefined, offset?: number): T | undefined;

/** Removes and returns the last element of an array, modifying the array. */
export function pop<T>(inputArray: T[] | null | undefined): T | undefined;

/** Adds an element to the end of an array and returns the modified array. Creates new array if input is null/undefined. */
export function push<T>(inputArray: T[] | null | undefined, element: T): T[];

/** Creates a new array with the element added to the end. Creates [value] if input array is null/undefined. */
export function arrayWith<T>(inputArray: T[] | null | undefined, value: T): T[];

/** Creates a new array from the first part of the input array up to but not including the specified index. */
export function arrayWithLeftOfIndex<T>(inputArray: T[] | null | undefined, index: number): T[];

/** Creates a new array from the part of the input array after (and not including) the specified index. */
export function arrayWithRightOfIndex<T>(inputArray: T[] | null | undefined, index: number): T[];

/** Creates a new array from the first part of the input array up and not including the first occurrence of the value. */
export function arrayWithLeftOf<T>(inputArray: T[], value: T): T[];

/** Creates a new array from the part of the input array after (and not including) the first occurrence of the value. */
export function arrayWithRightOf<T>(inputArray: T[], value: T): T[];

/** Creates a new array with elements randomly sorted. */
export function arrayWithRandomSort<T>(inputArray: T[] | null | undefined): T[];

/** Creates a new array with the item inserted at the specified index. */
export function arrayWithInsertedAt<T>(inputArray: T[], index: number, item: T): T[];

/** Creates a new array with elements sorted according to the provided sort function. */
export function arrayWithSort<T>(inputArray?: T[], sortFunction?: (a: T, b: T) => number): T[];

/** Creates a new array with the element at the specified index removed. */
export function arrayWithout<T>(inputArray: T[] | null | undefined, index?: number, amount?: number): T[];

/** Creates a new array with the first occurrence of the specified value removed. */
export function arrayWithoutValue<T>(inputArray: T[] | null | undefined, value: T): T[];

/** Creates a new array with the last element(s) removed. */
export function arrayWithoutLast<T>(inputArray: T[] | null | undefined, amount?: number): T[];

/** Creates a new array with the value added only if it doesn't already exist in the array. */
export function arrayWithExactlyOne<T>(inputArray: T[] | null | undefined, value: T): T[];

/** Creates a new array with the element moved from one index to another. */
export function arrayWithElementMoved<T>(inputArray: T[], fromIndex: number, toIndex: number): T[];

/** Creates a new array with the specified value moved to the given index. */
export function arrayWithElementValueMoved<T>(inputArray: T[], value: T, toIndex: number): T[];

/** Creates a new array with the element at the specified index replaced by the new value. */
export function arrayWithElementReplaced<T>(inputArray: T[], value: T, index: number): T[];

/** Creates a new array with the value added after truncating the input array to the specified length. */
export function truncatedArrayWith<T>(inputArray: T[] | null | undefined, length: number, value: T): T[];

/** Creates a new array with unique values based on the equality function. */
export function arrayWithUniqueValues<T>(sortedArray: T[], eqF?: (a: T, b: T) => boolean): T[];

/** Returns the index of the first match or the length of the array if not found. */
export function getIndexOfOrLength<T>(inputArray: T[], value: T): number;

/** Finds the element that tests as smallest according to the compare function. */
export function findSortedFirst<T>(inputArray: T[] | null | undefined, compareFunction?: (a: T, b: T) => number): T | undefined;

/** Inserts an item at the specified index, modifying the original array. */
export function insertIntoArray<T>(inputArray: T[], index: number, item: T): T[];

/** Function that returns true if the value is not null or undefined. */
export function keepUnlessNullOrUndefined<T>(a: T): boolean;

/** Moves an element from one position to another within the array, modifying the original array. */
export function moveArrayElement<T>(inputArray: T[], fromIndex: number, toIndex: number): T[];

/** Removes elements at the specified index, modifying the original array. */
export function remove<T>(inputArray: T[], index: number, amount?: number): T[];

/** Removes the first occurrence of the value from the array, modifying the original array. */
export function removeFirstMatch<T>(inputArray: T[], toMatchValue: T): T[];

/** Randomly reorders elements in the array, modifying the original array. */
export function shuffleArray<T>(inputArray: T[]): T[];

/** Performs a stable sort on the array, maintaining relative order of equal elements. Modifies the original array. */
export function stableSort<T>(inputArray: T[], compareFunction?: (a: T, b: T) => number): T[];

/**
 * Creates an array from string arguments by splitting on whitespace, or concatenating other arguments.
 * If a string contains multiple words separated by spaces, each word becomes an element.
 * Non-string arguments are added as-is.
 */
export function w<T>(...args: SparseNestedArray<string | T>): (string | T)[];
