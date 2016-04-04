Foundation = require 'art-foundation'
Xbd = require 'art-xbd'

{Binary, log, RestClient} = Foundation
{XbdTag, fromXbd} = Xbd

suite "Art.Xbd.to xbd", ->
  test "foo", ->
    inputTag = new XbdTag "myTag", foo: "bar"
    xbd = inputTag.xbd
    log xbd:xbd
    outputTag = fromXbd xbd
    assert.eq inputTag.plainObjects, outputTag.plainObjects, "expected input to equal output"


