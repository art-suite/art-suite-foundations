{Foundation} = Neptune.Art
{inspect, log, time, eq, plainObjectsDeepEq, shallowEq, consistentJsonStringify} = Foundation

simpleStructuredData =
  id: "unique/url/string"
  params:
    w: 320
    h: 200

simpleStructuredDataJSON = JSON.stringify simpleStructuredData
simpleStructuredDataCommaDelimited = [simpleStructuredData.id, simpleStructuredData.params.w, simpleStructuredData.params.h].join(",")

suite "String Parsing", ->
  @timeout 100000

  benchmark "consistentJsonStringify simpleStructuredData", ->
    consistentJsonStringify simpleStructuredData

  benchmark "JSON.stringify simpleStructuredData", ->
    JSON.stringify simpleStructuredData

  benchmark "customToKEyStringA simpleStructuredData", ->
    {params, id} = simpleStructuredData
    "#{id},#{params.w},#{params.h}"

  benchmark "customToKEyStringB simpleStructuredData", ->
    [simpleStructuredData.id, simpleStructuredData.params.w, simpleStructuredData.params.h].join ','

  benchmark "customToKEyStringC simpleStructuredData", ->
    str = simpleStructuredData.id
    paramString = null
    for k, v of simpleStructuredData.params
      if paramString then   paramString += "&#{k}=#{v}"
      else                  paramString =  "?#{k}=#{v}"
    str + paramString

  supportedParams = ["w", "h"]
  benchmark "customToKEyStringD simpleStructuredData", ->
    str = simpleStructuredData.id
    {params} = simpleStructuredData
    paramString = null
    for param in supportedParams when params[param]
      if paramString then   paramString += "&#{param}=#{params[param]}"
      else                  paramString =  "?#{param}=#{params[param]}"
    str + paramString

  benchmark "customToKEyStringE simpleStructuredData", ->
    str = simpleStructuredData.id
    {params} = simpleStructuredData
    paramString = null
    if params.w
      if paramString then   paramString += "&w=" + params.w
      else                  paramString =  "?w=" + params.w
    if params.h
      if paramString then   paramString += "&h=" + params.h
      else                  paramString =  "?h=" + params.h
    str + paramString

  benchmark "JSON.parse simpleStructuredDataJSON", ->
    {id, params} = JSON.parse simpleStructuredDataJSON
    {w, h} = params

  benchmark "simpleStructuredDataCommaDelimited.split ','", ->
    [id, w, h] = simpleStructuredDataCommaDelimited.split ','
    w = w | 0
    h = h | 0

  benchmark "simpleStructuredDataCommaDelimited.match", ->
    [_, id, w, h] = simpleStructuredDataCommaDelimited.match /([^,]+),([^,]+),([^,]+)/
    w = w | 0
    h = h | 0
