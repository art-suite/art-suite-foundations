{
  Map
  inspect
  isArray
  isString
  isFunction
  isPlainObject
  isPlainArray
  isClass
  isObject
  objectName
  isBrowserObject
  present
  isPromise
  hasKeys
  hasOwnKeys
  hasProperties
  hasOwnProperties
  isArrayIterable
  getSuper
  Map
  BaseObject
} = Neptune.Art.Foundation

module.exports = suite:
  hasProperties: ->
    foo = new class Foo
      baz: 123
    bar = new Foo
    bar.bud = 444

    test "hasProperties {}", -> assert.eq false, hasProperties {}
    test "hasProperties []", -> assert.eq false, hasProperties []
    test "hasProperties class instance with no properties", -> assert.eq true, hasProperties foo
    test "hasProperties class instance with properties", -> assert.eq true, hasProperties bar

    test "hasOwnProperties {}", -> assert.eq false, hasOwnProperties {}
    test "hasOwnProperties []", -> assert.eq false, hasOwnProperties []
    test "hasOwnProperties class instance with no properties", -> assert.eq false, hasOwnProperties foo
    test "hasOwnProperties class instance with properties", -> assert.eq true, hasOwnProperties bar

  isPromise: ->
    test "isPromise Promise.resolve()", -> assert.eq true, isPromise Promise.resolve()
    test "isPromise Promise.reject()", -> assert.eq true, isPromise Promise.reject()
    test "isPromise 1 is false", -> assert.eq false, isPromise 1
    test "isPromise {} is false", -> assert.eq false, isPromise {}

  isArrayIterable: ->
    test "isArrayIterable [] is true", -> assert.eq true, isArrayIterable []
    test "isArrayIterable Int8Array is true", -> assert.eq true, isArrayIterable new Int8Array(4)
    test "isArrayIterable arguments is true", -> assert.eq true, isArrayIterable arguments
    test "isArrayIterable string is true", -> assert.eq true, isArrayIterable "hi"
    test "isArrayIterable {length: 10} is true", -> assert.eq true, isArrayIterable length: 10
    test "isArrayIterable - non arrays are false", ->
      assert.eq false, isArrayIterable()
      assert.eq false, isArrayIterable null
      assert.eq false, isArrayIterable undefined
      assert.eq false, isArrayIterable {}
      assert.eq false, isArrayIterable 123

  isString: ->
    test "isString 'foo' is true", -> assert.eq true, isString "foo"
    test "isString - non strings are false", ->
      assert.eq false, isString()
      assert.eq false, isString null
      assert.eq false, isString undefined
      assert.eq false, isString 123
      assert.eq false, isString {}
      assert.eq false, isString []
      assert.eq false, isString ->

  isPlainArray: ->
    test "isPlainArray is isArray", -> assert.eq isPlainArray, isArray
    test "isPlainArray []", -> assert.eq true, isPlainArray []
    test "isPlainArray - false values", ->
      assert.eq false, isPlainArray {}
      assert.eq false, isPlainArray 123
      assert.eq false, isPlainArray "abc"
      assert.eq false, isPlainArray new Int8Array 4
      assert.eq false, isPlainArray false
      assert.eq false, isPlainArray null
      assert.eq false, isPlainArray undefined

  isFunction: ->
    test "isFunction(->) is true", -> assert.eq true, isFunction(->)
    test "isFunction(class Foo) is true", -> assert.eq true, isFunction(class Foo)
    test "isFunction - non functions are false", ->
      assert.eq false, isFunction()
      assert.eq false, isFunction null
      assert.eq false, isFunction undefined
      assert.eq false, isFunction 123
      assert.eq false, isFunction {}
      assert.eq false, isFunction []
      assert.eq false, isFunction "foo"

  isPlainObject: ->
    test "isPlainObject {} is true", -> assert.eq true, isPlainObject {}
    test "isPlainObject(new class Foo) is false", -> assert.eq false, isPlainObject new class Foo
    test "isPlainObject - non plain objects are false", ->
      assert.eq false, isPlainObject()
      assert.eq false, isPlainObject null
      assert.eq false, isPlainObject undefined
      assert.eq false, isPlainObject 123
      assert.eq false, isPlainObject "foo"
      assert.eq false, isPlainObject []
      assert.eq false, isPlainObject ->

  isClass: ->
    test "isClass empty-class is false - only class we can't detect correctly", ->
      assert.eq false, isClass class Foo

    test "isClass function is false", ->
      assert.eq false, isClass ->
      assert.eq false, isClass (a) ->
      assert.eq false, isClass (a, b) ->

    test "isClass class-contains-class-property is true", ->
      assert.eq true, isClass class Foo
        @bar: 0

    test "isClass class-contains-prototype-property is true", ->
      assert.eq true, isClass class Foo
        bar: 0

    test "isClass empty-class derived class is true", ->
      class Foo
      assert.eq true, isClass class Bar extends Foo

    test "isClass non-empty-class derived class is true", ->
      class Foo
        baz: 0
      assert.eq true, isClass class Bar extends Foo

    test "isClass - non class objects are false", ->
      assert.eq false, isClass()
      assert.eq false, isClass null
      assert.eq false, isClass undefined
      assert.eq false, isClass 123
      assert.eq false, isClass "foo"
      assert.eq false, isClass []
      assert.eq false, isClass {}
      assert.eq false, isClass ->

  isObject: ->
    test "isObject {} is true", -> assert.eq true, isObject {}
    test "isObject new class Foo is true", -> assert.eq true, isObject new class Foo
    test "isObject class Foo is false", -> assert.eq false, isObject class Foo
    test "isObject [] is false", -> assert.eq false, isObject []
    test "isObject null is false", -> assert.eq false, isObject null
    test "isObject -> is false", -> assert.eq false, isObject ->

    test "isObject - non objects are false", ->
      assert.eq false, isObject()
      assert.eq false, isObject undefined
      assert.eq false, isObject 123
      assert.eq false, isObject "foo"

  objectName: ->
    test "objectName new Class Foo == 'Foo'", ->
      class Foo
      assert.eq "Foo", objectName new Foo

    test "objectName Class Foo = 'Foo'", ->
      class Foo
      assert.eq "Foo", objectName Foo

    test "objectName -> == 'function'", ->
      assert.eq 'function', objectName ->

    test "objectName {} == 'Object'", ->
      assert.eq 'Object', objectName {}

    test "objectName 123 == 'Number'", ->
      assert.eq 'Number', objectName 123

    test "objectName 'foo' == '123'", ->
      assert.eq 'String', objectName 'foo'

    test "objectName null == 'null'", ->
      assert.eq 'null', objectName null

    test "objectName undefined == 'undefined'", ->
      assert.eq 'undefined', objectName undefined

  present: ->

    test "present strings", ->
      assert.eq false, present ''
      assert.eq false, present '   \t    \n   \n'
      assert.eq ' j', present ' j'
      assert.eq "j\n", present "j\n"
      assert.eq 'jh', present 'jh'

    test "present null, undefined", ->
      assert.eq true, present true
      assert.eq false, present null
      assert.eq false, present undefined

    test "present 0 is true", ->
      assert.eq true, present 0

    test "present false is true", ->
      assert.eq true, present false

    test "present numbers", ->
      assert.eq 0.5, present 0.5
      assert.eq 1, present 1
      assert.eq -1, present -1

    test "present custom", ->
      o1 = present: -> true
      o2 = present: -> false
      assert.eq o1, present o1
      assert.eq false, present o2

    test "returnIfNotPresent value", ->
      assert.eq "hi", present undefined, "hi"
      assert.eq "hi", present null, "hi"
      assert.eq true, present 0, "hi"
      assert.eq true, present false, "hi"
      assert.eq "hi", present "", "hi"

  getSuper: ->
    class MyExtendedClass extends BaseObject
      mySpecialProtoProp: 123

    myExtendedInstance = new MyExtendedClass

    MyEs6ExtendedClass = `class MyEs6ExtendedClass extends BaseObject {}`

    global.MyExtendedClass = MyExtendedClass
    global.myExtendedInstance = myExtendedInstance

    test "{}", -> assert.eq null, getSuper {}
    test "[]", -> assert.eq {}, getSuper []
    test "->", -> assert.eq Function.__proto__, getSuper ->
    test "MyEs6ExtendedClass -> BaseObject", ->
      # only works with ES6 classes - which will be available in CoffeeScript 2 and CaffeineScript
      assert.eq BaseObject, getSuper MyEs6ExtendedClass

    test "myExtendedInstance -> BaseObject.prototype", ->
      assert.eq Object.getPrototypeOf(myExtendedInstance), MyExtendedClass.prototype
      assert.eq Object.getPrototypeOf(Object.getPrototypeOf(myExtendedInstance)), Neptune.Art.Foundation.BaseObject.prototype
      assert.eq getSuper(myExtendedInstance), BaseObject.prototype
      # assert.instanceof BaseObject, getSuper myExtendedInstance
      # assert.eq MyExtendedClass.prototype, getSuper myExtendedInstance
