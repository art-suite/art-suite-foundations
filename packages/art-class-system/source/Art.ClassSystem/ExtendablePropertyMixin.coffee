{
  defineModule, log, object, upperCamelCase, lowerCamelCase, each
  isPlainObject
  isPlainArray
  isFunction
  clone
  isString
  mergeInto
  concatInto
  formattedInspect
} = require 'art-standard-lib'

defineModule module, -> (superClass) -> class ExtendablePropertyMixin extends superClass

  ###
  IN
    object: any object
    property: string, property name
    init:
      (object) -> returning initial value for object
      OR
        initial value is computed by:
        clone object[property] || init

  EFFECT:
    if object.hasOwnProperty property, return its current value
    otherwise, initialize and return it with init()
  ###
  @getOwnProperty: getOwnProperty = (object, property, init) ->
    if object.hasOwnProperty property
      object[property]
    else
      object[property] = if isFunction init
        init object
      else
        clone object[property] || init

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
  @objectPropertyExtender: objectPropertyExtender = (mapOrKey, value) ->
    if isString mapOrKey
      @[mapOrKey] = value
    else if isPlainObject mapOrKey
      mergeInto @, mapOrKey
    else
      log mapOrKey: mapOrKey, type: mapOrKey?.constructor
      throw new Error "first value argument must be a plain object or string: #{formattedInspect {key:mapOrKey, value}}"
    @

  ###
  arrayPropertyExtender

  IN: @ is set to the property-value to extend

  API 1:
    IN: array
    EFFECT: concatInto propValue, array

  API 2:
    IN: value
    EFFECT: propValue.push value

  NOTE: if you want to concat an array-as-a-value to the end of propValue, do this:
    arrayPropertyExtender.call propValue, [arrayAsValue]

  OUT: ignore
  ###
  @arrayPropertyExtender: arrayPropertyExtender = (arrayOrValue) ->
    if isPlainArray arrayOrValue
      concatInto @, arrayOrValue
    else
      @push arrayOrValue
    @

  ###
  Extendable Properties

  EXAMPLE:
    class Foo extends BaseClass
      @extendableProperty foo: {}

  Extendable properties work like inheritance:

    When any subclass or instance extends an extendable property, they
    inherit a clone of the property from up the inheritance tree, and then
    add their own extensions without effecting the parent copy.

    With Object property types, this can just be a parallel prototype chain.
    (It isn't currently: if you modify a parent after extending it to a child,
    the child won't get updates.)

    BUT, you can also have array or other types of extend-properties, which
    JavaScript doesn't have any built-in mechanisms for inheriting.

  BASIC API:
  @extendableProperty: (map, propertyExtender = defaultPropertyExtender) -> ...

  IN: map
  IN: propertyExtender = (args...) ->
    IN: 1 or more args to add
    OUT: new property value
    THIS:
      @ is set to a unique clone for the current Class or Instance.
        cloned from the closest parent value OR the default value
    EFFECT:
      Can be pure functional and just return the new, extended data.
      OR
      Can modify @ directly, since it is an object/array/atomic value unique to the current class/instance.
        If modifying @ directly, just return @.
      Regardless, the returned value becomes the new extendable prop's value.

  EFFECT: for each {foo: defaultValue} in map, extendableProperty:
    defines standard getters:
      @class.getFoo()
      @prototype.getFoo()
      @prototype.foo # getter
      WARNING:
        !!! Don't modify the object returned by a getter !!!

        Getters only return the current, most-extended property value. It may not be extended to the
        current subclass or instance! Instead, call @extendFoo() if you wish to manually modify
        the extended property.

    defines extender functions:
      @class.foo value            # extends the property on the PROTOTYPE object
      @class.extendFoo value      # extends the property on the PROTOTYPE object
      @prototype.extendFoo value  # extends the property on the INSTANCE object (which inherits from the prototype)

      EFFECT: extends the property if not already extended
      OUT: extendedPropValue

      API 1: IN: 0 args
        NO ADDITIONAL EFFECT - just returns the extended property
      API 2: IN: 1 or more args
        In addition to extending and returning the extended property:
        calls: propExtender extendedPropValue, args...

    NOTE: gthe prototype getters call the class getter for extension purposes.
      The result is each instance won't get its own version of the property.
      E.G. Interitance is done at the Class level, not the Instance level.

  ###
  @extendableProperty: (map, customPropertyExtender) ->
    each map, (defaultValue, name) =>
      name          = lowerCamelCase name
      ucProp        = upperCamelCase name
      internalName  = @propInternalName name
      getterName    = "get#{ucProp}"
      extenderName  = "extend#{ucProp}"

      propertyExtender = customPropertyExtender ||
        if      isPlainObject defaultValue then objectPropertyExtender
        else if isPlainArray  defaultValue then arrayPropertyExtender
        else throw new Error "Unsupported property type for extendableProperty: #{inspect defaultValue}. Please specify a custom propertyExtender function."

      @[getterName] = -> @prototype[internalName] || defaultValue
      @addGetter name, -> @[internalName] || defaultValue

      # IN: value (must match defaultValue's type - an object or an array)
      # EFFECT: property has been extended for the class-object this was called on (not affecting any parent class)
      # OUT: the extendable property's current value
      @[name] = @[extenderName] = (value) ->
        extendablePropValue = getOwnProperty @prototype, internalName, defaultValue
        @prototype[internalName] = propertyExtender.apply extendablePropValue, arguments if arguments.length > 0
        extendablePropValue

      # IN: value (must match defaultValue's type - an object or an array)
      # EFFECT: property has been extended for the current instance-object this was called on (not affecting it's class or any parent-class)
      # OUT: the extendable property's current value
      @prototype[extenderName] = (value) ->
        extendablePropValue = getOwnProperty @, internalName, defaultValue
        @[internalName] = propertyExtender.apply extendablePropValue, arguments if arguments.length > 0
        extendablePropValue
