module.exports = class Function
  @fastBind: (fn, _this) ->
    switch fn.length
      when 0  then (                            ) -> fn.call _this
      when 1  then (a                           ) -> fn.call _this, a
      when 2  then (a, b                        ) -> fn.call _this, a, b
      when 3  then (a, b, c                     ) -> fn.call _this, a, b, c
      when 4  then (a, b, c, d                  ) -> fn.call _this, a, b, c, d
      when 5  then (a, b, c, d, e               ) -> fn.call _this, a, b, c, d, e
      when 6  then (a, b, c, d, e, f            ) -> fn.call _this, a, b, c, d, e, f
      when 7  then (a, b, c, d, e, f, g         ) -> fn.call _this, a, b, c, d, e, f, g
      when 8  then (a, b, c, d, e, f, g, h      ) -> fn.call _this, a, b, c, d, e, f, g, h
      when 9  then (a, b, c, d, e, f, g, h, i   ) -> fn.call _this, a, b, c, d, e, f, g, h, i
      when 10 then (a, b, c, d, e, f, g, h, i, j) -> fn.call _this, a, b, c, d, e, f, g, h, i, j
      else                                        -> fn.apply _this, arguments

###
TODO:

The above options are not hot-reload compatible. However, this alternative would be:

  name = fn.name
  -> _this[name].apply _this, arguments

I need to perf-test this. Or, I need to finally start using a global "debug" mode that could use this
in debug mode and the faster(?), non hot-reload options in production mode.
###
