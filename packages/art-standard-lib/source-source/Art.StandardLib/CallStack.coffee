{isString} = require './TypesExtended'
{parseUrl} = require './ParseUrl'
{inspect} = require './Inspect'

# TODO: switch to using https://github.com/stacktracejs/stacktrace.js
module.exports = class CallStack
  @errorToString: (error) ->
    error?.error || error?.message || (isString(error) && error) || Neptune.Art.StandardLib.formattedInspect error
  @CallStackLine: class CallStackLine
    @getter: (map) ->
      Object.defineProperty @::, prop, {get: getter, configurable: yes} for prop, getter of map

    @setter: (map) ->
      Object.defineProperty @::, prop, {set: setter, configurable: yes} for prop, setter of map

    constructor: (line) ->
      @original = line
      @function = null
      @source = null
      @class = null
      @classPath = null
      @sourceFileName = null
      @sourcePath = null
      @sourceHostWithPort = null
      @sourceLine = 0
      @sourceColumn = 0

      if @parseLineWithFunction line
      else @parseLineWithoutFunction line
      @subParseFunction()
      @subParseSource()

    toString: -> @original

    @getter
      fileWithLocation: -> @_fileWithLocation ||=
        if @sourceFileName
          "#{@sourcePath}/#{@sourceFileName}:#{@sourceLine}:#{@sourceColumn}"
        else
          @original

    #################
    # PRIVATE
    #################
    # example: "at myFunc (http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js:10:30)"
    parseLineWithFunction: (line) ->
      if r = line.match ///
          \s*at\s
          ((new\s)?[a-zA-Z0-9_.<>]+)
          \s\(
            ([^)]*)
            :([0-9]+)
            :([0-9]+)
          \)
        ///
        @function = r[1]
        @source = r[3]
        @sourceLine = r[4] | 0
        @sourceColumn = r[5] | 0


    parseLineWithoutFunction: (line) ->
      if r = line.match  ///
          \s*at\s
          ([^)]*)
          :([0-9]+)
          :([0-9]+)
        ///
        @source = r[1]
        @sourceLine = r[2] | 0
        @sourceColumn = r[3] | 0

    subParseSource: ->
      if @source
        url = parseUrl @source
        @sourceFileName = url.fileName
        @sourcePath = url.path
        @sourceHostWithPort = url.hostWithPort

    subParseFunction: ->
      if @function
        f = @function.split "."
        @function = f[f.length-1]
        @function = undefined if @function == "<anonymous>"
        @class = f[f.length-2]
        @classPath = f.slice 0, f.length-2

  @rawCallStack: if (new Error).stack
    (ignoreTop = 0)->
      (new Error).stack.split(/\n  */).slice ignoreTop + 2
  else
    # MSIE11 doesn't support getting the stack until the error is thrown
    (ignoreTop = 0)->
      try
        throw new Error
      catch e
        e.stack.split(/\n  */).slice ignoreTop + 2

  @callStack: (ignoreTop = 0)->
    new CallStackLine line for line in CallStack.rawCallStack ignoreTop + 1
