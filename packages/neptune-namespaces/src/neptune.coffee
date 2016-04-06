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

  @addToNamespace: (k, v) ->
    console.error "Neptune.Base.include: namespace #{@namespacePath} already has key: #{k}" if @[k]
    @[k] = v

  @includeInNamespace: ->
    for arg in arguments when arg
      if arg.constructor == Array
        [fromObject] = arg
        for i in [1...arg.length]
          for key in arg[i].match /[0-9a-z_]+/ig
            console.warn "includeInNamespace #{key}"
            @addToNamespace key, fromObject[key]
      else
        @addToNamespace k, v for k, v of arg when k not in excludedKeys
    @
  excludedKeys = ["__super__", "namespace", "namespacePath"].concat Object.keys Base

module.exports = self.Neptune = class Neptune extends Base
  @Base: Base
  @namespacePath: "Neptune"
  @namespace: null

console.log "neptune-namespaces global defined: self.Neptune"
