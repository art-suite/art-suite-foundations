
{StandardLib} = Neptune.Art
{log, isNode, object} = StandardLib
{formattedInspectString, escapeJavascriptString, formattedInspect, stripAnsi, ansiSafeStringLength, alignTabs, isString, inspect, toInspectedObjects, inspectedObjectLiteral, stripTrailingWhitespace} = StandardLib
{BaseClass} = require 'art-class-system'
testFIMultiLine = (input, out, maxLineLength = 0) ->
  test str = "formattedInspect #{inspect input}, #{maxLineLength}", ->
    o = stripTrailingWhitespace formattedInspect input, maxLineLength
    assert.eq o, out

require 'colors'

testFormattedInspectString = (map) ->
  object map, (v, k)->
    test "#{k} > #{v}", ->
      assert.eq(
        formattedInspect k
        v
      )


testAlignTabs = (str, testStr, maxLineLength = 10000) ->
  test "#{inspect(str)}, maxLineLength: #{maxLineLength}", ->
    assert.eq alignTabs(str, maxLineLength), testStr

module.exports = suite:
  color: ->
    if isNode
      test 'colored string', ->
        assert.eq '\u001b[32m"hi there"\u001b[39m', formattedInspect "hi there", color: true

      test 'colored []', ->
        assert.eq "\u001b[90m[]\u001b[39m", formattedInspect [], color: true

      test 'colored a:1', ->
        assert.eq "\u001b[34ma:\u001b[39m \u001b[33m1\u001b[39m", formattedInspect {a:1}, color: true

      test 'colored all', ->
        assert.eq """
          \u001b[90m[]\u001b[39m
            \u001b[34ma:\u001b[39m \u001b[33m1\u001b[39m
            \u001b[32m:hi\u001b[39m
          """,
          formattedInspect [{a:1}, "hi"], color: true

  strings:
    multiLine: ->

      testFormattedInspectString
        "\n":     '"\\n"'
        "\na":    '"\\na"'
        "a\n":    '"a\\n"'
        "\na\n":  '"\\na\\n"'

        "a\nb":
          '''
          """
            a
            b
          '''

    multiLineStartingWhitespace: ->

      testFormattedInspectString
        "\na\nb":
          '''
          """
            \\na
            b
          '''

        " a\nb":
          '''
          """
            \\sa
            b
          '''

    multiLineTrailingWhitespace: ->

      testFormattedInspectString
        "a\nb\n":
          '''
          """
            a
            b\\n
          '''

        "a\nb ":
          '''
          """
            a
            b\\s
          '''

        "a \nb":
          '''
          """
            a\\s
            b
          '''


  singleLine: ->
    class Foo extends BaseClass
      @namespacePath: "MyNamespace.Foo"

    testFI = (input, out, altOut) ->
      test str = "formattedInspect #{inspect input}", ->
        o = formattedInspect input
        # log "input: #{input}"
        # log "actual output: #{o}"
        # log "expected output: #{out}"
        if isString out
          if altOut != o
            assert.eq o, out
        else
          assert.match o, out

    testFI '"hi there"', "'\"hi there\"'"
    testFI "'hi there'", '"\'hi there\'"'

    testFI '"hi"', "'\"hi\"'"
    testFI "'hi'", '"\'hi\'"'
    testFI "hi", ":hi"
    testFI ((a)->123), '(a) -> { return 123; }', 'function(a) { return 123; }'
    testFI a:1, "a: 1"
    testFI /hi/, "/hi/"
    testFI inspect:(->'myInspectOutput'), ///
      inspect.*
      myInspectOutput
      ///
    testFI [], "[]"
    testFI ['string', foo: 'bar'], '[] :string, foo: :bar'
    testFI [{foo: 'bar'}, 'string'], """
      []
        foo: :bar
        :string
    """
    testFI [1], "[] 1"
    testFI [1,2], "[] 1, 2"
    testFI [a:1, 2],
      """
      []
        a: 1
        2
      """

    testFI a:1, b:2, "a: 1, b: 2"
    testFI a:[1, 2], b:3,
      """
      a: [] 1, 2
      b: 3
      """

    testFI [[1, 2], [3,4]],
      """
      []
        [] 1, 2
        [] 3, 4
      """

    testFI a:{a1:1, a2:2}, b:{b1:1, b2:2},
      """
      a: a1: 1, a2: 2
      b: b1: 1, b2: 2
      """

    testFI [{a:1}, {b:2}],
      """
      []
        {} a: 1
        {} b: 2
      """

    testFI 'has:':1, '"has:": 1'

    testFI Foo, "class #{Foo.namespacePath}"
    testFI (new Foo), "<#{Foo.namespacePath}>"

  ansiSafeStringLength: ->
    if isNode
      test 'basic', ->
        assert.eq 5, ansiSafeStringLength "basic"

      test 'colored', ->
        assert.lt 5, "basic".red.length
        assert.eq 5, ansiSafeStringLength "basic".red

      test 'stripAnsi', ->
        assert.eq "basic", stripAnsi "basic".red
        assert.neq "basic", "basic".red

  alignTabs: ->

    testAlignTabs """
      alice\t1
      bill\t2
      """,
      """
      alice 1
      bill  2
      """

    testAlignTabs """
      Neptune:
        version:"1.10.2"
        Neptune.CaffeineMc:
          Neptune.CaffeineMc.Compilers:modules:\t"JavaScript"
          modules:\t"CafRepl, CaffeineMcParser, FileCompiler, Metacompiler, ModuleResolver, SourceRoots"
      """, """
      Neptune:
        version:"1.10.2"
        Neptune.CaffeineMc:
          Neptune.CaffeineMc.Compilers:modules: "JavaScript"
          modules:                              "CafRepl, CaffeineMcParser, FileCompiler, Metacompiler, ModuleResolver, SourceRoots"
      """

    testAlignTabs """
      Neptune:
        version:"1.10.2"
        Neptune.CaffeineMc:
          Neptune.CaffeineMc.Compilers:modules:\t"JavaScript"
          modules:\t"CafRepl, CaffeineMcParser, FileCompiler, Metacompiler, ModuleResolver, SourceRoots"

        Neptune.Art:
          Neptune.Art.ClassSystem:modules:\t"BaseClass, BaseObject, WebpackHotLoader"
          Neptune.Art.StandardLib:
            Neptune.Art.StandardLib.Core:modules:\t"ArrayCompactFlatten, Merge, StringCase, Types"
            Neptune.Art.StandardLib.Inspect:
              Neptune.Art.StandardLib.Inspect.Inspected:modules:\t"Array, Core, Object, String"
              modules:\t"FormattedInspect, InspectedObjectLiteral, InspectedObjects, Inspector, Inspector2, PlainObjects"

            modules:\t"ArrayExtensions, AsyncExtensions, CallStack, Clone, CommonJs, Eq, ErrorWithInfo, Function, Iteration, Log, Map, MathExtensions, MinimalBaseObject, ObjectDiff, ObjectExtensions, ParseUrl, Promise, PromisedFileReader, Regexp, Ruby, ShallowClone, StringExtensions, Time, TypesExtended, Unique"

          Neptune.Art.ObjectTreeFactory:{}

        Neptune.BabelBridge:
      """, """
      Neptune:
        version:"1.10.2"
        Neptune.CaffeineMc:
          Neptune.CaffeineMc.Compilers:modules:                  "JavaScript"
          modules:                                               "CafRepl, CaffeineMcParser, FileCompiler, Metacompiler, ModuleResolver, SourceRoots"

        Neptune.Art:
          Neptune.Art.ClassSystem:modules:                       "BaseClass, BaseObject, WebpackHotLoader"
          Neptune.Art.StandardLib:
            Neptune.Art.StandardLib.Core:modules:                "ArrayCompactFlatten, Merge, StringCase, Types"
            Neptune.Art.StandardLib.Inspect:
              Neptune.Art.StandardLib.Inspect.Inspected:modules: "Array, Core, Object, String"
              modules: "FormattedInspect, InspectedObjectLiteral, InspectedObjects, Inspector, Inspector2, PlainObjects"

            modules: "ArrayExtensions, AsyncExtensions, CallStack, Clone, CommonJs, Eq, ErrorWithInfo, Function, Iteration, Log, Map, MathExtensions, MinimalBaseObject, ObjectDiff, ObjectExtensions, ParseUrl, Promise, PromisedFileReader, Regexp, Ruby, ShallowClone, StringExtensions, Time, TypesExtended, Unique"

          Neptune.Art.ObjectTreeFactory:{}

        Neptune.BabelBridge:
      """, 150

  alignTabsColor: ->

    testAlignTabs 'a:\t1,\tb:\t2', "a: 1, b: 2"
    testAlignTabs '\u001b[34ma:\u001b[39m\t\u001b[33m1\u001b[39m,\t\u001b[34mb:\u001b[39m\t\u001b[33m2\u001b[39m',
      '\u001b[34ma:\u001b[39m \u001b[33m1\u001b[39m, \u001b[34mb:\u001b[39m \u001b[33m2\u001b[39m'

  maxLineLength:
    simpleArray: ->
      testFIMultiLine [1, 2], """
        []
          1
          2
        """, "[] 1, 2".length - 1

      testFIMultiLine [1, 2], "[] 1, 2", "[] 1, 2".length

    objectArray: ->
      testFIMultiLine
        a: [1, 2]
        "a: [] 1, 2"
        "a: [] 1, 2".length

      testFIMultiLine
        a: [1, 2]
        """
        a:
          [] 1, 2
        """
        "a: [] 1, 2".length-1

      testFIMultiLine
        a: [1, 2]
        """
        a: []
          1
          2
        """
        5

    arrayObject: ->
      testFIMultiLine [ab: 1],
        "[] ab: 1"
        "[] ab: 1".length

      testFIMultiLine [ab: 1],
        """
        []
          ab: 1
        """
        "[] ab: 1".length-1

      testFIMultiLine [ab: 1],
        """
        []
          ab:
            1
        """
        4

    tabs: ->
      testFIMultiLine
        userA:
          name: "John Groovy Handcock"
          address: "home"
        userB:
          name: "Amy Mae"
          address: "home on the range"
        """
        userA: name: "John Groovy Handcock", address: :home
        userB: name: "Amy Mae",              address: "home on the range"
        """
        65

      testFIMultiLine
        userA:
          name: "John Groovy Handcock"
          address: "home"
        userB:
          name: "Amy Mae"
          address: "home on the range"
        """
        userA: name: "John Groovy Handcock", address: :home
        userB: name: "Amy Mae", address: "home on the range"
        """
        64

      testFIMultiLine a:1, wxyz:4, "a:    1\nwxyz: 4", 10
      testFIMultiLine a: {b:1}, wxyz: {abc: 4},
        """
        a:    b:   1
        wxyz: abc: 4
        """
        100


  multiLine:
    array: ->

      testFIMultiLine [1, 2], """
        []
          1
          2
        """

      testFIMultiLine [[1, 2], [3,4]],
        """
        []
          [] 1, 2
          [] 3, 4
        """
        1000

    object: ->
      testFIMultiLine a:1, b:2, """
        a:
          1

        b:
          2
        """

      testFIMultiLine a:{a1:1, a2:2}, b:{b1:1, b2:2},
        """
        a:
          a1: 1
          a2: 2

        b:
          b1: 1
          b2: 2
        """
        10

    objectArrays: ->
      testFIMultiLine a:[1, 2], b:[3, 4], """
        a: []
          1
          2

        b: []
          3
          4
        """

    objectArraysObjects: ->
      testFIMultiLine a:[{a1:1}, a2:2], b:[{b3:3}, b4:4], """
        a: []
          {} a1: 1
          {} a2: 2

        b: []
          {} b3: 3
          {} b4: 4
        """, 10

    arrayObjects: ->
      testFIMultiLine [{a1:1, a2:2}, {b1:1, b2:2}],
        """
        []
          {}
            a1: 1
            a2: 2

          {}
            b1: 1
            b2: 2
        """
        10

    arrayObjectsArrays: ->
      testFIMultiLine [{a1:[1,1], a2:[1,2]}, {b1:[2,1], b2:[2,2]}], """
        []
          {}
            a1: []
              1
              1

            a2: []
              1
              2

          {}
            b1: []
              2
              1

            b2: []
              2
              2
        """

      testFIMultiLine [{a1:[1,1], a2:[1,2]}, {b1:[2,1], b2:[2,2]}],
        """
        []
          {}
            a1: [] 1, 1
            a2: [] 1, 2

          {}
            b1: [] 2, 1
            b2: [] 2, 2
        """
        1000

    mixed: ->
      testFIMultiLine ['string', foo: 'bar'], """
        []
          :string
          foo: :bar
        """,
        12

      testFIMultiLine [inspectedObjectLiteral('myInspectedObjectLiteral'), foo: 'bar'], """
        []
          myInspectedObjectLiteral
          foo: :bar
        """,
        12

      testFIMultiLine a:[1,2], b:2, """
        a: []
          1
          2

        b: 2
        """,
        5

      testFIMultiLine (getInspectedObjects:-> [
          "A"
          foo: "B"
          bar: "C"
        ]), """
        []
          :A
          foo: :B
          bar: :C
        """, 11

      testFIMultiLine [
          foo: "A"
          bar: "B"
          "C"
          fad: "D"
          baz: "E"
        ], """
        []
          foo: :A
          bar: :B

          :C
          fad: :D
          baz: :E
        """, 11

  wordStrings: ->
    testFIMultiLine [
      "abc"
    ],
      """
        []
          :abc
      """


  regressions: ->
    testFIMultiLine
      a: [1, 2]
      b: 3
      """
      a: []
        1
        2

      b:
        3
      """

    testFIMultiLine [
      {}
      {}
    ], """
      []
        {}
        {}
      """


    testFIMultiLine
      Neptune:
        version: "1.10.2"
        "Neptune.CaffeineMc":
          "Neptune.CaffeineMc.Compilers": modules: "JavaScript"
          modules: "CafRepl, CaffeineMcParser, FileCompiler, Metacompiler, ModuleResolver, SourceRoots"

        "Neptune.Art":
          "Neptune.Art.ClassSystem":
            modules: "BaseClass, BaseObject, WebpackHotLoader"
          "Neptune.Art.StandardLib":
            "Neptune.Art.StandardLib.Core":
              modules: "ArrayCompactFlatten, Merge, StringCase, Types"
            "Neptune.Art.StandardLib.Inspect":
              "Neptune.Art.StandardLib.Inspect.Inspected":
                modules: "Array, Core, Object, String",
              modules: "FormattedInspect, InspectedObjectLiteral, InspectedObjects, Inspector, Inspector2, PlainObjects"
            modules: "ArrayExtensions, AsyncExtensions, CallStack, Clone, CommonJs, Eq, ErrorWithInfo, Function, Iteration, Log, Map, MathExtensions, MinimalBaseObject, ObjectDiff, ObjectExtensions, ParseUrl, Promise, PromisedFileReader, Regexp, Ruby, ShallowClone, StringExtensions, Time, TypesExtended, Unique"
          "Neptune.Art.ObjectTreeFactory":  {}

      # This is actually correct, even though it seems like nothing aligns nice. We need a better algorithm :).
      """
      Neptune:
        version: :1.10.2
        Neptune.CaffeineMc:
          Neptune.CaffeineMc.Compilers: modules: :JavaScript
          modules:                      "CafRepl, CaffeineMcParser, FileCompiler, Metacompiler, ModuleResolver, SourceRoots"

        Neptune.Art:
          Neptune.Art.ClassSystem: modules: "BaseClass, BaseObject, WebpackHotLoader"
          Neptune.Art.StandardLib:
            Neptune.Art.StandardLib.Core: modules: "ArrayCompactFlatten, Merge, StringCase, Types"
            Neptune.Art.StandardLib.Inspect:
              Neptune.Art.StandardLib.Inspect.Inspected: modules: "Array, Core, Object, String"
              modules:                                   "FormattedInspect, InspectedObjectLiteral, InspectedObjects, Inspector, Inspector2, PlainObjects"

            modules:
              "ArrayExtensions, AsyncExtensions, CallStack, Clone, CommonJs, Eq, ErrorWithInfo, Function, Iteration, Log, Map, MathExtensions, MinimalBaseObject, ObjectDiff, ObjectExtensions, ParseUrl, Promise, PromisedFileReader, Regexp, Ruby, ShallowClone, StringExtensions, Time, TypesExtended, Unique"

          Neptune.Art.ObjectTreeFactory: {}
      """, 150

  regressionsInfiniteLoop: ->
    test 'infinit loop', ->
      out = formattedInspect data: '{"mappings":{"post_search":{"_parent":{"type":"topic"},"properties":{"topicId":{"type":"keyword"},"userId":{"type":"keyword"},"postOrder":{"type":"long"},"createdAt":{"type":"long"},"updatedAt":{"type":"long"},"isChapterStart":{"type":"boolean"},"caption":{"type":"text","analyzer":"english"},"tags":{"type":"text"},"mentions":{"type":"text"},"mediaMimeType":{"type":"keyword"},"mediaAspectRatio":{"type":"short"},"mediaUrl":{"type":"keyword","index":false},"mediaFocus":{"type":"object","index":false},"mediaDimensions":{"type":"object","index":false},"mediaColorInfo":{"type":"object","index":false},"templateUrl":{"type":"keyword","index":false},"templateType":{"type":"keyword"},"templateDropInCount":{"type":"byte"},"templateText":{"type":"text","analyzer":"english"},"templateDropInLocations":{"type":"nested","index":false},"templateUses":{"type":"integer"},"activityCount":{"type":"integer"},"lastActivityAt":{"type":"long"},"messageCount":{"type":"integer","index":false},"participantCount":{"type":"integer","index":false},"lastActiveUserId":{"type":"keyword","index":false},"lastMessageId":{"type":"keyword","index":false}}},"topic_search":{"_parent":{"type":"user"},"properties":{"title":{"type":"text","analyzer":"english"},"createdAt":{"type":"long"},"updatedAt":{"type":"long"},"lastPostCreatedAt":{"type":"long"},"lastPostId":{"type":"keyword"},"lastChapterPostId":{"type":"keyword"},"postCount":{"type":"integer"},"followerCount":{"type":"integer"},"activityCount":{"type":"long"},"messageCount":{"type":"long"},"isProfileTopic":{"type":"boolean"}}},"user_search":{"properties":{"displayName":{"type":"text","analyzer":"english"},"postCount":{"type":"integer"},"topicCount":{"type":"short"},"followerCount":{"type":"integer"},"messageCount":{"type":"integer"},"lastTopicCreatedAt":{"type":"long"},"lastPostCreatedAt":{"type":"long"},"profileTopicId":{"type":"keyword","index":false}}}},"settings":{}}'
      assert.eq out,
        "data:\n  '{\"mappings\":{\"post_search\":{\"_parent\":{\"type\":\"topic\"},\"properties\":{\"topicId\":{\"type\":\"keyword\"},\"userId\":{\"type\":\"keyword\"},\"postOrder\":{\"type\":\"long\"},\"createdAt\":{\"type\":\"long\"},\"updatedAt\":{\"type\":\"long\"},\"isChapterStart\":{\"type\":\"boolean\"},\"caption\":{\"type\":\"text\",\"analyzer\":\"english\"},\"tags\":{\"type\":\"text\"},\"mentions\":{\"type\":\"text\"},\"mediaMimeType\":{\"type\":\"keyword\"},\"mediaAspectRatio\":{\"type\":\"short\"},\"mediaUrl\":{\"type\":\"keyword\",\"index\":false},\"mediaFocus\":{\"type\":\"object\",\"index\":false},\"mediaDimensions\":{\"type\":\"object\",\"index\":false},\"mediaColorInfo\":{\"type\":\"object\",\"index\":false},\"templateUrl\":{\"type\":\"keyword\",\"index\":false},\"templateType\":{\"type\":\"keyword\"},\"templateDropInCount\":{\"type\":\"byte\"},\"templateText\":{\"type\":\"text\",\"analyzer\":\"english\"},\"templateDropInLocations\":{\"type\":\"nested\",\"index\":false},\"templateUses\":{\"type\":\"integer\"},\"activityCount\":{\"type\":\"integer\"},\"lastActivityAt\":{\"type\":\"long\"},\"messageCount\":{\"type\":\"integer\",\"index\":false},\"participantCount\":{\"type\":\"integer\",\"index\":false},\"lastActiveUserId\":{\"type\":\"keyword\",\"index\":false},\"lastMessageId\":{\"type\":\"keyword\",\"index\":false}}},\"topic_search\":{\"_parent\":{\"type\":\"user\"},\"properties\":{\"title\":{\"type\":\"text\",\"analyzer\":\"english\"},\"createdAt\":{\"type\":\"long\"},\"updatedAt\":{\"type\":\"long\"},\"lastPostCreatedAt\":{\"type\":\"long\"},\"lastPostId\":{\"type\":\"keyword\"},\"lastChapterPostId\":{\"type\":\"keyword\"},\"postCount\":{\"type\":\"integer\"},\"followerCount\":{\"type\":\"integer\"},\"activityCount\":{\"type\":\"long\"},\"messageCount\":{\"type\":\"long\"},\"isProfileTopic\":{\"type\":\"boolean\"}}},\"user_search\":{\"properties\":{\"displayName\":{\"type\":\"text\",\"analyzer\":\"english\"},\"postCount\":{\"type\":\"integer\"},\"topicCount\":{\"type\":\"short\"},\"followerCount\":{\"type\":\"integer\"},\"messageCount\":{\"type\":\"integer\"},\"lastTopicCreatedAt\":{\"type\":\"long\"},\"lastPostCreatedAt\":{\"type\":\"long\"},\"profileTopicId\":{\"type\":\"keyword\",\"index\":false}}}},\"settings\":{}}'\n"
