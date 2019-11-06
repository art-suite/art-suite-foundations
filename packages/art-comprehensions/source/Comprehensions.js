const isPlainObject = v => v != null && v.constructor === Object;
const isFunction = obj => typeof obj === "function";
const returnFirst = a => a;
const returnSecond = (a, b) => b;
const isArrayIterable = source => source != null && source.length >= 0;
const isOfIterable = o => isFunction(o[Symbol.iterator] || o.next);
const exists = value => value != null;

const emptyOptions = {};

const iterate = (source, body) => {
  if (exists(source))
    if (isArrayIterable(source))
      for (let key = 0, { length } = source; key < length; key++)
        body(source[key], key);
    else if (isOfIterable(source))
      if (isFunction(source.entries))
        for (const [key, value] of source.entries()) body(value, key);
      else for (const value of source) body(value, null);
    else for (const key in source) body(source[key], key);
};

const iterateWithBreak = (source, body) => {
  if (exists(source))
    if (isArrayIterable(source))
      for (let key = 0, { length } = source; key < length; key++) {
        if (body(source[key], key)) break;
      }
    else if (isOfIterable(source))
      if (isFunction(source.entries))
        for (const [key, value] of source.entries()) {
          if (body(value, key)) break;
        }
      else
        for (const value of source) {
          if (body(value, null)) break;
        }
    else
      for (const key in source) {
        if (body(source[key], key)) break;
      }
};

const normalizeBody = (_with, options) => {
  let { when, map } = options;
  const _with_map = map ? (v, k) => _with(map(v), k) : _with;
  return when
    ? (v, k) => {
        if (when(v, k)) _with_map(v, k);
      }
    : _with_map;
};

let normalizeKeyFunction = (source, options) =>
  options.key ||
  options.withKey ||
  (isArrayIterable(source) ? returnFirst : returnSecond);

const _each = (source, _with, options) => {
  iterate(source, normalizeBody(_with, options));
};

const normalizedEach = (source, into, _with, options) => {
  _each(source, _with, options);
  return into;
};

let normalizedArray = (source, into, _with, options) => {
  if (into == null) into = [];
  _each(source, (v, k) => into.push(_with(v, k)), options);
  return into;
};

let normalizedObject = (source, into, _with, options) => {
  let key = normalizeKeyFunction(source, options);
  if (into == null) into = {};
  _each(source, (v, k) => (into[key(v, k)] = _with(v, k)), options);
  return into;
};

let normalizedReduce = (source, into, _with, options) => {
  let first = true;
  _each(source, (v, k) => {
    if (first)
      {first = false; into = v;}
    else
      into = _with(into, v, k)
  }, options);
  return into;
};

let normalizedInject = function(source, into, _with, options) {
  _each(source, (v, k) => (into = _with(into, v, k)), options);
  return into;
};

let normalizedFind = function(source, found, _with, options) {
  let { when, map } = options;
  const _with_map = map ? (v, k) => _with(map(v), k) : _with;
  iterateWithBreak(
    source,
    when
      ? (v, k) => {
          if (when(v, k)) {
            found = _with_map(v, k);
            return true;
          }
        }
      : (v, k) => (found = _with_map(v, k))
  );
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

IN signature 1: (iteration, source, into, _with) ->
IN signature 2: (iteration, source, into, options) ->
IN signature 3: (iteration, source, _with) ->
IN signature 4: (iteration, source, options) ->
IN signature 5: (iteration, source) ->

IN:
iteration: (source, into, _with, options) -> out

  The iteration function is invoked last with the computed args.
  Its results are returned.

  IN:
    source:     passed directly through from inputs
    into:       passed directly through from inputs OR from options.into
    _with:  passed directly through from inputs OR from options.with
    options:    passed directly through from inputs OR {}
                (guaranteed to be set and a plainObject)

source: the source collection to be iterated over. Passed directly through.

into:       passed through to 'iteration'
_with:      passed through to 'iteration'
options:    passed through to 'iteration' AND:

  into:     set 'into' from the options object
  with:     set '_with' from the options object

OUT: out
*/
let invokeNormalizedIteration = function(iteration, source, a, b) {
  let into, options, _with;
  options = b ? ((into = a), b) : a;
  if (isPlainObject(options)) {
    if (into == null) into = options.into || options.inject;
    _with = options.with;
  } else {
    if (isFunction(options)) _with = options;
    options = emptyOptions;
  }
  return iteration(source, into, _with || returnFirst, options);
};

module.exports = {
  each: (source, a, b) =>
    invokeNormalizedIteration(normalizedEach, source, a, b),
  array: (source, a, b) =>
    invokeNormalizedIteration(normalizedArray, source, a, b),
  object: (source, a, b) =>
    invokeNormalizedIteration(normalizedObject, source, a, b),
  reduce: (source, a, b) =>
    invokeNormalizedIteration(normalizedReduce, source, a, b),
  inject: (source, a, b) =>
    invokeNormalizedIteration(normalizedInject, source, a, b),
  find: (source, a, b) =>
    invokeNormalizedIteration(normalizedFind, source, a, b)
};
