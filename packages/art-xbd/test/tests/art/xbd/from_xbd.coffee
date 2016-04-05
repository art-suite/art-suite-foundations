Xbd = require 'art-xbd'
{Binary, log, RestClient} = require 'art-foundation'
{XbdTag, indentString, fromXbd, createTagFactories} = Xbd
{stream} = Binary

suite "Art.Xbd.fromXbd", ->

  test "load trival.xbd", ->
    RestClient.get "#{testAssetRoot}/xbd_test/trivial.xbd"
    .then (test_data) ->
      tag = fromXbd test_data
      assert.equal tag.name, "RootTag"
      assert.equal tag.tags[0].name, "single_tag"

  decodeAttributeValues = (tag, func) ->
    tag.attributes[k] = func v, k, tag.name for k, v of tag.attributes
    decodeAttributeValues t, func for t in tag.tags

  test "load simple.xbd - hierarchy and attributes", ->
    RestClient.get "#{testAssetRoot}/xbd_test/simple.xbd"
    .then (test_data) ->
      tag = fromXbd test_data
      assert.equal tag.name, "RootTag"

      decodeAttributeValues tag, (str) -> str.toString()

      top_tag = tag.tags[0]
      assert.equal top_tag.name, "top_tag"
      assert.deepEqual top_tag.attributes, {"animal":"(ᵔᴥᵔ)","fruit":"orange"}

      child_tag1 = top_tag.tags[0]
      assert.equal child_tag1.name, "child_tag1"
      assert.deepEqual child_tag1.attributes, {"fruit":"apple"}

      child_tag2 = top_tag.tags[1]
      assert.equal child_tag2.name, "child_tag2"
      assert.deepEqual child_tag2.attributes, {"planet":"mars"}

      grand_child_tag = child_tag2.tags[0]
      assert.equal grand_child_tag.name, "grand_child_tag"
      assert.deepEqual grand_child_tag.attributes, {"animal":"horse","color":"red"}

  test "load 4-1gb.kimi", ->
    RestClient.get "#{testAssetRoot}/xbd_test/4-1gb.kimi"
    .then (test_data) ->
      tag = fromXbd test_data
      assert.equal tag.name, "RootTag"
