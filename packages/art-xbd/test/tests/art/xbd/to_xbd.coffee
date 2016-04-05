Foundation = require 'art-foundation'
Xbd = require 'art-xbd'

{Binary, log, RestClient} = Foundation
{XbdTag, fromXbd, createTagFactories} = Xbd
{binary} = Binary

testWriteReadXbd = (testName, tagFactory) ->
  test testName, ->
    inputTag = tagFactory()
    inputTag.xbdPromise
    .then (xbdBinaryString) ->
      xbdBinaryString.inspectedString
      outputTag = fromXbd xbdBinaryString
      assert.eq inputTag.xml, outputTag.xml, "expected input to equal output"

suite "Art.Xbd.toXbd", ->
  {TagA, TagB, MyRootTag} = createTagFactories "TagA, TagB, myRootTag"

  testWriteReadXbd "MyRootTag", -> new XbdTag "MyRootTag"
  testWriteReadXbd "MyRootTag foo: 'bar'", -> new XbdTag "MyRootTag", foo: "bar"
  testWriteReadXbd "MyRootTag binary: binary ...", -> MyRootTag binary: binary [0xBE, 0xEF, 0, 1, 2, 3, 0xBE, 0xEF]
  testWriteReadXbd "MyRootTag TagA", -> MyRootTag TagA()
  testWriteReadXbd "MyRootTag TagA, TagA", -> MyRootTag TagA(), TagA()
  testWriteReadXbd "nested Tags", -> MyRootTag TagA TagA()

  testWriteReadXbd "reused tag, attr and value strings", ->
    MyRootTag
      foo: "bar"
      TagA()
      TagA foo: "far"
      TagB fab: "bar"
