{
  log
  w
  findUrlOrigin, emailRegexp, domainRegexp, urlProtocolRegexp, urlPathRegexp, urlQueryRegexp, compactFlatten, urlRegexp, peek, arrayWithoutLast
  findUrlWithOptionalProtocolRegExp
  findUrlRegExp
  array
  findEmailRegExp
  findAllUrlsWithOptionalProtocolRegExp
} = Neptune.Art.StandardLib

popNullish = (a) ->
  a = arrayWithoutLast a while !peek(a)?
  a

module.exports = suite: ->
  emails = [
    "shanebdavis@gmail.com"
    "shane😇davis@gmail.com"
    "shanebdavis@www.gmail.com"
    "shane.davis@www.gmail.com"
    '"shane davis"@www.gmail.com'
    "shane\\@davis@www.gmail.com"
    "user+mailbox@example.com"
    "customer/department=shipping@example.com"
    "$A12345@example.com"
    "!def!xyz%abc@example.com"
    "_somename@example.com"
    "a.collewijn-haan@quicknet.nl"
    "a3col@icloud.com"
  ]
  array emails, (email)->
    test "emailRegexp #{email}", ->
      assert.match email, emailRegexp
      [first] = emailRegexp.exec email
      assert.eq first, email

  test "emailRegexp", ->
    assert.eq "shanebdavis@gmail.com"       .match(emailRegexp), ["shanebdavis@gmail.com", "shanebdavis", "gmail.com"]
    assert.eq "shanebdavis@www.gmail.com"   .match(emailRegexp), ["shanebdavis@www.gmail.com", "shanebdavis", "www.gmail.com"]

  test "findEmailRegExp success: <a@b.c>",     -> assert.eq "<a@b.c>"     .match(findEmailRegExp), ["a@b.c", "a", "b.c"]
  test "findEmailRegExp success: <a@b.c.d.e>", -> assert.eq "<a@b.c.d.e>" .match(findEmailRegExp), ["a@b.c.d.e", "a", "b.c.d.e"]
  test "findEmailRegExp success: <shanebdavis@gmail.com>", ->
    assert.eq "<shanebdavis@gmail.com>"     .match(findEmailRegExp), ["shanebdavis@gmail.com", "shanebdavis", "gmail.com"]

  test "findEmailRegExp 'foo@bar.com.'", ->
    assert.eq(
      'foo@bar.com.'.match findEmailRegExp
      ["foo@bar.com", "foo", "bar.com"]
    )

  for badEmail in w "
      <shanebdavis@@gmail.com>
      <shanebdavis@.gmail.com>
      <shanebdavis@gmail>
      <shanebdavis@.gmail>
      <shanebdavis@gmail.>
      "
    test "findEmailRegExp fail: #{badEmail}", ->
      assert.eq badEmail.match(findEmailRegExp), null

  test "domainRegexp successes", ->
    assert.eq "gmail.com".match(domainRegexp), ["gmail.com"]
    assert.eq "gmail0.com".match(domainRegexp), ["gmail0.com"]
    assert.eq "gmail.evilplanet".match(domainRegexp), ["gmail.evilplanet"]
    assert.eq "g-mail.com".match(domainRegexp), ["g-mail.com"]
    assert.eq "g.mail.com".match(domainRegexp), ["g.mail.com"]
    assert.eq "g.m-ail.com".match(domainRegexp), ["g.m-ail.com"]

  test "localhost valid", ->
    assert.eq !!"localhost".match(domainRegexp), true

  test "domainRegexp failures", ->
    assert.eq !!".com".match(domainRegexp), false

  test "findUrlOrigin", ->
    assert.eq "file://".match(findUrlOrigin),               ["file://",             "file",   "://", undefined,     undefined,  undefined]
    assert.eq "http://foo.com".match(findUrlOrigin),        ["http://foo.com",      "http",   "://", "foo.com",     undefined,  undefined]
    assert.eq "http://www.foo.com".match(findUrlOrigin),    ["http://www.foo.com",  "http",   "://", "www.foo.com", undefined,  undefined]
    assert.eq "https://foo.com".match(findUrlOrigin),       ["https://foo.com",     "https",  "://", "foo.com",     undefined,  undefined]
    assert.eq "https://foo.com:8080".match(findUrlOrigin),  ["https://foo.com:8080","https",  "://", "foo.com",     ":",        "8080"]

  test "urlProtocolRegexp successes", ->
    assert.eq "https://".match(urlProtocolRegexp), ["https://", "https", "://"]
    assert.eq "http://".match(urlProtocolRegexp),  ["http://", "http", "://"]
    assert.eq "HTTP://".match(urlProtocolRegexp),  ["HTTP://", "HTTP", "://"]
    assert.eq "ftp://".match(urlProtocolRegexp),   ["ftp://", "ftp", "://"]

  test "urlProtocolRegexp failures", ->
    assert.eq !!"http".match(urlProtocolRegexp), false
    assert.eq "http0://".match(urlProtocolRegexp), ["http0://", "http0", "://"]
    assert.eq !!"http:/".match(urlProtocolRegexp), false
    assert.eq !!"://".match(urlProtocolRegexp), false

  test "urlPathRegexp successes", ->
    assert.eq "/".match(urlPathRegexp), ["/"]
    assert.eq "//".match(urlPathRegexp), ["//"]
    assert.eq "/foo".match(urlPathRegexp), ["/foo"]
    assert.eq "/foo0".match(urlPathRegexp), ["/foo0"]
    assert.eq "/foo/bar".match(urlPathRegexp), ["/foo/bar"]
    assert.eq "/foo_bar".match(urlPathRegexp), ["/foo_bar"]
    assert.eq "/foo-Bar".match(urlPathRegexp), ["/foo-Bar"]
    assert.eq "/foo%20Bar".match(urlPathRegexp), ["/foo%20Bar"]
    assert.eq "/foo+Bar".match(urlPathRegexp), ["/foo+Bar"]

  test "urlPathRegexp failures", ->
    assert.eq !!"/foo Bar".match(urlPathRegexp), false
    assert.eq !!"/foo%2zBar".match(urlPathRegexp), false
    assert.eq (a = "/-._~!$&'()*+,;=:@").match(urlPathRegexp), [a]
    assert.eq (a = "/abcdefghijklmnopqrstuvwxyz").match(urlPathRegexp), [a]
    assert.eq (a = "/ABCDEFGHIJKLMNOPQRSTUVWXYZ").match(urlPathRegexp), [a]
    assert.eq (a = "/0123456789").match(urlPathRegexp), [a]

  test "urlQueryRegexp successes", ->
    assert.eq "foo".match(urlQueryRegexp),     ["foo"]
    assert.eq "foo0".match(urlQueryRegexp),    ["foo0"]
    assert.eq "foo=bar".match(urlQueryRegexp), ["foo=bar"]
    assert.eq "foo-bar".match(urlQueryRegexp), ["foo-bar"]
    assert.eq "foo+bar".match(urlQueryRegexp), ["foo+bar"]
    assert.eq "foo_bar".match(urlQueryRegexp), ["foo_bar"]
    assert.eq "foo%20bar".match(urlQueryRegexp), ["foo%20bar"]

  test "urlRegexp successes", ->
    assert.eq popNullish("http://foo.com"                                .match urlRegexp),  ["http://foo.com",                      "http", "://", "foo.com"]
    assert.eq popNullish("http://foo.com#hi"                             .match urlRegexp),  ["http://foo.com#hi",                   "http", "://", "foo.com", undefined, undefined, undefined, undefined, undefined, "#", "hi"]
    assert.eq popNullish("http://foo.com/here"                           .match urlRegexp),  ["http://foo.com/here",                 "http", "://", "foo.com", undefined, undefined, "/here"]
    assert.eq popNullish("http://foo.com?this=that"                      .match urlRegexp),  ["http://foo.com?this=that",            "http", "://", "foo.com", undefined, undefined, undefined, "?", "this=that"]
    assert.eq popNullish("http://foo.com?this=that#hi"                   .match urlRegexp),  ["http://foo.com?this=that#hi",         "http", "://", "foo.com", undefined, undefined, undefined, "?", "this=that", "#", "hi"]
    assert.eq popNullish("http://foo.com?"                               .match urlRegexp),  ["http://foo.com?",                     "http", "://", "foo.com", undefined, undefined, undefined, "?"]
    assert.eq popNullish("http://foo.com/?this=that"                     .match urlRegexp),  ["http://foo.com/?this=that",           "http", "://", "foo.com", undefined, undefined, "/",       "?", "this=that"]
    assert.eq popNullish("http://foo.com/here?this=that"                 .match urlRegexp),  ["http://foo.com/here?this=that",       "http", "://", "foo.com", undefined, undefined, "/here",   "?", "this=that"]
    assert.eq popNullish("http://foo.com:9000/here?this=that"            .match urlRegexp),  ["http://foo.com:9000/here?this=that",  "http", "://", "foo.com", ":",       "9000",    "/here",   "?", "this=that"]

  test "urlRegexp matches return all matched characters", ->
    tester = (url) ->
      assert.eq url, compactFlatten((url.match urlRegexp).slice(1)).join ''

    tester "http://foo.com"
    tester "http://foo.com#hi"
    tester "http://foo.com/here"
    tester "http://foo.com?this=that"
    tester "http://foo.com?this=that#hi"
    tester "http://foo.com?"
    tester "http://foo.com/?this=that"
    tester "http://foo.com/here?this=that"
    tester "http://foo.com:9000/here?this=that"

  test "regressions", ->
    assert.eq "http://localhost:1337/localhost:9200/imikimi_oz_dev".match(urlRegexp), [
      "http://localhost:1337/localhost:9200/imikimi_oz_dev"
      "http"
      "://"
      "localhost"
      ":"
      "1337"
      "/localhost:9200/imikimi_oz_dev"
      undefined
      undefined
      undefined
      undefined
    ]

  test "findUrlRegExp", ->
    assert.eq findUrlRegExp.exec("https://en.wikipedia.org/wiki/Varieties_of_criticism#Constructive_criticism")[0],
      "https://en.wikipedia.org/wiki/Varieties_of_criticism#Constructive_criticism"



  test "findUrlWithOptionalProtocolRegExp", ->
    assert.eq findUrlWithOptionalProtocolRegExp.exec("hi there.com")[0], 'there.com'
    assert.eq findUrlWithOptionalProtocolRegExp.exec("hi there.com/bar")[0], 'there.com/bar'
    assert.eq findUrlWithOptionalProtocolRegExp.exec("hi http://there.com")[0], 'http://there.com'
    assert.eq findUrlWithOptionalProtocolRegExp.exec("hi https://en.wikipedia.org/wiki/Varieties_of_criticism#Constructive_criticism")[0], 'https://en.wikipedia.org/wiki/Varieties_of_criticism#Constructive_criticism'
  test "findAllUrlsWithOptionalProtocolRegExp", ->
    assert.eq findAllUrlsWithOptionalProtocolRegExp.exec("hi https://en.wikipedia.org/wiki/Varieties_of_criticism#Constructive_criticism")[0], 'https://en.wikipedia.org/wiki/Varieties_of_criticism#Constructive_criticism'

