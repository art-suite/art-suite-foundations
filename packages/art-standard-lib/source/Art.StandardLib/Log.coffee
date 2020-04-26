Inspect = require './Inspect/namespace'
{callStack} = require './CallStack'
{isString} = require './TypesExtended'
{peek} = require './ArrayExtensions'
{merge} = require './Core'
{deepResolve, containsPromises} = require './Promise'
{isNode, getEnv} = require './Environment'

{disableLog} = getEnv()

module.exports = class Log
  # autodetect context from
  #   stack (grabed with callStack()). Ignores stack[0]
  #   defaultContext - what to report if context cannot be determined

  @contextString: (stack, defaultContext) =>
    if stack && caller = stack[1]
      if caller.original
        caller.original
      else
        context = if caller.function
          if caller.class
            "#{caller.class}::#{caller.function}()"
          else
            caller.function+"()"
        else if defaultContext
          defaultContext+":"
        else
          ""
        "at " + caller.sourceFileName + "-#{caller.sourceLine}: " + context if caller.sourceFileName
    else
      "at #{defaultContext || "(unknown context)"}"

  @autoSizedIndepect: (toInspect, maxLength = 512, maxDepth = 10) =>
    inspected = null
    depth = maxDepth
    depth-- while (inspected = Inspect.inspectLean toInspect, maxDepth:depth, maxLength:maxLength).match(/\.\.\.$/)
    inspected

  @loggedParamsString: (params) =>
    if typeof params == "string"
      params
    else
      @autoSizedIndepect params

  @hideLogging: => @loggingHidden = true
  @showLogging: => @loggingHidden = false

  @rawLog: (args...)=>
    console.log args... unless @loggingHidden

  @rawErrorLog: (args...)=>
    return if @loggingHidden
    if isNode && "".red
      str = args.join ' '
      console.error str.red
    else
      console.error args...

  @rawWarningLog: (args...)=>
    return if @loggingHidden
    if isNode && "".red
      str = args.join ' '
      console.warn str.yellow
    else
      console.warn args...

  noOptions = {}
  getLogger = ({isError, isWarning}) ->
    if isError then Log.rawErrorLog
    else if isWarning then Log.rawWarningLog
    else Log.rawLog

  promiseLogId = 1

  @logCore: (m, stack, options = noOptions) =>

    if @alternativeLogger
      @alternativeLogger.logCore m, stack, options

    if options.resolvePromises
      @log.resolvePromiseWrapper m, (toLog, label) =>
        @_logNow "#{label}": toLog, stack, options
    else
      @_logNow m, stack, options

  @_logNow: (m, stack, options) =>
    {className} = options
    logger = getLogger options
    if isNode
      logger if isString m
        m
      else
        Inspect.formattedInspect m, merge maxLineLength: process.stdout.columns, options
    else
      logger m #, "\n# StandardLib.log called " + @contextString stack, className

  standardOptions = if isNode
    try
      eval("require") "colors"
    color: true
  else {}
  # always returned the last argument passed in. That way you can:
  #     bar = foo # log foo's value in the middle of an expression, along with other values, without altering the rest of the expression
  #     bar = @log 1, 2, 3, foo
  @log: (args...) =>
    if disableLog
      peek args
    else
      @log.withOptions standardOptions, args...

  @log.full = (args...) =>
    @log.withOptions
      maxArrayLength: 100000
      args...

  # IN: logger: (toLog, label, wasResolvedOrRejected: true/false)
  @log.resolvePromiseWrapper = (m, logger) ->
    if containsPromises m
      toResolve = m
      logId = promiseLogId++
      logger m, "RESOLVING_#{logId}", false

      deepResolve toResolve #, (promiseResult) -> 'promise.then': promiseResult
      .then (resolvedM) =>
        logger resolvedM, "RESOLVED_#{logId}", true
      .catch (rejected) =>
        logger rejected, "REJECTED_#{logId}", true, true

    else
      logger m, false

  @log.withOptions = (options, args...) ->
    m = if args.length == 1
      args[0]
    else
      args
    Log.logCore m, callStack(), options
    peek args

  ###

  IN:
    labelString, value
    OR object with one or more properties (usually just one)
      returns the last value of the objects last key-value pair

  EX:
    log.withLabel foo: myObject
    # out: myObject

    log.withLabel "foo", myObject
    # out: myObject

  ###
  @log.withLabel = (a, b) =>
    if isString a
      obj = {}
      obj[a] = b
      @log obj
      b
    else
      ret = null
      ret = v for k, v of a
      @log obj
      ret

  @log.labeled = @log.withLabel

  @log.error = (args...) => @log.withOptions isError: true, args...
  @log.warn  = (args...) => @log.withOptions isWarning: true, args...

  # same output as log, but returns the last value of the objects key-value pair
  # logL: labeled Log
  @logL: (obj) =>
    console.warn "DEPRICATED: logL. USE log.labeled"
    ret = null
    for k, v of obj
      ret = v
    @log obj
    ret
