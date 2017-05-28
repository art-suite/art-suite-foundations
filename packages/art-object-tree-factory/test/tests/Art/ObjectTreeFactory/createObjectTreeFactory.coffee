{createObjectTreeFactory} = Neptune.Art.ObjectTreeFactory
{toPlainObjects, log} = Neptune.Art.StandardLib
{BaseClass} = Neptune.Art.ClassSystem

module.exports = suite: ->
  test "function", ->
    f = createObjectTreeFactory (props, children) -> {props, children}
    assert.eq (f foo: 123), props: {foo: 123}, children: []
    assert.eq(
      f
        foo: 123
        f bar: 456

      props:
        foo:        123
        props: bar: 456
        children:   []

      children: []
    )

  test "class", ->
    class MyClass extends BaseClass
      constructor: (@props, @children) ->

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
      constructor: (@props, @children) ->

      @getter
        plainObjects: ->
          props: @props
          children: (toPlainObjects child for child in @children)

      @myClassFunction: -> @getName()

    f = createObjectTreeFactory class: MyClass
    assert.eq f.myClassFunction(), "MyClass"