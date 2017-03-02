module.exports = class Ruby
  # would this be faster?: (a) -> a || a != 0

  @rubyTrue:  rubyTrue = (a) -> a!=undefined && a!=null && a!=false
  @rubyFalse: (a) -> a==undefined || a==null || a==false

  @rubyOr: (a, b) ->
    if arguments.length == 2
      if rubyTrue a then a else b
    else
      for a in arguments
        break if rubyTrue a
      a
  @rubyAnd: (a, b) ->
    if arguments.length == 2
      if rubyTrue a then b else a
    else
      for a in arguments
        break unless rubyTrue a
      a

  @reopenInstanceProps: (klass, instanceProps) ->
    klass::[k] = v for own k, v of instanceProps

  @reopenClassProps: (klass, classProps) ->
    klass[k] = v for own k, v of classProps
