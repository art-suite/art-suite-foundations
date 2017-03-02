
{Foundation} = Neptune.Art
{log} = Foundation
{formattedInspect, isString, inspect, toInspectedObjects, inspectedObjectLiteral, BaseObject, stripTrailingWhitespace} = Foundation
testFIMultiLine = (input, out, maxLineLength = 0) ->
  test str = "formattedInspect #{inspect input}, #{maxLineLength}", ->
    o = stripTrailingWhitespace formattedInspect input, maxLineLength
    log inspect: -> str
    log input
    log o
    assert.eq o, out

module.exports = suite:
  singleLine: ->
    class Foo extends BaseObject
      @namespacePath: "MyNamespace.Foo"

    testFI = (input, out) ->
      test str = "formattedInspect #{inspect input}", ->
        o = formattedInspect input
        log "input: #{input}"
        log "actual output: #{o}"
        log "expected output: #{out}"
        if isString out
          assert.eq o, out
        else
          assert.match o, out

    testFI '"hi"', "'\"hi\"'"
    testFI "'hi'", '"\'hi\'"'
    testFI ((a)->123), '(a) -> { return 123; }'
    testFI a:1, "a: 1"
    testFI /hi/, "/hi/"
    testFI inspect:(->'myInspectOutput'), ///
      inspect.*
      myInspectOutput
      ///
    testFI [], "[]"
    testFI ['string', foo: 'bar'], '"string", foo: "bar"'
    testFI [1], "- 1"
    testFI [1,2], "1, 2"
    testFI [a:1, 2], "a: 1, 2"
    testFI a:1, b:2, "a: 1, b: 2"
    testFI a:[1, 2], b:3, "a: 1, 2\nb: 3"
    testFI [[1, 2], [3,4]], "- 1, 2\n- 3, 4"
    testFI a:{a1:1, a2:2}, b:{b1:1, b2:2}, "a: a1: 1, a2: 2\nb: b1: 1, b2: 2"
    testFI [{a:1}, {b:2}], "- a: 1\n- b: 2"
    testFI 'has:':1, '"has:": 1'

    testFI Foo, Foo.namespacePath
    testFI (new Foo), "<#{Foo.namespacePath}>"

  maxLineLength:
    simpleArray: ->
      testFIMultiLine [1, 2], """
        - 1
        - 2
        """, 3

      testFIMultiLine [1, 2], "1, 2", 4

    objectArray: ->
      testFIMultiLine
        a: [1, 2]
        "a: 1, 2"
        7

      testFIMultiLine
        a: [1, 2]
        """
        a:
          1, 2
        """
        6

      testFIMultiLine
        a: [1, 2]
        """
        a:
        - 1
        - 2
        """
        5

    arrayObject: ->
      testFIMultiLine [a: 1],
        """
        - a: 1
        """
        6

      testFIMultiLine [a: 1],
        """
        - a:
            1
        """
        5

      testFIMultiLine [a: 1],
        """
        - a:
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
        userA: name: "John Groovy Handcock", address: "home"
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
        userA: name: "John Groovy Handcock", address: "home"
        userB: name: "Amy Mae", address: "home on the range"
        """
        64


  multiLine:
    array: ->

      testFIMultiLine [1, 2], """
        - 1
        - 2
        """

      testFIMultiLine [[1, 2], [3,4]], """
        - - 1
          - 2

        - - 3
          - 4
        """

    object: ->
      testFIMultiLine a:1, b:2, """
        a:
          1

        b:
          2
        """

      testFIMultiLine a:{a1:1, a2:2}, b:{b1:1, b2:2}, """
        a:
          a1:
            1

          a2:
            2

        b:
          b1:
            1

          b2:
            2
        """

    objectArrays: ->
      testFIMultiLine a:[1, 2], b:[3, 4], """
        a:
        - 1
        - 2

        b:
        - 3
        - 4
        """

    objectArraysObjects: ->
      testFIMultiLine a:[{a1:1}, a2:2], b:[{b3:3}, b4:4], """
        a:
        - a1:
            1

        - a2:
            2

        b:
        - b3:
            3

        - b4:
            4
        """

    arrayObjects: ->
      testFIMultiLine [{a1:1, a2:2}, {b1:1, b2:2}], """
        - a1:
            1

          a2:
            2

        - b1:
            1

          b2:
            2
        """

    arrayObjectsArrays: ->
      testFIMultiLine [{a1:[1,1], a2:[1,2]}, {b1:[2,1], b2:[2,2]}], """
        - a1:
          - 1
          - 1

          a2:
          - 1
          - 2

        - b1:
          - 2
          - 1

          b2:
          - 2
          - 2
        """

    tabs: ->
      testFIMultiLine a:1, wxyz:4, "a:    1\nwxyz: 4", 10

    mixed: ->
      testFIMultiLine ['string', foo: 'bar'], """
        - "string"
        - foo: "bar"
        """,
        12

      testFIMultiLine [inspectedObjectLiteral('string'), foo: 'bar'], """
        - string
        - foo: "bar"
        """,
        12

      testFIMultiLine a:[1,2], b:2, """
        a:
        - 1
        - 2

        b: 2
        """,
        5

      testFIMultiLine (getInspectedObjects:-> [
          "A"
          foo: "B"
          bar: "C"
        ]), """
        - "A"
        - foo: "B"
          bar: "C"
        """, 11

      testFIMultiLine [
          foo: "A"
          bar: "B"
          "C"
          fad: "D"
          baz: "E"
        ], """
        - foo: "A"
          bar: "B"

        - "C"
        - fad: "D"
          baz: "E"
        """, 11
