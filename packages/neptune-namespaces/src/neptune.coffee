if typeof global == 'object'
  # running in node.js
  global.self = global

class Base
  @namespacePath: "Neptune.Base"
  @namespace: null
  @allNamespaces: {}
  @classes: []
  @namespaces: []
  @addNamespace: (namespace) ->
    @allNamespaces[namespace.namespacePath] ||= []
    @namespaces = @allNamespaces[@namespacePath] ||= []
    @namespaces.push namespace

  @finishLoad: (classes)->
    newClasses = for name in classes when typeof (klass = @[name]) == "function"
      klass.namespace = @
      klass.namespacePath = @namespacePath + "." + klass.name
      klass

    @classes = @classes.concat newClasses

module.exports = self.Neptune = class Neptune extends Base
  @Base: Base
  @namespacePath: "Neptune"
  @namespace: null

console.log "neptune-namespaces global defined: self.Neptune"
