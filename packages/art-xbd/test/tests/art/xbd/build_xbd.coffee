Xbd = require 'art-xbd'
{Binary, log, RestClient} = require 'art-foundation'
{XbdTag, fromXbd, createTagFactories} = Xbd
{stream} = Binary

{
  Foo
  Boo
  Baz
} = createTagFactories """
  foo
  boo
  baz
  """

suite "Art.Xbd.buildXbd", ->

  test "building xbd one nested tag", ->
    t = Foo Boo()

    assert.equal t.toString(), '<foo>\n  <boo/>\n</foo>'

  test "building xbd with attrs", ->
    t = Foo
      bar: 1
      baz: 2
    assert.equal t.toString(), "<foo bar='1' baz='2'/>"

  test "building xbd double nested tag", ->
    t = Foo Boo Baz()

    shouldBe = """<foo>
        <boo>
          <baz/>
        </boo>
      </foo>"""

    assert.equal t.toString(), shouldBe

  test "get tag", ->
    t = Foo null,
      Boo a: 1
      Baz a: 2

    assert.equal t.tag("boo").attrs["a"], 1
    assert.equal t.tag("baz").attrs["a"], 2
