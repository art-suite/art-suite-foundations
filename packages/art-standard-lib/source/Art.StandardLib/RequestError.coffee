{defineModule} = require './CommonJs'
{formattedInspect} = require './Inspect'
{mergeInto, isFunction, upperCamelCase} = require './Core'

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
    {sourceLib, @type, @key, @status, @data} = @props = props
    @name = "#{sourceLib || ""}RequestError"

    @message = "#{message || "(no message)"} #{formattedInspect {@type, @key, @status, @data}}"

    @info = @props # Support DEPRICATED API

    if isFunction Error.captureStackTrace
      # Node only
      Error.captureStackTrace @, @constructor
    else
      @stack = (new Error).stack

  toString: ->
    ["#{@name}: #{@message}", formattedInspect {@props}, ""].join "\n\n"