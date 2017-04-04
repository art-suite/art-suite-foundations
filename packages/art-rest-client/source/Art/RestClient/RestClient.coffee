# uses XMLHttpRequest2
#  http://www.w3.org/TR/XMLHttpRequest2/
#  http://www.html5rocks.com/en/tutorials/file/xhr2/
StandardLib = require 'art-standard-lib'
{present, Promise, merge, isNumber, timeout, log, objectKeyCount, appendQuery, object, ErrorWithInfo} = StandardLib
{success, serverFailure, failure, failureTypes, decodeHttpStatus} = require 'art-communication-status'

# So this works in NODE:
# TODO: we could maybe solve this better:
#   require './xhr'
# with:
#   xhr.js:     global.XMLHttpRequest ||= require 'xhr2'
#   xhr.coffee: # empty
# realRequire = eval 'require'
# global.XMLHttpRequest ||= realRequire 'xhr2'
require './.xhr2'

module.exports = class RestClient
  @legalVerbs:
    get: "GET"
    GET: "GET"
    put: "PUT"
    PUT: "PUT"
    post: "POST"
    POST: "POST"
    delete: "DELETE"
    DELETE: "DELETE"
    head: "HEAD"
    HEAD: "HEAD"

  ###
  get/put/post/delete

  IN:
    url: valid url string

    data: (only on PUT/POST requests)
      data to send
      NOTE: must be null if using formData

    options:

      formData: plain object of key-value pairs to submit as form-data
        You can even use this for "get" requests.
        NOTE: "data" must be null if using "formData"

      headers: plain object of additional HTTP headers to set

      onProgress: (restRequestStatus) -> null
        called each time progress is made
        NOTE: restRequestStatus.progress contains a 0-to-1 number that indicates how much progress has been made.
          progress indicates DOWNLOAD progress for GET requests and UPLOAD progress for all others.

      responseType: "arraybuffer", "blob", "document", "json", or "text"
        default: "text"
        NOTE: "json" is handled manually since IE11 and iOS7 don't support the "json" option.
        https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType

  OUT: Promise:
    resolved: (responseData) ->
    rejected: (restRequestStatus) ->

  responseData:
    a String, or the type specified by the responseType option

  restRequestStatus:
    event:    # the HTML event object
    request:  # the XMLHttpRequest
    options:  # the restRequest options: verb, url, data, headers, onProgress, responseType, formData
    httpStatus:   # the HTML status code, if the request completed
    response: # responseData
    status:       a valid CommunicationStatus
    error:    # Error object or string-explaination of why the request was rejected
    progress:
      a value between 0 and 1
      If the progress is indeterminant, this is 0
      If this isn't an onProgress event, this is the amount of progress
      that was made up to the point of the event.
  ###

  @get:     (url, options)           -> RestClient.restRequest merge options, verb: "GET",    url: url
  @put:     (url, data, options)     -> RestClient.restRequest merge options, verb: "PUT",    url: url, data: data
  @post:    (url, data, options)     -> RestClient.restRequest merge options, verb: "POST",   url: url, data: data
  @delete:  (url, options)           -> RestClient.restRequest merge options, verb: "DELETE", url: url

  # OUT: Promise -> responseData is ArrayBuffer
  @getArrayBuffer: (url, options) -> @get url, merge options, responseType: "arraybuffer"

  ###
  get/put/post/deleteJson

  same as get/put/post/delete above

  except:
    sent data should be plain objects which are JSON.stringified
    response data is automatically JSON.parsed

    additional options are set:
      responseType: "json"
      headers:      Accept: 'application/json'
  ###
  @getJson:     (url, options)       -> RestClient.restJsonRequest merge options, verb: "get",     url: url
  @deleteJson:  (url, options)       -> RestClient.restJsonRequest merge options, verb: "delete",  url: url
  @putJson:     (url, data, options) -> RestClient.restJsonRequest merge options, verb: "put",     url: url, data: data
  @postJson:    (url, data, options) -> RestClient.restJsonRequest merge options, verb: "post",    url: url, data: data

  ###
  IN:
    options:
      verb: "GET", "PUT", "POST"
      method: alias for verb

      data: data to restRequest - passed to xmlHttpRequest.restRequest

      plus all the options for get/put/post listed above
      showProgressAfter: milliseconds (default: 100)
        only show progress after # milliseconds

      onProgress: (requestStatus) ->
        see "All callbacks" below for details about inputs.
        Note that onProgress is triggered a little differently than
        the normal XMLHttpRequest progress events:
          - it will only be called after showProgressAfter ms
          - it is guaranteed to be called after showProgressAfter ms if the request hasn't completed
          - if the request completes before showProgressAfter ms, it will never be called

  OUT: see get/put/post above

  All callbacks look like this: (requestStatus) ->
    requestStatus:
      request:  XMLHttpRequest
      progress: number # between 0 and 1
      options:  options # passed-in options object
      event:    the most recent event
      response: # the processed response data, if ready
      error:    # if any
      httpStatus:   number # HTTP status code, if the request is complete

  EFFECT:

  ###
  @restRequest: (options) ->
    {verb, method, url, data, headers, onProgress, responseType, formData, showProgressAfter} = options
    showProgressAfter = 100 unless isNumber showProgressAfter

    verb ||= method

    throw new Error "invalid verb: #{specifiedVerb}" unless verb = RestClient.legalVerbs[specifiedVerb = verb]

    if formData
      throw new Error "can't specify both 'data' and 'formData'" if data
      data = new FormData
      data.append k, v for k, v of formData
    else
      data = data?.toArrayBuffer?() || data

    new Promise (resolve, reject) ->
      if verb == "GET" && data
        log.error RestClient_restRequest:
          info: "can't GET with data"
          options: options
        throw new Error "With their ultimate wisdom, the HTTP gods decree: NO DATA WITH GET"

      restRequestStatus =
        request: request = new XMLHttpRequest
        progress: 0
        options: options

      getErrorResponse = ->
        try
          response: getResponse()
        catch error
          status:       serverFailure
          rawResponse:  request.response
          message:      "Error parsing server's response: #{error}"

      getResponse = ->
        {response} = request
        if response && responseType == "json"
          JSON.parse response
        else
          response

      request.open verb, url, true

      # NOTE: IE11 and IOS7 don't support responseType "json"
      # https://developer.mozilla.org/en-US/docs/Web/API/FormData
      # http://caniuse.com/#search=FormData
      # TODO: we should detect if it is supported and use it if it is;
      #   The supported platforms probably decode the JSON off-thread.
      request.responseType = responseType if present(responseType) && responseType != "json"

      request.setRequestHeader k, v for k, v of headers if headers

      requestResolved = false

      request.addEventListener "error", (event) ->
        requestResolved = true
        reject new ErrorWithInfo "XMLHttpRequest error event triggered", merge restRequestStatus, {event}, decodeHttpStatus()

      request.addEventListener "load", (event) ->
        requestResolved = true

        decodedHttpStatus = decodeHttpStatus httpStatus = request.status

        unless (decodedHttpStatus.status == success) && (try resolve getResponse(); true)
          reject new ErrorWithInfo(
            if decodedHttpStatus.status == success
              "error processing successful response"
            else
              "request status: #{decodedHttpStatus.status} (#{request.status})"
            merge restRequestStatus, decodedHttpStatus, {event}, getErrorResponse()
          )

      if onProgress
        initialProgressCalled = showProgressAfter <= 0
        lastProgressEvent = null
        timeout showProgressAfter, ->
          initialProgressCalled = true
          progressCallbackInternal lastProgressEvent || {}

        progressCallbackInternal = (event) ->
          {total, loaded} = lastProgressEvent = event
          if initialProgressCalled && !requestResolved
            onProgress? restRequestStatus = merge restRequestStatus,
              event: event
              progress: if total > 0 then loaded / total else 0

        if verb == "GET"
          request.addEventListener "progress", progressCallbackInternal
        else
          request.upload.addEventListener "progress", progressCallbackInternal

      request.send data

  @restJsonRequest: (options) ->
    {verb, method, data, headers} = options
    verb = RestClient.legalVerbs[verb || method]
    data = null if data && objectKeyCount(data) == 0

    if verb == "GET" && options.data
      options = merge options,
        url: appendQuery options.url, object data, (v) -> JSON.stringify v

      data = null
    else
      data &&= JSON.stringify data

    @restRequest merge options,
      responseType: "json"
      headers: merge
        Accept:         'application/json'
        headers
      data:             data

