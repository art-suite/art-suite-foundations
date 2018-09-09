{createObjectTreeFactory} = Neptune.Art.ObjectTreeFactory
{toPlainObjects} = Neptune.Art.StandardLib
{BaseClass} = Neptune.Art.ClassSystem

log = (v) -> console.log v; v

module.exports = suite: ->
  test "function", ->
    f = createObjectTreeFactory (props, children) -> {props, children}
    assert.eq (f foo: 123), props: {foo: 123}, children: null
    assert.eq(
      f
        foo: 123
        f bar: 456 # NOTE: this returns a plain object, so it becomes props, not a child

      props:
        foo:        123
        props: bar: 456
        children:   null

      children: null
    )

  test "class basic", ->
    f = createObjectTreeFactory class MyClass extends BaseClass
      constructor: (@props, @children) ->
      @getter
        inspectedObjects: -> {@props, children: if @children then (child.inspectedObjects for child in @children) else null}

    assert.eq (f foo: 123).inspectedObjects, props: {foo: 123}, children: null
    assert.eq(
      (f
        foo: 123
        f bar: 456
      ).inspectedObjects

      props:
        foo:        123

      children: [
        props: bar: 456
        children:   null
      ]
    )

  test "class full", ->
    class MyClass extends BaseClass
      constructor: (p, c) -> @props = p || {}; @children = c || []

      @getter
        plainObjects: ->
          props: @props
          children: (toPlainObjects child for child in @children)

    f = createObjectTreeFactory MyClass
    assert.eq (f foo: 123).plainObjects, props: {foo: 123}, children: []

    assert.eq(
      (f
        foo: 123
        f bar: 456
      ).plainObjects

      props: foo: 123
      children: [
        props: bar: 456
        children:   []
      ]
    )


  test "bound functions", ->
    class MyClass extends BaseClass
      constructor: (p, c) -> @props = p || {}; @children = c || []

      @getter
        plainObjects: ->
          props: @props
          children: (toPlainObjects child for child in @children)

      @myClassFunction: -> @getName()

    f = createObjectTreeFactory class: MyClass
    assert.eq f.myClassFunction(), "MyClass"