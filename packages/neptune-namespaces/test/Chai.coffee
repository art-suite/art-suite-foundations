{assert} = chai = require 'chai'
require 'colors'
MiniFoundation = require '../source/Generation/MiniFoundation'
{log, formattedInspect} = MiniFoundation

failWithExpectedMessage = (context, a, verb, b) ->
  message = """
    #{context || ""}

    #{"expected".yellow}

      #{formattedInspect(a).replace /\n/g, "\n  "}

    #{"to #{verb}".yellow}

      #{formattedInspect(b).replace /\n/g, "\n  "}

    """
  assert.fail a, b, message

assert.eq = (a, b, context) ->
  aInspected = formattedInspect a
  bInspected = formattedInspect b
  unless aInspected == bInspected
    failWithExpectedMessage context, a, "eq", b

assert.match = (a, b, context) ->
  if !a
    failWithExpectedMessage context, a, "be truish and then match", b
  else unless a.match b
    failWithExpectedMessage context, a, "match", b

assert.doesNotMatch = (a, b, context) ->
  if !a
    failWithExpectedMessage context, a, "be truish and then match", b
  else if a.match b
    failWithExpectedMessage context, a, "not match", b

module.exports = chai
