// Common helper types
type NotPresent = null | undefined;
type PlainObject<V = any> = Record<string, V>;

// Input source types
type ArrayInput<InV> = InV[] | NotPresent;
type ObjectInput<InV> = PlainObject<InV> | NotPresent;
// Basic Iterable input - specific key type (NumK for numeric, StrK for string) depends on usage context
type IterableInput<InV> = Iterable<InV> | NotPresent;


// Callbacks
type ArrayWithFn<InV, OutV> = (value: InV, key: number) => OutV;
type ObjectWithFn<InV, OutV> = (value: InV, key: string) => OutV;
// For generic iterables, key type can vary. For Set<V>, key is V. For Map<K,V>, key is K.
type IterableWithFn<InV, InK, OutV> = (value: InV, key: InK) => OutV;

type ArrayWhenFn<InV> = (value: InV, key: number) => boolean;
type ObjectWhenFn<InV> = (value: InV, key: string) => boolean;
type IterableWhenFn<InV, InK> = (value: InV, key: InK) => boolean;

type ObjectKeyFn<InV, InK_Actual, OutK extends string | number | symbol = string> = (value: InV, key: InK_Actual) => OutK;


// Options
interface BaseComprehensionOptions<InV, InK_Actual> {
  when?: InK_Actual extends number ? ArrayWhenFn<InV> : InK_Actual extends string ? ObjectWhenFn<InV> : IterableWhenFn<InV, InK_Actual>;
  // 'map' option from Comprehensions.js is mainly for reduce/inject internal step,
  // if it needs to be exposed, it would be: map?: (value: InV, key: InK_Actual) => any;
}

// For array() and each() returning array-like
interface ArrayResultOptions<InV, OutV = InV> extends BaseComprehensionOptions<InV, number> {
  into?: OutV[];
  with?: ArrayWithFn<InV, OutV>;
}

// For object() and each() returning object-like
interface ObjectResultOptions<InV, InK_Actual, OutV = InV, OutK extends string | number | symbol = string> extends BaseComprehensionOptions<InV, InK_Actual> {
  into?: PlainObject<OutV>;
  with?: InK_Actual extends number ? ArrayWithFn<InV, OutV> : InK_Actual extends string ? ObjectWithFn<InV, OutV> : IterableWithFn<InV, InK_Actual, OutV>;
  key?: ObjectKeyFn<InV, InK_Actual, OutK>; // alias: withKey
  withKey?: ObjectKeyFn<InV, InK_Actual, OutK>;
}

// For find()
interface FindOptions<InV, InK_Actual, OutV = InV> extends BaseComprehensionOptions<InV, InK_Actual> {
  // `into` is not applicable for find's public API
  with?: InK_Actual extends number ? ArrayWithFn<InV, OutV> : InK_Actual extends string ? ObjectWithFn<InV, OutV> : IterableWithFn<InV, InK_Actual, OutV>;
}

// For reduce() and inject()
type ReduceWithFn<AccV, InV, InK_Actual> = (accumulator: AccV, value: InV, key: InK_Actual) => AccV;

interface ReduceOptions<AccV, InV, InK_Actual> extends BaseComprehensionOptions<InV, InK_Actual> {
  into?: AccV; // initial accumulator for inject; also for reduce if explicit
  inject?: AccV; // alias for into
  returning?: AccV; // alias for into
  with: ReduceWithFn<AccV, InV, InK_Actual>; // This 'with' is the reducer
  map?: InK_Actual extends number ? ArrayWithFn<InV, any> : InK_Actual extends string ? ObjectWithFn<InV, any> : IterableWithFn<InV, InK_Actual, any>;
}


// ### array ###
interface ArrayFunction {
  // Source: ArrayInput
  <InV>(source: ArrayInput<InV>): InV[];
  <InV, OutV>(source: ArrayInput<InV>, withFn: ArrayWithFn<InV, OutV>): OutV[];
  <InV, OutV>(source: ArrayInput<InV>, options: ArrayResultOptions<InV, OutV>): OutV[];
  <InV, OutV>(source: ArrayInput<InV>, into: OutV[], withFn: ArrayWithFn<InV, OutV>): OutV[];
  <InV, OutV>(source: ArrayInput<InV>, into: OutV[], options: ArrayResultOptions<InV, OutV>): OutV[]; // options.into ignored

  // Source: ObjectInput
  <InV>(source: ObjectInput<InV>): InV[]; // Values of the object
  <InV, OutV>(source: ObjectInput<InV>, withFn: ObjectWithFn<InV, OutV>): OutV[];
  <InV, OutV>(source: ObjectInput<InV>, options: Omit<ObjectResultOptions<InV, string, OutV>, 'key' | 'withKey' | 'into'> & { into?: OutV[] }): OutV[];
  <InV, OutV>(source: ObjectInput<InV>, into: OutV[], withFn: ObjectWithFn<InV, OutV>): OutV[];
  <InV, OutV>(source: ObjectInput<InV>, into: OutV[], options: Omit<ObjectResultOptions<InV, string, OutV>, 'key' | 'withKey' | 'into'>): OutV[];

  // Source: IterableInput (e.g. Set<InV> - key is InV)
  <InV>(source: IterableInput<InV>): InV[];
  <InV, OutV>(source: IterableInput<InV>, withFn: IterableWithFn<InV, InV, OutV>): OutV[]; // Assuming key is InV for Set-like
  // More specific Iterable overloads for Map<K,V> would be needed for full key-type safety

  // Source: NotPresent
  (source: NotPresent, withFnOrOptions?: any, into?: any): [];
}
export declare const array: ArrayFunction;


// ### object ###
interface ObjectFunction {
  // Source: ArrayInput
  <InV>(source: ArrayInput<InV>): PlainObject<InV>; // Keys are indices as strings by default, or values if keyfn used.
  <InV, OutV = InV, OutK extends string | number | symbol = string>(source: ArrayInput<InV>, withFnOrOptions: ArrayWithFn<InV, OutV> | ObjectResultOptions<InV, number, OutV, OutK>): PlainObject<OutV>;
  <InV, OutV = InV, OutK extends string | number | symbol = string>(source: ArrayInput<InV>, into: PlainObject<OutV>, withFnOrOptions: ArrayWithFn<InV, OutV> | ObjectResultOptions<InV, number, OutV, OutK>): PlainObject<OutV>;

  // Source: ObjectInput
  <InV>(source: ObjectInput<InV>): PlainObject<InV>;
  <InV, OutV = InV, OutK extends string | number | symbol = string>(source: ObjectInput<InV>, withFnOrOptions: ObjectWithFn<InV, OutV> | ObjectResultOptions<InV, string, OutV, OutK>): PlainObject<OutV>;
  <InV, OutV = InV, OutK extends string | number | symbol = string>(source: ObjectInput<InV>, into: PlainObject<OutV>, withFnOrOptions: ObjectWithFn<InV, OutV> | ObjectResultOptions<InV, string, OutV, OutK>): PlainObject<OutV>;

  // Source: IterableInput (e.g. Map<KeyV, InV>)
  <KeyV, InV>(source: IterableInput<[KeyV, InV]> | Map<KeyV, InV>): PlainObject<InV>; // Assumes iterating entries for Map
  <KeyV, InV, OutV = InV, OutK extends string | number | symbol = string>(source: IterableInput<[KeyV, InV]> | Map<KeyV, InV>, withFnOrOptions: IterableWithFn<InV, KeyV, OutV> | ObjectResultOptions<InV, KeyV, OutV, OutK>): PlainObject<OutV>;

  // Source: NotPresent
  (source: NotPresent, withFnOrOptions?: any, into?: any): PlainObject<never>;
}
export declare const object: ObjectFunction;


// ### find ###
interface FindFunction {
  // Source: ArrayInput
  <InV>(source: ArrayInput<InV>): InV | undefined;
  <InV, OutV = InV>(source: ArrayInput<InV>, withFnOrOptions: ArrayWithFn<InV, OutV | boolean> | FindOptions<InV, number, OutV>): OutV | undefined; // withFn can return boolean for filtering

  // Source: ObjectInput
  <InV>(source: ObjectInput<InV>): InV | undefined;
  <InV, OutV = InV>(source: ObjectInput<InV>, withFnOrOptions: ObjectWithFn<InV, OutV | boolean> | FindOptions<InV, string, OutV>): OutV | undefined;

  // Source: IterableInput
  <InV>(source: IterableInput<InV>): InV | undefined;
  <InV, KeyV, OutV = InV>(source: IterableInput<InV>, withFnOrOptions: IterableWithFn<InV, KeyV, OutV | boolean> | FindOptions<InV, KeyV, OutV>): OutV | undefined;

  // Source: NotPresent
  (source: NotPresent, withFnOrOptions?: any): undefined;
}
export declare const find: FindFunction;


// ### reduce ###
interface ReduceFunction {
  // Source: ArrayInput
  <InV>(source: ArrayInput<InV>): InV; // Returns last element if no reducer/options
  <InV, AccV>(source: ArrayInput<InV>, reducer: ReduceWithFn<AccV, InV, number>, initialValue: AccV): AccV;
  <InV>(source: ArrayInput<InV>, reducer: ReduceWithFn<InV, InV, number>): InV; // initialValue is first element
  <InV, AccV>(source: ArrayInput<InV>, options: ReduceOptions<AccV, InV, number>): AccV;

  // Source: ObjectInput
  <InV>(source: ObjectInput<InV>): InV; // Returns last value if no reducer/options
  <InV, AccV>(source: ObjectInput<InV>, reducer: ReduceWithFn<AccV, InV, string>, initialValue: AccV): AccV;
  <InV>(source: ObjectInput<InV>, reducer: ReduceWithFn<InV, InV, string>): InV; // initialValue is first value
  <InV, AccV>(source: ObjectInput<InV>, options: ReduceOptions<AccV, InV, string>): AccV;

  // Source: IterableInput
  <InV>(source: IterableInput<InV>): InV;
  <InV, KeyV, AccV>(source: IterableInput<InV>, reducer: ReduceWithFn<AccV, InV, KeyV>, initialValue: AccV): AccV;
  <InV, KeyV>(source: IterableInput<InV>, reducer: ReduceWithFn<InV, InV, KeyV>): InV;
  <InV, KeyV, AccV>(source: IterableInput<InV>, options: ReduceOptions<AccV, InV, KeyV>): AccV;

  // Source: NotPresent
  (source: NotPresent, reducerOrOptions?: any, initialValue?: any): undefined;
}
export declare const reduce: ReduceFunction;

// ### each ###
// `each` returns its `into` argument if provided (via param or options), otherwise returns undefined.
// The `into` is NOT modified by `each` itself, but the callbacks might modify it if it's an object/array.
interface EachFunction {
  // Source: ArrayInput
  <InV, IntoV = undefined>(source: ArrayInput<InV>, withFnOrOptions?: ArrayWithFn<InV, any> | (BaseComprehensionOptions<InV, number> & { into?: IntoV })): IntoV;
  <InV, IntoV>(source: ArrayInput<InV>, into: IntoV, withFnOrOptions?: ArrayWithFn<InV, any> | BaseComprehensionOptions<InV, number>): IntoV;

  // Source: ObjectInput
  <InV, IntoV = undefined>(source: ObjectInput<InV>, withFnOrOptions?: ObjectWithFn<InV, any> | (BaseComprehensionOptions<InV, string> & { into?: IntoV })): IntoV;
  <InV, IntoV>(source: ObjectInput<InV>, into: IntoV, withFnOrOptions?: ObjectWithFn<InV, any> | BaseComprehensionOptions<InV, string>): IntoV;

  // Source: IterableInput
  <InV, KeyV, IntoV = undefined>(source: IterableInput<InV>, withFnOrOptions?: IterableWithFn<InV, KeyV, any> | (BaseComprehensionOptions<InV, KeyV> & { into?: IntoV })): IntoV;
  <InV, KeyV, IntoV>(source: IterableInput<InV>, into: IntoV, withFnOrOptions?: IterableWithFn<InV, KeyV, any> | BaseComprehensionOptions<InV, KeyV>): IntoV;

  // Source: NotPresent
  <IntoV = undefined>(source: NotPresent, withFnOrOptions?: any, intoArg?: IntoV): IntoV;
}
export declare const each: EachFunction;