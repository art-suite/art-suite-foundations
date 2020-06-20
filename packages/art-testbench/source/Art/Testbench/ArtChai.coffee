{assert} = Chai = require 'chai'
{
  log, eq, inspect, formattedInspect, floatEq, compactFlatten, escapeRegExp, isString
  compact
  Types
  object
  inspectedObjectLiteral
  compactFlattenJoin
  isFunction
  inspectLean
  isPlainArray
  Promise
  present
  objectHasKeys
  isPlainObject
  lowerCamelCase
  array
  each
  w
} = StandardLib = require 'art-standard-lib'

{assert} = Chai

indent = (str) -> '  ' + str.replace /\n/g, "\n  "

###
IN:
  options:
    customFailure:
      (name, value, context) ->
      (name, value1, value2, context) ->

  tester:
    (a) -> true/false
    (a, b) -> true/false
###
getTesterFor = (name, a, b) ->
  tester = if isFunction a
    a
  else if isPlainObject a
    options = a
    b
  else
    throw new Error "expected object or function"
  throw new Error "expected tester function" unless isFunction tester

  switch tester.length
    when 1
      (testValue, context) ->
        unless tester testValue
          if options?.customFailure
            options?.customFailure name, value, context
          else
            failWithExpectedMessage context,
              inspectedObjectLiteral name
              "to be true for"
              testValue
    else
      (value1, value2, context) ->
        unless tester value1, value2
          if options?.customFailure
            options?.customFailure name, value1, value2, context
          else
            failWithExpectedMessage context,
              value1
              name
              value2
    # else
    #   log tester: "#{tester}"
    #   throw new Error "unsupported tester - expecting 1 or 2 args. name: #{name}, tester #{tester}"

assert.test = {}

addTester = (name, a, b) ->
  assert[name] = testerFor = getTesterFor name, a, b
  assert.test[name] = if testerFor.length == 2
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
  log.error ArtTestbenchChaiFailure:
    context:
      if isString context
        context
      else
        formattedInspect context
    expected: compact [
      a, verb, b
      verb2 if verb2
      c if verb2
    ]

  failWithExpectedMessageBase context, a, b, [
    indent format a
    verb
    indent format b
    [verb2, indent format c] if verb2
  ]

failWithExpectedMessageBase = (context, a, b, lines) ->
  assert.fail a, b, compactFlattenJoin("\n\n", [
    if context
      if isString context
        context
      else
        formattedInspect context
    "expected"
    lines
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
      v
  , (v) -> v

assert.rejectsWithStatus = (status, promise, context) ->
  assert.rejects promise, context
  .then (error) -> assert.selectedEq {status}, error, context

assert.rejectsWith = (promise, rejectValue, context) ->
  log.error "DEPRICATED: assert.rejectsWith. Use: assert.rejects().then (rejectValue) -> assert.eq rejectValue, expectedRejectValue"
  assert.rejects promise
  .then (value) ->
    assert.eq value, rejectValue, "rejects with: #{context}"

addTester name, tester for name, tester of Types when name.match /^is/
addTester name, StandardLib[name] for name in w "gt gte lte lt eq neq floatEq"
addTester "instanceof",
  customFailure: (name, v1, v2, context) ->
    failWithExpectedMessage context,
      v2
      name
      v1

  (klass, obj) -> obj instanceof klass
addTester "match",        (a, b) -> a.match  if isString b then escapeRegExp b else b
addTester "notMatch",     notMatch = (a, b) -> !a.match if isString b then escapeRegExp b else b
addTester "doesNotMatch", notMatch
addTester "same",         (a, b) -> a == b
addTester "notSame",      (a, b) -> a != b
addTester "doesNotExist", (a) -> !a?
addTester "exists",       (a) -> a?

addTester "notPresent",   (a) -> !present a
addTester "present",      (a) -> present a
addTester "isNotPresent", (a) -> !present a  # DEPRICATED
addTester "isPresent",    (a) -> present a   # DEPRICATED

addTester "hasKeys",      (a) -> isPlainObject(a) && objectHasKeys(a)
addTester "hasNoKeys",    (a) -> isPlainObject(a) && !objectHasKeys(a)

addTester "is",           (a, b) -> a.class == b


# Ruby/Caffeine Truth
addTester "true",         (a) -> a != false && a?
addTester "false",        (a) -> a == false || !a?


# TODO: selectedPropsEq needs a better error message - I ALSO want to see what the actual selected values look like
addTester "selectedPropsEq",
  customFailure: (name, expectedProps, testObject, context) ->
    failWithExpectedMessageBase context, expectedProps, testObject, [
      indent format expectedProps
      "to equal selected props:"
      indent format object expectedProps, (v, k) -> testObject[k]
      "test object:"
      indent format testObject
    ]

  (expectedProps, testObject) ->
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

assert.selectedEq = assert.selectedPropsEq

# create a version of all tests functions that resolves all inputs first
assert.resolved = {}
for k, v of assert when isFunction v
  do (k, v)->
    assert.resolved[k] = (args1...)->
      Promise.all args1
      .then (args2) -> v args2...

# ArtCommunicationStatus tests
statuses = w "missing clientFailure clientFailureNotAuthorized"
each statuses, (status) ->
  assert[status] =
  assert[name = lowerCamelCase "is #{status}"] = (promise, context) ->
    if isString promise
      assert.eq promise, status, context
    else
      assert.rejects -> promise
      .then (response) ->
        if response.status != status
          log "#{name}": expected: status, got: response.status, response: response
        assert.eq response.status, status, context
        response

module.exports = Chai
