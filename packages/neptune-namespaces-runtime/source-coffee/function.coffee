unless (->).name?
  Object.defineProperty global.Function.prototype, 'name',
    get: ->
      name = if matches = @toString().match /^\s*function\s*([^\s(]+)/
        matches[1]
      else
        ""
      Object.defineProperty @, 'name', value: name
      name

global.Function.prototype.getName = ->
  if @_name && @hasOwnProperty "_name"
    @_name
  else
    @name || "anonymousFunction"
global.Function.prototype.hasName = -> !!((@_name && @hasOwnProperty "_name") || @name)
