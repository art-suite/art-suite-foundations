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
{
  failWithExpectedMessage,
  indent
} = require './Presentation'
{
  getTesterFor
  addTester
} = require './ArtChaiLib'

{assert} = module.exports = Chai

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
