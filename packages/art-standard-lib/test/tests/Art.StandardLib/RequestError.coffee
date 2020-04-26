{compactFlatten, compact, flatten} = require './StandardImport'

suite: ->
  test "new RequestError with no params is ok", ->
    new RequestError

  test "new RequestError with {} is OK", ->
    new RequestError {}

  test "only type, key, status and data props are attached to the error directly", ->
    e = new RequestError initProps = status: "myStatus", key: "myKey", type: "myType", data: "myData", myProp: "bar"
    assert.selectedEq
      status:       "myStatus"
      key:          "myKey"
      type:         "myType"
      data:         "myData"
      myProp:       undefined
      props:        initProps
      e

  test "message", ->
    e = new RequestError status: "clientFailure", key: "http://somewhere.com/foo.html", type: "DELETE", data: "myData"
    assert.match e.message, /clientFailure/
    assert.match e.message, /somewhere/
    assert.match e.message, /DELETE/
    assert.match e.message, /myData/

  test "sourceLib", ->
    e = new RequestError sourceLib: "MySourceLib"
    assert.match e.name, /MySourceLib/
    assert.match e.toString(), /MySourceLib/
