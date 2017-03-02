
###
This current iteration of clone relies on some singleton variables shared across all invocations of clone.
This is fine as long as javascript stays single-threaded.
It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

FUTURE
A potentially better solution would be to create a new closer each time clone is called at the top-most level,
but when recursing, pass in a new function bound to that closure which is different from the global clone function.

populateClone would need to take an additional argument - the clone function to use for recursive cloning.
###

module.exports = class ShallowClone

  # unless obj is an Array, creates a prototype derivative of an object.
  # Same as "shallowClone" as follows:
  #   a) if obj is an array, it's a new array with the same elements as the source
  #   b) if obj is not an array, you have a new object you can modify however you like and you won't alter the source
  # Differs form "shallowClone" as follows:
  #   a) if the source object changes after you extendClone it, you will see the changed properties in the derived object (unless they are shadowed*)
  #   b) If you delete a shadowed* property and then read the property, you will see the source object's value
  #   c) source.isPrototypeOf(derived) === true!
  #   *) Shadowed properties are ones which have been set in both the source and drived object.
  #
  @extendClone: (obj) ->
    if obj.constructor == Array
      obj.slice()
    else
      Object.create obj

  @shallowClone: (obj) ->
    return obj unless obj
    if obj.constructor == Array
      obj.slice()
    else
      ret = {}
      for k, v of obj
        ret[k] = v
      ret
