let isPlainObject     = (v)       => (v != null) && v.constructor === Object;
let isFunction        = (obj)     => typeof obj === "function";
let returnFirst       = (a)       => a
let returnSecond      = (a, b)    => b
let arrayIterableTest = (source)  => source != null && source.length >= 0

let emptyOptions = {};

let normalizedEach = function(source, into, withBlock, options) {
  let i, j, k, len, whenBlock;
  if (into === undefined) into = source;
  if (options) whenBlock = options.when;
  if (arrayIterableTest(source)) {
    if (whenBlock) {
      for (k = i = 0, len = source.length; i < len; k = ++i) {
        let v = source[k];
        let w = whenBlock(v, k);
        if (w) withBlock(v, k, into, w);
      }
    } else {
      for (k = j = 0, len = source.length; j < len; k = ++j) {
        let v = source[k];
        withBlock(v, k, into);
      }
    }
  } else if (source != null) {
    if (whenBlock) {
      for (k in source) {
        let v = source[k];
        let w = whenBlock(v, k);
        if (w) withBlock(v, k, into, w);
      }
    } else {
      for (k in source) {
        let v = source[k];
        withBlock(v, k, into);
      }
    }
  }
  return into;
};

let normalizedEachWhile = function(source, into, withBlock, options) {
  let i, j, k, len, whenBlock;
  if (into === undefined) into = source;
  if (options) whenBlock = options.when;

  if (arrayIterableTest(source)) {
    if (whenBlock) {
      for (k = i = 0, len = source.length; i < len; k = ++i) {
        let v = source[k];
        let w = whenBlock(v, k);
        if (w) {
          if (!withBlock(v, k, into, w)) break;
        }
      }
    } else {
      for (k = j = 0, len = source.length; j < len; k = ++j) {
        let v = source[k];
        if (!withBlock(v, k, into)) break;
      }
    }
  } else if (source != null) {
    if (whenBlock) {
      for (k in source) {
        let v = source[k];
        let w = whenBlock(v, k);
        if (w && !withBlock(v, k, into, w)) break;
      }
    } else {
      for (k in source) {
        let v = source[k];
        if (!withBlock(v, k, into)) break;
      }
    }
  }
  return into;
};

let normalizedReduce = function(source, into, withBlock, options) {
  let intoSet;
  if (source == null) return into;
  normalizedEach(
    source,
    undefined,
    (v, k, __, w) => into = withBlock(into, v, k, w),
    options
  );
  return into;
};

let normalizedObject = function(source, into, withBlock, options) {
  let keyFunction = options.key || options.withKey || (arrayIterableTest(source) ? returnFirst : returnSecond);
  return normalizedEach(source, into != null ? into : {}, (v, k, into, w) =>
    into[keyFunction(v, k, into, w)] = withBlock(v, k, into, w)
  , options);
};

let normalizedArray = (source, into, withBlock, options) =>
  normalizedEach(source, into != null ? into : [], (v, k, into, w) =>
    into.push(withBlock(v, k, into, w))
  , options);

let normalizedFind = function(source, into, withBlock, options) {
  let found;
  normalizedEachWhile(source, found, options.whenBlock ? (v, k, into, w) => {
    found = withBlock(v, k, null, w);
    return false;
  } : (v, k, into, w) => !(found = withBlock(v, k, null, w))
  , options);
  return found;
};

//####################
// PRIVATE
//####################
/*
Normalizes input params for the 'iteration' function.
Since this normalizes multiple params, and therefor would need to return
an new array or new object otherwise, we pass IN the iteration function
and pass the params directly to it. This keeps the computed params on the
stack and doesn't create new objects.

IN signature 1: (iteration, source, into, withBlock) ->
IN signature 2: (iteration, source, into, options) ->
IN signature 3: (iteration, source, withBlock) ->
IN signature 4: (iteration, source, options) ->
IN signature 5: (iteration, source) ->

IN:
iteration: (source, into, withBlock, options) -> out

  The iteration function is invoked last with the computed args.
  Its results are returned.

  IN:
    source:     passed directly through from inputs
    into:       passed directly through from inputs OR from options.into
    withBlock:  passed directly through from inputs OR from options.with
    options:    passed directly through from inputs OR {}
                (guaranteed to be set and a plainObject)

source: the source collection to be iterated over. Passed directly through.

into:       passed through to 'iteration'
withBlock:  passed through to 'iteration'
options:    passed through to 'iteration' AND:

  into:     set 'into' from the options object
  with:     set 'withBlock' from the options object

OUT: out
*/
let invokeNormalizedIteration = function(iteration, source, a, b) {
  let into, options, withBlock;
  options = b ? (into = a, b) : a;
  if (isPlainObject(options)) {
    if (into == null) into = options.into;
    withBlock = options.with;
  } else {
    if (isFunction(options)) withBlock = options;
    options = emptyOptions;
  }
  return iteration(source, into, withBlock || returnFirst, options);
};

module.exports = {
  each:   (source, a, b) => invokeNormalizedIteration(normalizedEach,   source, a, b),
  array:  (source, a, b) => invokeNormalizedIteration(normalizedArray,  source, a, b),
  object: (source, a, b) => invokeNormalizedIteration(normalizedObject, source, a, b),
  reduce: (source, a, b) => invokeNormalizedIteration(normalizedReduce, source, a, b),
  find:   (source, a, b) => invokeNormalizedIteration(normalizedFind,   source, a, b),
};
