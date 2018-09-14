{
  inspect
  isArray
  isString
  isDate
  isFunction
  isPlainObject
  isPlainArray
  isClass
  isObject
  objectName
  isBrowserObject
  present
  Promise
  isPromise
  hasKeys
  hasOwnKeys
  hasProperties
  hasOwnProperties
  isArrayIterable
  getSuper
  Map
  isArguments
  log
  gt, lt, gte, lte
  getSuperclass
} = Neptune.Art.StandardLib
{BaseClass} = require 'art-class-system'

module.exports = suite:
  hasProperties: ->
    foo = new class Foo
      baz: 123
    bar = new Foo
    bar.bud = 444

    test "hasProperties null", -> assert.eq false, hasProperties null
    test "hasProperties {}", -> assert.eq false, hasProperties {}
    test "hasProperties []", -> assert.eq false, hasProperties []
    test "hasProperties class instance with no properties", -> assert.eq true, hasProperties foo
    test "hasProperties class instance with properties", -> assert.eq true, hasProperties bar

    test "hasOwnProperties null", -> assert.eq false, hasOwnProperties null
    test "hasOwnProperties {}", -> assert.eq false, hasOwnProperties {}
    test "hasOwnProperties []", -> assert.eq false, hasOwnProperties []
    test "hasOwnProperties class instance with no properties", -> assert.eq false, hasOwnProperties foo
    test "hasOwnProperties class instance with properties", -> assert.eq true, hasOwnProperties bar

  isPromise: ->
    test "isPromise Promise.resolve()", -> assert.eq true, isPromise Promise.resolve()
    test "isPromise Promise.reject()", -> (assert.eq true, isPromise p = Promise.reject()); p.catch ->
    test "isPromise 1 is false", -> assert.eq false, isPromise 1
    test "isPromise '' is false", -> assert.eq false, isPromise ''
    test "isPromise {} is false", -> assert.eq false, isPromise {}
    test "isPromise Promise is false", -> assert.eq false, isPromise Promise

  isArrayIterable: ->
    test "isArrayIterable [] is true", -> assert.eq true, isArrayIterable []
    test "isArrayIterable Int8Array is true", -> assert.eq true, isArrayIterable new Int8Array(4)
    test "isArrayIterable arguments is true", -> assert.eq true, isArrayIterable arguments
    test "isArrayIterable string is true", ->
      assert.eq true, isArrayIterable "hi"
      assert.eq true, isArrayIterable ''

    test "isArrayIterable {length: 10} is true", -> assert.eq true, isArrayIterable length: 10
    test "isArrayIterable - non arrays are false", ->
      assert.eq false, isArrayIterable()
      assert.eq false, isArrayIterable null
      assert.eq false, isArrayIterable undefined
      assert.eq false, isArrayIterable {}
      assert.eq false, isArrayIterable 123

  isString: ->
    test "isString 'foo' is true", ->
      assert.eq true, isString "foo"
      assert.eq true, isString ''

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
      assert.eq false, isPlainArray ""
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
      assert.eq false, isFunction ''
      assert.eq false, isFunction undefined
      assert.eq false, isFunction 123
      assert.eq false, isFunction {}
      assert.eq false, isFunction []
      assert.eq false, isFunction "foo"

  isDate: ->
    test "isDate new Date is true",      -> assert.eq true, isDate new Date
    test "isDate '' is false",           -> assert.eq false, isDate ""
    test "isDate '07-04-2018' is false", -> assert.eq false, isDate "07-04-2018"

  isPlainObject: ->
    test "isPlainObject {} is true", -> assert.eq true, isPlainObject {}
    test "isPlainObject(new class Foo) is false", -> assert.eq false, isPlainObject new class Foo
    test "isPlainObject - non plain objects are false", ->
      assert.eq false, isPlainObject()
      assert.eq false, isPlainObject null
      assert.eq false, isPlainObject undefined
      assert.eq false, isPlainObject 123
      assert.eq false, isPlainObject "foo"
      assert.eq false, isPlainObject ""
      assert.eq false, isPlainObject []
      assert.eq false, isPlainObject ->

  isArguments: ->
    test "actual args", ->
      assert.eq true, isArguments (-> arguments)()

    test "just array", ->
      assert.eq false, isArguments []

    test "quacks-like-a-duck-args", ->
      assert.eq false, isArguments length: 0, callee: ->

    test "null", ->
      assert.eq false, isArguments null

    test "1", ->
      assert.eq false, isArguments 1

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
      assert.eq false, isObject ''
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

    test "present false is false", ->
      assert.eq false, present false

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
      assert.eq "hi", present false, "hi"
      assert.eq "hi", present "", "hi"

  inequality: ->
    testInequality = (a, b) ->
      test "#{a}.gt/lt/gte/lte #{b}", ->
        assert.eq gt(a, b), a > b, "gt"
        assert.eq lt(a, b), a < b, "lt"
        assert.eq gte(a, b), a >= b, "gte"
        assert.eq lte(a, b), a <= b, "lte"

    testInequality 1, 0
    testInequality 0, 1
    testInequality 0, 0
    testInequality 1, 1
    testInequality 1, 2
    testInequality 2, 1
    testInequality "hi", "hi"
    testInequality "hi1", "hi2"
    testInequality "hi2", "hi1"

  getSuperclass: ->
    class MyCoffeeScriptNotExtendClass
      mySpecialProtoProp: 123

    class MyCoffeeScriptExtendedClass extends Object
      mySpecialProtoProp: 123

    class MySubCoffeeScriptExtendedClass extends MyCoffeeScriptExtendedClass
      mySpecialProtoProp: 123

    class MyBaseClassCoffeeScriptExtendedClass extends BaseClass
      mySpecialProtoProp: 123

    try
      MyEs6NotExtendedClass = eval "(function(){class MyEs6NotExtendedClass {};return MyEs6NotExtendedClass;})()"
      global.MyEs6ExtendedClass = eval "(function(){class MyEs6ExtendedClass extends Object {};return MyEs6ExtendedClass;})()"
      MySubEs6ExtendedClass = eval "(function(){class MySubEs6ExtendedClass extends global.MyEs6ExtendedClass {};return MySubEs6ExtendedClass;})()"
      MyBaseClassEs6ExtendedClass = eval "(function(){class MyBaseClassEs6ExtendedClass extends Neptune.Art.ClassSystem.BaseClass {};return MyBaseClassEs6ExtendedClass;})()"

    test "CoffeeScript not extended",             -> assert.notPresent getSuperclass MyCoffeeScriptNotExtendClass
    test "CoffeeScript extend Object",            -> assert.equal Object, getSuperclass MyCoffeeScriptExtendedClass
    test "CoffeeScript extend Foo extend Object", -> assert.equal MyCoffeeScriptExtendedClass, getSuperclass MySubCoffeeScriptExtendedClass
    test "CoffeeScript extend BaseClass",         -> assert.equal BaseClass, getSuperclass MyBaseClassCoffeeScriptExtendedClass

    test "Es6 not extended",                      -> assert.notPresent getSuperclass MyEs6NotExtendedClass
    test "Es6 extended Object",                   -> assert.equal Object, getSuperclass MyEs6ExtendedClass
    test "Es6 extend Foo extend Object",          -> assert.equal MyEs6ExtendedClass, getSuperclass MySubEs6ExtendedClass
    test "Es6 extend BaseClass",                  -> assert.equal BaseClass, getSuperclass MyBaseClassEs6ExtendedClass

    test "null",                    -> assert.notPresent getSuperclass null
    test "undefined",               -> assert.notPresent getSuperclass undefined
    test "->",                      -> assert.notPresent getSuperclass ->
    test "{}",                      -> assert.notPresent getSuperclass {}

  getSuper: ->
    class MyExtendedClass extends BaseClass
      mySpecialProtoProp: 123

    myExtendedInstance = new MyExtendedClass

    try
      MyEs6ExtendedClass = eval "(function(){class MyEs6ExtendedClass extends Neptune.Art.ClassSystem.BaseClass {};return MyEs6ExtendedClass;})()"

    test "{}", -> assert.eq null, getSuper {}
    test "[]", -> assert.eq {}, getSuper []
    test "->", -> assert.eq Function.__proto__, getSuper ->
    MyEs6ExtendedClass && test "MyEs6ExtendedClass -> BaseClass", ->
      # evaluating in a funciton so that IE11 doesn't choke
      # only works with ES6 classes - which will be available in CoffeeScript 2 and CaffeineScript
      assert.eq BaseClass, getSuper MyEs6ExtendedClass

    MyEs6ExtendedClass && test "myExtendedInstance -> BaseClass.prototype", ->
      assert.eq Object.getPrototypeOf(myExtendedInstance), MyExtendedClass.prototype
      assert.eq Object.getPrototypeOf(Object.getPrototypeOf(myExtendedInstance)), Neptune.Art.ClassSystem.BaseClass.prototype
      assert.eq getSuper(myExtendedInstance), BaseClass.prototype
      # assert.instanceof BaseClass, getSuper myExtendedInstance
      # assert.eq MyExtendedClass.prototype, getSuper myExtendedInstance
