{
  defineModule, log, object, upperCamelCase, lowerCamelCase, each
  isPlainObject
} = require 'art-standard-lib'

# TODO: instead of the ad-hoc solution here, use ArtFoundation.Validator!
# but, validator needs:
#   a) to be its own NPM
#   b) to support single-field create-tests and update-tests
# Then we can just create one Validator from the declarable "map"
# That's all pretty easy, but I need to stay focused today.

# superClass must extend MinimalBaseObject at some point
defineModule module, -> (superClass) -> class DeclarableMixin extends superClass

  ###
    define a declarable field

    IN:
      map:
        key: name: string
        value: true-ish OR
          options:
            preprocess: (v) -> newV
            validate:   (v) -> truthish
          NOTE: validate is evaluated BEFORE preprocess

    EFFECT:
      creates:

        # class declarator function, with preprocessing
        @name: (...)->

        # class getter-function
        @getName: ->

        # instance-getter
        @getter name: ->
  ###

  @declarable: (map) ->
    each map, (v, k) =>
      if isPlainObject v
        {preprocess, validate} = v

      preprocess ||= (v) -> v
      validate ||= -> true

      name = lowerCamelCase k
      ucName = upperCamelCase k
      valuePropertyName = "_#{name}"
      getterName = "get#{ucName}"

      ##############################
      # class-api API
      ##############################

      # declare
      @[name] = (value) ->
        unless validate value
          throw new Error "invalid value: #{formattedInspect {value, name}}"

        value = preprocess value

        @[valuePropertyName] = value

      # get
      @[getterName] = -> @[valuePropertyName]

      ##############################
      # instance-api
      ##############################
      @addGetter name, -> @class[valuePropertyName]
