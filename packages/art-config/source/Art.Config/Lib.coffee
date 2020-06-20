{
  defineModule
  log
  Promise
  inspect
  formattedInspect
  merge
  deepMerge
  mergeInto
  parseQuery
  pushIfNotPresent
  isPlainObject
  isString
  upperCamelCase
  expandPathedProperties
  clone
  compactFlatten
  getEnv
} = require 'art-standard-lib'

jsonParsableRegexp = ///
  ^
  (
    # array
    \[ .* \] |

    # object
    \{ .* \} |

    # string
    \" .* \" |

    (
      # number
      (-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)
      |

      # constants
      true | false | null
    )
  )
  $
  ///

defineModule module, class Lib

  # if value is a string and it looks like JSON, decode it as JSON
  @smartJsonDecode: smartJsonDecode = (value) ->
    if isString(value) && jsonParsableRegexp.test value
      JSON.parse value
    else
      value ? null

  # arguments are there for testing purposes
  @getExternalEnvironment: (externalEnvironment = getEnv())->
    {artConfig, artConfigName} = externalEnvironment

    artConfig = if isPlainObject artConfig
      artConfig
    else if isString artConfig
      try
        JSON.parse artConfig
      catch e
        log.error """

          Invalid 'artConfig' from externalEnvironment. Must be valid JSON.

          #{formattedInspect externalEnvironment: externalEnvironment}

          artConfig: #{formattedInspect artConfig}

          error: #{e}

          """
        null
    else {}

    for k, v of externalEnvironment when m = k.match /^artConfig([\._])(.+)$/
      if m[1] == "_"
        artConfig[m[2].replace /_/g, '.'] = smartJsonDecode v
      else
        artConfig[m[2]] = smartJsonDecode v

    {artConfig, artConfigName}

  ###
  normalized:
    map standard aliases (dev and prod)
    upperCamelCase
  ###
  @normalizeArtConfigName: (artConfigName)->
    switch artConfigName
      when "dev" then "Development"
      when "prod" then "Production"
      else artConfigName && upperCamelCase artConfigName
