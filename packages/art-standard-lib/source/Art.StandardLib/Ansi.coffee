{isString} = require './Core/Types'
module.exports =
  ansiRegex: ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g

  stripAnsi: (str) ->
    if ansiRegex.test str
      str.replace ansiRegex, ''
    else
      str

  ansiSafeStringLength: (str)->
    throw new Error "not string" unless isString str
    if ansiRegex.test str
      str = str.replace ansiRegex, ''
    str.length
