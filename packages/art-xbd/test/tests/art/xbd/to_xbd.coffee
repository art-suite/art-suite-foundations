Foundation = require 'art-foundation'
Xbd = require 'art-xbd'

{Binary, log, RestClient} = Foundation
{XbdTag, fromXbd} = Xbd

suite "Art.Xbd.to xbd", ->
  test "basic toXbd fromXbd", ->
    inputTag = new XbdTag "myTag", foo: "bar"
    inputTag.xbdPromise
    .then (xbdBinaryString) ->
      outputTag = fromXbd xbdBinaryString
      assert.eq inputTag.plainObjects, outputTag.plainObjects, "expected input to equal output"

  test "subtags toXbd fromXbd", ->
    inputTag = new XbdTag "myTag", foo: "bar", [
      new XbdTag "tagA"
      new XbdTag "tagA", foo: "far"
      new XbdTag "tagB", fab: "bar"
    ]
    inputTag.xbdPromise
    .then (xbdBinaryString) ->
      outputTag = fromXbd xbdBinaryString
      assert.eq inputTag.plainObjects, outputTag.plainObjects, "expected input to equal output"



