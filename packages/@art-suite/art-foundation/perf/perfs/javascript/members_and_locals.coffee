{Foundation} = Neptune.Art

class Foo
  member: ->
    @foo = 0
    @bar = 0
    while @bar < 100
      @foo += @bar; @bar++
      @foo += @bar; @bar++
      @foo += @bar; @bar++
      @foo += @bar; @bar++
      @foo += @bar; @bar++

      @foo += @bar; @bar++
      @foo += @bar; @bar++
      @foo += @bar; @bar++
      @foo += @bar; @bar++
      @foo += @bar; @bar++

  local: ->
    foo = 0
    bar = 0
    while bar < 100
      foo += bar; bar++
      foo += bar; bar++
      foo += bar; bar++
      foo += bar; bar++
      foo += bar; bar++

      foo += bar; bar++
      foo += bar; bar++
      foo += bar; bar++
      foo += bar; bar++
      foo += bar; bar++

fooInstance = new Foo

suite "Javascript.members and locals", ->
  benchmark "member", -> fooInstance.member()
  benchmark "local", -> fooInstance.local()

suite "Javascript.typeof", ->
  str = "my string"
  benchmark "typeof string", ->
    (typeof "hi") == str

  benchmark "string.constructor == String", ->
    str.constructor == String
