Xbd = require 'art-xbd'
{Binary, log, RestClient} = require 'art-foundation'
{XbdTag, indentString, fromXbd, createTagFactories} = Xbd
{stream} = Binary
fs = require 'fs-extra'
path = require 'path'

testAssetRoot = 'test/assets/xbd_test'

suite "Art.Xbd.fromXbd", ->

  test "load trival.xbd", ->
    fs.readFile path.join testAssetRoot, 'trivial.xbd'
    .then (test_data) ->
      tag = fromXbd test_data
      assert.equal tag.name, "RootTag"
      assert.equal tag.tags[0].name, "single_tag"

  decodeAttributeValues = (tag, func) ->
    tag.attrs[k] = func v, k, tag.name for k, v of tag.attrs
    decodeAttributeValues t, func for t in tag.tags

  test "load simple.xbd - hierarchy and attrs", ->
    fs.readFile path.join testAssetRoot, 'simple.xbd'
    .then (test_data) ->
      tag = fromXbd test_data
      assert.equal tag.name, "RootTag"

      decodeAttributeValues tag, (str) -> str.toString()

      top_tag = tag.tags[0]
      assert.equal top_tag.name, "top_tag"
      assert.deepEqual top_tag.attrs, {"animal":"(ᵔᴥᵔ)","fruit":"orange"}

      child_tag1 = top_tag.tags[0]
      assert.equal child_tag1.name, "child_tag1"
      assert.deepEqual child_tag1.attrs, {"fruit":"apple"}

      child_tag2 = top_tag.tags[1]
      assert.equal child_tag2.name, "child_tag2"
      assert.deepEqual child_tag2.attrs, {"planet":"mars"}

      grand_child_tag = child_tag2.tags[0]
      assert.equal grand_child_tag.name, "grand_child_tag"
      assert.deepEqual grand_child_tag.attrs, {"animal":"horse","color":"red"}

  test "load 4-1gb.kimi", ->
    fs.readFile path.join testAssetRoot, '4-1gb.kimi'
    .then (test_data) ->
      tag = fromXbd test_data
      assert.equal tag.name, "RootTag"
