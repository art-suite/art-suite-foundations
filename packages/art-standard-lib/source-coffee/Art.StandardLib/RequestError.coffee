{defineModule} = require './CommonJs'
{formattedInspect} = require './Inspect'
{mergeInto, isFunction, upperCamelCase, compactFlatten, merge} = require './Core'
{objectWithout} = require './ObjectExtensions'

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
    @name = "#{sourceLib || ""} RequestError #{@status}"
    if @props.data
      delete @props.data
      @props.data = @responseData

    responseDataString = @data && formattedInspect {@data}
    @message = message || compactFlatten([
      (@status || "failure") + ":"
      if responseDataString?.length < 80 && !@requestData
        [@type, @key, responseDataString]
      else
        "\n\n" + formattedInspect merge {@type, @key, @requestData, @responseData}
    ]).join ' '

    if @props.stack
      # custom stack override
      {@stack} = @props
      @props = objectWithout @props, "stack"
    else if isFunction Error.captureStackTrace
      # Node only
      Error.captureStackTrace @, @constructor
    else
      @stack = (new Error).stack

    # Support DEPRICATED API
    @info = @props

  toString: ->
    ["#{@name}: #{@message}", formattedInspect {@props}].join "\n\n"

