{
  defineModule, log, object, upperCamelCase, lowerCamelCase, each
  isPlainObject
} = require 'art-standard-lib'

# DEPRICATED: just use @declarable on BaseClass now (provided by the ExtendableProperyMixin)
#
# TODO: instead of the ad-hoc solution here, use ArtFoundation.Validator!
# but, validator needs:
#   a) to be its own NPM
#   b) to support single-field create-tests and update-tests
# Then we can just create one Validator from the declarable "map"
# That's all pretty easy, but I need to stay focused today.

# superClass must extend MinimalBaseObject at some point
# to use 'extendable', superClass must also extend ExtendablePropertyMixin
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
            extendable: defaultValue
              If present, this is an extendable property.
              See: @extendableProperty
              passed to: @extendableProperty "#{key}": options.extendable
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
    each map, (options, name) =>
      if isPlainObject options
        {preprocess, validate, extendable, getter} = options

      preprocess ||= (v) -> v
      validate ||= -> true

      name          = lowerCamelCase name
      ucProp        = upperCamelCase name
      internalName  = @propInternalName name
      getterName    = "get#{ucProp}"

      if extendable
        @extendableProperty "#{name}": extendable

      else
        ##############################
        # class-api API
        ##############################

        # declare (or extend, if extendable)
        @[name] = (value) ->
          unless validate value
            throw new Error "invalid value: #{formattedInspect {value, name}}"

          @[internalName] = preprocess value

        # get
        @[getterName] = getter || -> @[internalName]

        ##############################
        # instance-api
        ##############################
        @addGetter name, -> @class[internalName]
