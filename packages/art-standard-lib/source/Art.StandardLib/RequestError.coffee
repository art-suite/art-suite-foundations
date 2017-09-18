{defineModule} = require './CommonJs'
{formattedInspect} = require './Inspect'
{mergeInto, isFunction, upperCamelCase, compactFlatten, merge} = require './Core'

###
TODO:
  Rename: ErrorWithProps
  Rename: @info => @props

  Only
###

defineModule module, class RequestError extends Error
  ###
  IN:
    props:
      message:  error-message
      type:     request-type (for REST, the Method/Verb)
      key:      request-key (for REST, the URL)
      status:   string, see: ArtCommunicationStatus for valid strings
      data:     error-response-data, if any
  ###
  constructor: (props) ->
    super
    {sourceLib, message, @requestData, @type, @key, @status, @data, responseData} = @props = merge props
    @responseData = @data ||= responseData
    @name = upperCamelCase "#{sourceLib || ""} RequestError"
    if @props.data
      delete @props.data
      @props.data = @responseData

    responseDataString = @data && formattedInspect {@data}
    @message = compactFlatten([
      message
      (@status || "failure") + ":"
      if responseDataString?.length < 80 && !@requestData
        [@type, @key, responseDataString]
      else
        "\n\n" + formattedInspect merge {@type, @key, @requestData, @responseData}
    ]).join ' '

    @info = @props # Support DEPRICATED API

    if isFunction Error.captureStackTrace
      # Node only
      Error.captureStackTrace @, @constructor
    else
      @stack = (new Error).stack

  toString: ->
    ["#{@name} #{@message}", formattedInspect {@props}, ""].join "\n\n"