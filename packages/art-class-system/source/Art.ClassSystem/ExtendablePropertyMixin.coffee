{
  defineModule, log, object, upperCamelCase, lowerCamelCase, each
  isPlainObject
  isPlainArray
  isFunction
  isNumber
  isBoolean
  cloneStructure
  isString
  mergeInto
  concatInto
  formattedInspect
  merge
} = require 'art-standard-lib'

###
Todo:
  validatedDeclarable / validatedExtendableProperty
    Which use Art.Validation

TODO:
  When we switch to ES6, we should make the
  class API look identical to the current instance API.

  That means declarable API looks like this:
    @extendableProperty foo: {}

    # extend:
    @foo: hi: 123

  The differnce is we add a ":".

  The benefit is it's a normal getter/setter pair:

    @foo = hi: 123

    log @foo

  The one diference is the "setter" is really an
  "extender"


###

defineModule module, -> (superClass) -> class ExtendablePropertyMixin extends superClass

  ###
  IN
    object: any object
    property: string, property name
    init:
      (object) -> returning initial value for object
      OR
        initial value is computed by:
        cloneStructure object[property] || init

  EFFECT:
    if object.hasOwnProperty property, return its current value
    otherwise, initialize and return it with init()
  ###
  @getOwnProperty: getOwnProperty = (object, internalName, init) ->
    if object.hasOwnProperty internalName
      object[internalName]
    else object[internalName] = init object, internalName

  optimizedInitFunction = (internalName, init) ->
    switch
      when isFunction init then init
      when isString(init) || isNumber(init) || isBoolean init
        (object) -> object[internalName] ? init

      else
        (object) -> cloneStructure object[internalName] ? init

  ###
  objectPropertyExtender

  IN: @ is set to the property-value to extend

  API 1:
    IN: map
    EFFECT: mergeInto propValue, map

  API 2:
    IN: key, value
    EFFECT: propValue[key] = valuee

  OUT: ignore
  ###
  @objectPropertyExtender: objectPropertyExtender = (toExtend, mapOrKey, value) ->
    return toExtend if mapOrKey == undefined || mapOrKey == null
    if isString mapOrKey
      toExtend[mapOrKey] = value
    else if isPlainObject mapOrKey
      mergeInto toExtend, mapOrKey
    else
      log {mapOrKey, value, type: mapOrKey?.constructor}
      throw new Error "first value argument must be a plain object or string: #{formattedInspect {key:mapOrKey, value}}"
    toExtend

  ###
  arrayPropertyExtender

  IN: valueToExtend, value
    value:
      array: concatInto propValue, array
      non-array: propValue.push value

  NOTE: if you want to concat an array-as-a-value to the end of propValue, do this:
    arrayPropertyExtender.call propValue, [arrayAsValue]

  OUT: ignore
  ###
  @arrayPropertyExtender: arrayPropertyExtender = (toExtend, arrayOrValue) ->
    if isPlainArray arrayOrValue
      concatInto toExtend, arrayOrValue
    else
      toExtend.push arrayOrValue
    toExtend

  ###
  Extendable Properties

  EXAMPLE:
    class Foo extends BaseClass
      @extendableProperty foo: {}

  Extendable properties work like inheritance:

    When any subclass or instance extends an extendable property, they
    inherit a cloneStructure of the property from up the inheritance tree, and then
    add their own extensions without effecting the parent copy.

    With Object property types, this can just be a parallel prototype chain.
    (It isn't currently: if you modify a parent after extending it to a child,
    the child won't get updates.)

    BUT, you can also have array or other types of extend-properties, which
    JavaScript doesn't have any built-in mechanisms for inheriting.

  BASIC API:
  @extendableProperty: (map, options) -> ...

  IN:
    map: name: defaultValue
    options:
      declarable: true/false
        if true, slightly alters the created functions:
          for: @extendableProperty foo: ...
          generates:
            @foo

      extend:
        DEFAULTS:
          switch defaultValue
          when is Object then objectPropertyExtender
          when is Array  then arrayPropetyExtender
          else                defaultExtender

        (extendable, extendWithValues...) -> newExtendedOwnPropertyValue
          IN:
            extendable: the current, extended value, already cloned, so direct mutation is OK
            extendWithValues: 1 or more values passed into the extend funtion by the client.
              Ex: for an array, this is either a single value or an array
              Ex: for an object, this is either a single object or two args: key, value
          OUT: new property value to set own-property to
          EFFECT:
            Can be pure functional and just return the new, extended data.
            OR
            Can modify extendable directly, since it is an object/array/atomic value unique to the current class/instance.
              If modifying extendable directly, be sure to return extendable.
            Regardless, the returned value becomes the new extendable prop's value.



  EFFECT: for each {foo: defaultValue} in map, extendableProperty:
    WARNING:
      !!! Don't modify the object returned by a getter !!!

      Getters only return the current, most-extended property value. It may not be extended to the
      current subclass or instance! Instead, call @extendFoo() if you wish to manually modify
      the extended property.

    declarable:
      getters:
        @getFoo:
        getFoo:

      extenders:
        @foo:
        foo:

    non-declarable:

      getters:
        @getFoo:
        @getter foo:

      extenders:
        @foo:
        @extendFoo:
        extendFoo:

        IN:
          0-args: nothing happens beyond the standard EFFECT
          1+args: passed to the "extend" function

        EFFECT: creates a extension (cloneStructure) of the property for the currnet class, subclass or instance
        OUT: the current, extendedPropValue

        API 1: IN: 0 args
          NO ADDITIONAL EFFECT - just returns the extended property
        API 2: IN: 1 or more args
          In addition to extending and returning the extended property:
          calls: propExtender extendedPropValue, args...

      NOTE: gthe prototype getters call the class getter for extension purposes.
        The result is each instance won't get its own version of the property.
        E.G. Interitance is done at the Class level, not the Instance level.

  ###
  defaultExtender = (toExtend, v) ->
    throw new Error "not expecting undefined" if v == undefined
    v

  noOptions = {}

  @extendableProperty: (map, options = noOptions) ->
    if isFunction oldExtender = options
      log.error "DEPRICATED customPropertyExtender not supported, use extend: option "
      options = extend: (extendable, args...) ->
        oldExtender.apply extendable, args
    {extend, declarable, noSetter} = options
    each map, (defaultValue, name) =>

      name          = lowerCamelCase name
      ucProp        = upperCamelCase name
      internalName  = @propInternalName name
      getterName    = "get#{ucProp}"
      extenderName  = "extend#{ucProp}"

      propertyExtender = extend ?
        if      isPlainObject defaultValue then objectPropertyExtender
        else if isPlainArray  defaultValue then arrayPropertyExtender
        else
          throw new Error "defaultValue must not be undefined" unless defaultValue != undefined
          defaultExtender

      ###########################
      # Class Methods
      ###########################
      @[getterName] = -> @prototype[internalName] ? defaultValue

      # extend prototype (class)
      # IN: value (must match defaultValue's type - an object or an array)
      # EFFECT: property has been extended for the class-object this was called on (not affecting any parent class)
      # OUT: the extendable property's current value
      @[name] = @[extenderName] = (value) ->
        extendablePropValue = getOwnProperty @prototype, internalName, optimizedInitFunction internalName, defaultValue
        if arguments.length > 0 && value != undefined
          @prototype[internalName] = propertyExtender extendablePropValue, arguments...
        extendablePropValue

      ###########################
      # Instance Methods
      ###########################
      instanceGetter = -> @[internalName] ? defaultValue
      # extend this (instance)
      # IN: value (must match defaultValue's type - an object or an array)
      # EFFECT: property has been extended for the current instance-object this was called on (not affecting it's class or any parent-class)
      # OUT: the extendable property's current value
      instanceExtender = @prototype[extenderName] = (value) ->
        extendablePropValue = getOwnProperty @, internalName, optimizedInitFunction internalName, defaultValue
        if arguments.length > 0 && value != undefined
          @[internalName] = propertyExtender extendablePropValue, arguments...
        extendablePropValue

      if declarable
        @prototype[getterName] = instanceGetter
        @prototype[name] = instanceExtender
      else
        @addSetter name, instanceExtender unless noSetter
        @addGetter name, instanceGetter

  @declarable: (map, options) ->
    @extendableProperty map, merge options, declarable: true