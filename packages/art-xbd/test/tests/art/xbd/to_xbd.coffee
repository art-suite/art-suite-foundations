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
  {ATag, BTag, MyRootTag} = createTagFactories "A B myRoot"

  testWriteReadXbd "MyRootTag", -> new XbdTag "MyRootTag"
  testWriteReadXbd "MyRootTag foo: 'bar'", -> new XbdTag "MyRootTag", foo: "bar"
  testWriteReadXbd "MyRootTag binary: binary ...", -> MyRootTag binary: binary [0xBE, 0xEF, 0, 1, 2, 3, 0xBE, 0xEF]
  testWriteReadXbd "MyRootTag ATag", -> MyRootTag ATag()
  testWriteReadXbd "MyRootTag ATag, ATag", -> MyRootTag ATag(), ATag()
  testWriteReadXbd "nested Tags", -> MyRootTag ATag ATag()

  testWriteReadXbd "reused tag, attr and value strings", ->
    MyRootTag
      foo: "bar"
      ATag()
      ATag foo: "far"
      BTag fab: "bar"
