{
  generatedByString
  neptuneBaseClass
  requirePath
} = require '../Helper'

module.exports = class NamespaceGenerator
  @generate: (namespace, relativeFilePath) ->
    {parent, path, namespaceName} = namespace
    parentNamespaceName = parent.namespaceName
    parentNamespacePath = if parent.parent
      "../namespace"
    else
      parent.path

    """
    #{generatedByString}
    # file: #{relativeFilePath || path}/namespace.coffee

    #{parentNamespaceName} = require '#{parentNamespacePath}'
    module.exports = #{parentNamespaceName}.#{namespaceName} ||
    #{parentNamespaceName}.addNamespace '#{namespaceName}', class #{namespaceName} extends #{neptuneBaseClass}
      ;
    #{
      a = for name in namespace.getAllNamespacedSubdirRequires()
        "require '#{requirePath name}/namespace'"
      a.join ";\n"
    }
    """
