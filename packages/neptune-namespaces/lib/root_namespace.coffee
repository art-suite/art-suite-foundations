module.exports = self.Neptune = class Neptune
  @namespacePath: "Neptune"
  @Base: class Base
    @namespacePath: "Neptune.Base"
    @namespace: "Neptune"
    @classes: []
    @namespaces: []
    @finishLoad: (classes, namespaces)->
      @classes = @classes.concat classes
      @namespaces = @namespaces.concat namespaces
      for name in classes when klass = @[name]
        klass.namespace = @
        klass.namespacePath = @namespacePath + "." + klass
console.log "neptune-namespaces global defined: self.Neptune"
