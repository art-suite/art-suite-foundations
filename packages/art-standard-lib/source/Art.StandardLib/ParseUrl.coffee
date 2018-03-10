# TODO: DRY w.r.t. StandardLib/RegExpExtensions
{escapeRegExp, findUrlOrigin} = require './RegExpExtensions'

module.exports = class ParseUrl

  parsedGlobalQuery = null

  @sameOrigin: (url, origin = global.document?.location?.origin) ->
    [origin] = origin.match findUrlOrigin
    ///
    ^
    (
      (#{escapeRegExp origin})
      |
      (?![a-z]+\:)
    )
    ///i.test url

  @parseQuery: (qs) ->
    return parsedGlobalQuery if (isCurrentLocation = !qs?) && parsedGlobalQuery
    qs ||= global.location?.search || ""
    obj = {}
    for pair in qs.replace(/^\?/, '').split('&')
      if (i = pair.indexOf '=') >= 0
        key = pair.slice 0, i
        val = pair.slice i+1
        obj[key] = decodeURIComponent val if key.length > 0
      else
        obj[pair] = true
    if isCurrentLocation
      parsedGlobalQuery = obj
    obj

  @generateQuery: generateQuery= (o) ->
    parts = for k, v of o
      "#{encodeURIComponent k}=#{encodeURIComponent v}"
    parts.join "&"

  @urlJoin: (uri, path) -> "#{uri.replace /\/$/, ''}/#{path.replace /^\//, ''}"

  @appendQuery: (uri, o) ->
    str = generateQuery o
    "#{uri}#{if uri.match /\?/ then "&" else "?"}#{str}"

  # returns undefined if not a legal url
  @parseUrl: (url) =>
    # http://www.w3.org/Addressing/URL/5_BNF.html
    m = url.match ///
      (([A-Za-z]+):(//)?)?      # protocol
      (([\-;&=\+\$,\w]+)(:([\-;:&=\+\$,\w]+))?@)?  # username:password@
      ([A-Za-z0-9\.\-]+)        # domain
      (:([0-9]+))?              # port
      (/[\+~%/\.\w\-]*)?        # pathName
      (\?([\-\+=&;%@\.\w,]*))?  # ?query
      (\#([\.\!\/\\\w]*))?      # #anchor
    ///
    return undefined unless m
    [
      __, __, protocol
      __, __, username
      __, password
      host
      __, port
      pathName
      __, query
      __, anchor
    ] = m

    if pathName
      a = pathName.split "/"
      fileName = a[a.length-1]
      path = (a.slice 0, a.length-1).join "/"

    host = host.toLowerCase()
    hostWithPort = host
    hostWithPort += ":#{port}" if port

    protocol: protocol
    username: username
    password: password
    hostWithPort: hostWithPort
    host: host
    port: port
    pathName: pathName
    path: path
    fileName: fileName
    query: query && @parseQuery query
    anchor: anchor
