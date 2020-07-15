{capitalize} =  require './Core'
{isFunction, isString, isPlainObject} = require './TypesExtended'

module.exports = class MinimalBaseObject

  @propInternalName: propInternalName = (prop) -> "_#{prop}"

  ###
  IN: arguments is a list of strings or objects
    strings: are just the names of the properties
    objects: map from prop names to getter/setter functions
  ###
  @getter: -> defProperties @prototype, arguments, true, false
  @setter: -> defProperties @prototype, arguments, false, true

  @addGetter:       (prop, getter) -> @_addGetter @prototype, prop, getter
  @addSetter:       (prop, setter) -> @_addSetter @prototype, prop, setter
  @addClassGetter:  (prop, getter) -> @_addGetter @, prop, getter
  @addClassSetter:  (prop, setter) -> @_addSetter @, prop, setter

  ###
  IN: arguments is a list of strings or objects
    strings: are just the names of the properties
    objects: map from prop names to initializers
  ###
  @property: -> defProperties @prototype, arguments, true, true

  # NOTE: parts of classGetters and classSetters are NOT inherited with CoffeeScript-style inheritance
  #   NOT INHERITED: obj.prop & obj.prop=
  #   INHERITED:     setProp and getProp
  @classGetter: -> defProperties @, arguments, true, false
  @classSetter: -> defProperties @, arguments, false, true
  @classProperty: -> defProperties @, arguments, true, true

  @getPropGetterName: propGetterName = (prop) -> "get" + capitalize prop
  @getPropSetterName: propSetterName = (prop) -> "set" + capitalize prop

  # DEPRICATED
  @_propGetterName: (v) -> console.warn "DEPRICATED - use getPropGetterName"; propGetterName v
  @_propSetterName: (v) -> console.warn "DEPRICATED - use getPropSetterName"; propSetterName v

  #####################################
  # PRIVATE
  #####################################

  # defines "o.getFoo() as well as "o.foo" since getFoo is 100x faster on Safari 7 (OSX & iOS)
  # use o.getFoo() wherever speed is a concern
  @_addGetter: addGetter = (obj, prop, getter) ->
    obj[propGetterName prop] = getter
    getter = (-> getter) unless isFunction getter
    Object.defineProperty obj, prop, get: getter, configurable: yes
    prop

  # we define "o.setFoo(v) as well as "o.foo = v" since setFoo is 100x faster on Safari 7 (OSX & iOS)
  # use o.setFoo(v) wherever speed is a concern
  @_addSetter: addSetter = (obj, prop, setter) ->
    obj[propSetterName prop] = setter
    Object.defineProperty obj, prop, set: setter, configurable: yes
    prop

  @_addGetters: addGetters = (obj, map) ->
    addGetter obj, prop, getter for prop, getter of map
    map

  @_addSetters: addSetters = (obj, map) ->
    addSetter obj, prop, setter for prop, setter of map
    map

  @_addProperties: addProperties = (obj, map) ->
    defProperty obj, prop, true, true, initializer for prop, initializer of map
    map

  # If the property is null or undefined:
  #   If initialier is not a function, the property is set to intializer before its value is returned
  #   If initialier is a function, it is invoke to initialize the property.
  @_defProperty: defProperty = (obj, prop, defineGetter, defineSetter, initializer) ->
    propName = propInternalName prop

    if defineGetter
      addGetter obj, prop, obj[propGetterName prop] = if isFunction initializer
          -> if @[propName]? then @[propName] else @[propName] = initializer()
        else if initializer?
          -> if @[propName]? then @[propName] else @[propName] = initializer
        else
          -> @[propName]

    if defineSetter
      addSetter obj, prop, (v) -> @[propName] = v

  @_defProperties: defProperties = (obj, props, defineGetter, defineSetter) ->
    for prop in props
      if isPlainObject propMap = prop
        if defineGetter && defineSetter then addProperties obj, propMap
        else if defineGetter            then addGetters obj, propMap
        else                                 addSetters obj, propMap

      else if isString prop
        for propFromString in propListStringToArray prop
          defProperty obj, propFromString, defineGetter, defineSetter, null

      else
        throw new Error "invalid value. Expected string or plain-object:", prop

  @_propListStringToArray: propListStringToArray = (propList) ->
    propList.match /[_a-z][_a-z0-9]*/gi
