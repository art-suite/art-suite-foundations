suite "NeptuneNamespaces.Runtime.Neptune.includeInNamespace", ->
  for value in [false, true, null, undefined]
    do (value) ->
      test "#{value}: #{value}", ->
        class MyNamespace extends Runtime.NamespaceBaseClass
          @includeInNamespace "#{value}": value

        key = "#{value}"

        if value?
          assert.ok MyNamespace.hasOwnProperty key
          assert.eq MyNamespace[key], value
        else
          assert.ok !MyNamespace.hasOwnProperty key
