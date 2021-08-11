{defineModule} = require 'art-standard-lib'

defineModule module, class HumanStringFormatting
  @humanByteSize: (bytes) ->
    if bytes < 2048
      "#{bytes}bytes"
    else
      bytes /= 1024
      if bytes < 2048
        "#{bytes | 0}KB"
      else
        bytes /= 1024
        "#{bytes | 0}MB"
