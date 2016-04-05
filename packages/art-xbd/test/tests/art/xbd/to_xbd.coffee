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
  {tagA, tagB, myRootTag} = createTagFactories "tagA, tagB, myRootTag"

  testWriteReadXbd "myRootTag", -> new XbdTag "myRootTag"
  testWriteReadXbd "myRootTag foo: 'bar'", -> new XbdTag "myRootTag", foo: "bar"
  testWriteReadXbd "myRootTag binary: binary ...", -> myRootTag binary: binary [0xBE, 0xEF, 0, 1, 2, 3, 0xBE, 0xEF]
  testWriteReadXbd "myRootTag tagA", -> myRootTag tagA()
  testWriteReadXbd "myRootTag tagA, tagA", -> myRootTag tagA(), tagA()
  testWriteReadXbd "nested Tags", -> myRootTag tagA tagA()

  testWriteReadXbd "reused tag, attr and value strings", ->
    myRootTag
      foo: "bar"
      tagA()
      tagA foo: "far"
      tagB fab: "bar"
