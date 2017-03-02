
{Foundation} = Neptune.Art

{parseUrl} = Foundation

if self.document
  suite "Art.Foundation.StandardLib.parseUrl", ->
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
