{assert} = Chai = require 'chai'
Foundation = require 'art-foundation'
{
  log, eq, inspect, formattedInspect, floatEq, compactFlatten, escapeRegExp, isString
  Types
  object
  inspectedObjectLiteral
  wordsArray
  compactFlattenJoin
  isFunction
  inspectLean
  isPlainArray
  Promise
  present
  objectHasKeys
  isPlainObject
} = Foundation

{assert} = Chai

indent = (str) -> '  ' + str.replace /\n/g, "\n  "

getTesterFor = (name, tester) ->
  switch tester.length
    when 1
      (testValue, context) ->
        unless tester testValue
          failWithExpectedMessage context,
            inspectedObjectLiteral name
            "to be true for"
            testValue
    when 2
      (value1, value2, context) ->
        unless tester value1, value2
          failWithExpectedMessage context,
            value1
            name
            value2
    else throw new Error "unsupported tester - expecting 1 or 2 args. name: #{name}, tester #{tester}"

assert.test = {}

addTester = (name, tester) ->
  assert[name] = testerFor = getTesterFor name, tester
  assert.test[name] = if tester.length == 1
    (func, args, context) ->
      args = [] unless args?
      invoke = if args.length == 0 then "#{func.getName()}()" else "#{func.getName()} #{inspectLean(args, forArgs:true)}"
      args = [args] unless isPlainArray args
      test "#{name} #{invoke}", ->
        testerFor func(args...), context
  else
    (func, args, testValue, context) ->
      args = [] unless args?
      invoke = if args.length == 0 then "#{func.getName()}()" else "(#{func.getName()} #{inspectLean(args, forArgs:true)})"
      args = [args] unless isPlainArray args
      test "#{name} #{invoke}, #{inspect testValue}", ->
        testerFor func(args...), testValue, context

maxLength = 80
format = (val) ->
  formattedInspect val, maxLength

failWithExpectedMessage = (context, a, verb, b, verb2, c) ->
  assert.fail a, b, compactFlattenJoin("\n\n", [
    "Context: #{context}" if context
    "expected"
    indent format a
    verb
    indent format b
    [verb2, indent format c] if verb2
  ]) + "\n"

# generalize this if we have more assert functions with TWO binary tests
assert.within = (a, b, c, context) ->
  if a && a.gte && a.lte
    failWithExpectedMessage context, a, "to be gte", b, "to be lte", c unless a.gte(b) and a.lte(c)
  else
    failWithExpectedMessage context, a, "to be >=",  b, "to be <=" , c unless a >= b and a <=c

# returns promise
# Either use as last line of test, or follow with .then ->
assert.rejects = (promise, context) ->
  uniqueObject = {}
  p = if isFunction promise
    Promise.then -> promise()
  else
    promise

  p.then (v) ->
    failWithExpectedMessage context,
      promise
      "to be rejected. Instead, it succeeded with:"
      v.value
  , (v) -> v

assert.rejectsWith = (promise, rejectValue, context) ->
  log.error "DEPRICATED: assert.rejectsWith. Use: assert.rejects().then (rejectValue) -> assert.eq rejectValue, expectedRejectValue"
  assert.rejects promise
  .then (value) ->
    assert.eq value, rejectValue, "rejects with: #{context}"

addTester name, tester for name, tester of Types when name.match /^is/
addTester name, Foundation[name] for name in wordsArray "gt gte lte lt eq neq floatEq"
addTester "instanceof", (klass, obj) -> obj instanceof klass
addTester "match",    (a, b) -> a.match  if isString b then escapeRegExp b else b
addTester "notMatch", (a, b) -> !a.match if isString b then escapeRegExp b else b
addTester "same",     (a, b) -> a == b
addTester "notSame",  (a, b) -> a != b
addTester "doesNotExist", (a) -> !a?
addTester "exists",    (a) -> a?
addTester "isNotPresent", (a) -> !present a
addTester "isPresent",    (a) -> present a
addTester "hasKeys",    (a) -> isPlainObject(a) && objectHasKeys(a)
addTester "hasNoKeys",  (a) -> isPlainObject(a) && !objectHasKeys(a)

# TODO: selectedPropsEq needs a better error message - I ALSO want to see what the actual selected values look like
addTester "selectedPropsEq", (expectedProps, testObject) ->
  failures = null
  for k, v of expectedProps
    if !eq v, v2 = testObject[k]
      (failures||={})[k] = expected: v, actual: v2

  if failures
    log.warn "assert.selectedPropsEq failureInfo": {
        failures
        expectedProps
        actualProps: (object expectedProps, (v, k) -> testObject[k])
        # testObject
      }
    return false
  true

# create a version of all tests functions that resolves all inputs first
assert.resolved = {}
for k, v of assert when isFunction v
  assert.resolved[k] = ->
    Promise.all arguments
    .then (args) -> v args

module.exports = Chai
