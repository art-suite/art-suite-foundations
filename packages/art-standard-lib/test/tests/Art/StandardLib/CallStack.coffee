
{StandardLib} = Neptune.Art
{log, inspectLean, rawLog, inspect, errorToString} = StandardLib

rawLog = ->

module.exports = suite: ->
  test "errorToString", ->
    assert.eq "hi", errorToString new Error "hi"
    assert.eq "hi", errorToString "hi"
    assert.eq "hi", errorToString {message: "hi"}
    assert.eq "hi", errorToString {error: "hi"}

  test "log with function", ->
    myFunc = ->
      a = StandardLib.callStack()
      rawLog StandardLib.Inspect.inspectLean myFuncReturning:a, 1
      a
    s = myFunc()
    rawLog StandardLib.Inspect.inspect s, 1

  test "log without function", ->
    callIt = (f) -> f()
    s = callIt ->
      a = StandardLib.callStack()
      rawLog StandardLib.Inspect.inspectLean myFuncReturning:a, 1
      a

    rawLog StandardLib.Inspect.inspect s[0], 1

  test "parse anonumous", ->
    csl = new StandardLib.CallStackLine line = "at Context.<anonymous> (http://0.0.0.0:9000/kimi_editor/test/spec/text_effects.js:8:9)"
    assert.equal csl.original, line
    assert.equal csl.sourceLine, 8
    assert.equal csl.function, undefined
    assert.equal csl.sourceColumn, 9
    assert.equal csl.source, "http://0.0.0.0:9000/kimi_editor/test/spec/text_effects.js"
    assert.equal csl.sourceFileName, "text_effects.js"
    assert.equal csl.sourcePath, "/kimi_editor/test/spec"
    assert.equal csl.sourceHostWithPort, "0.0.0.0:9000"

  test "parse 1", ->
    csl = new StandardLib.CallStackLine line = "at myFunc (http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js:10:30)"
    assert.equal csl.original, line
    assert.equal csl.sourceLine, 10
    assert.equal csl.function, "myFunc"
    assert.equal csl.sourceColumn, 30
    assert.equal csl.source, "http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js"
    assert.equal csl.sourceFileName, "call_stack.js"
    assert.equal csl.sourcePath, "/scripts/spec/art/foundation"
    assert.equal csl.sourceHostWithPort, "0.0.0.0:9000"

  test "parse without function", ->
    csl = new StandardLib.CallStackLine line = "at http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js:26:30"
    assert.equal csl.original, line
    assert.equal csl.sourceLine, 26
    assert.equal csl.function, undefined
    assert.equal csl.sourceColumn, 30
    assert.equal csl.source, "http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js"
    assert.equal csl.sourceFileName, "call_stack.js"
    assert.equal csl.sourcePath, "/scripts/spec/art/foundation"
    assert.equal csl.sourceHostWithPort, "0.0.0.0:9000"
