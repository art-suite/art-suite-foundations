{
  urlJoin, parseUrl, parseQuery, sameOrigin
  generateQuery
} = Neptune.Art.StandardLib

module.exports = suite:
  parseQuery: ->
    testParseQuery = (input, expected) ->
      test input, ->
        assert.eq parseQuery(input), expected

    testParseQuery "?foo", foo: true
    testParseQuery "?foo=hi", foo: 'hi'
    testParseQuery "foo=hi", foo: 'hi'
    testParseQuery "?foo=hi&bar=bye", foo: 'hi', bar: 'bye'
    testParseQuery "?foo=hi%20there", foo: 'hi there'

  generateQuery: ->
    test "generateQuery", ->
      assert.eq generateQuery({
          isNull: null, isUndefined: undefined,
          isFalse: false,
          isTrue: true, isEmpty: '',
          isNotEmpty: 'abc'
        }),
        "isFalse=false&isTrue=true&isEmpty=&isNotEmpty=abc"

  urlJoin: ->
    tests = [
      ['http://foo.com/bob',     'http://foo.com/', 'bob' ]
      ['http://foo.com/bob',     'http://foo.com/', '/bob']
      ['http://foo.com/bob',     'http://foo.com',  '/bob']
      ['http://foo.com/bob',     'http://foo.com',  'bob' ]
      ['http://foo.com/bob/',    'http://foo.com',  'bob/' ]
      ['http://foo.com/bob/foo', 'http://foo.com',  'bob/foo' ]
    ]

    for [out, uri, path] in tests
      test "#{uri} + #{path} = #{out}", ->
        assert.eq out, urlJoin uri, path

  parseUrl: ->
    test "just domain", ->
      a = parseUrl "myDomain.com"
      assert.eq a,
        protocol: undefined
        username: undefined
        password: undefined
        hostWithPort: "mydomain.com"
        host:     "mydomain.com"
        port:     undefined
        pathName: undefined
        path:     undefined
        fileName: undefined
        query:    undefined
        anchor:   undefined

    test "with everything", ->
      a = parseUrl "ftp://myName:myPassword@mySubDomain.myDomain.com:8080/myPath/myFile.html?param1=foo,bar&param2=baz#myAnchor"
      assert.eq a,
        protocol: "ftp"
        username: "myName"
        password: "myPassword"
        hostWithPort: "mysubdomain.mydomain.com:8080"
        host: "mysubdomain.mydomain.com"
        port: "8080"
        pathName: "/myPath/myFile.html"
        path: "/myPath"
        fileName: "myFile.html"
        query:
          param1: "foo,bar"
          param2: "baz"
        anchor: "myAnchor"

  sameOrigin: ->
    tests = [
      [true,  "/",                        "http://foo.com"]
      [true,  "/foo",                     "http://foo.com"]
      [true,  "/",                        "http://foo.com:8080"]
      [true,  'http://foo.com/anything',  'http://foo.com']
      [true,  'https://foo.com/anything', 'https://foo.com']
      [true,  'http://foo.com/anything',  'http://foo.com/anythingelse']
      [false, 'http://foo.com/anything',  'https://foo.com']
      [false, 'http://foo.com/anything',  'http://bar.com']
      [false, 'http://foo.com/anything',  'http://foo.com:8080']
      [false, 'http://foo.com/anything',  'http://bar.com']
    ]
    for [result, url, origin] in tests
      test "#{result}: sameOrigin '#{url}', '#{origin}'", ->
        assert.eq result, sameOrigin url, origin
