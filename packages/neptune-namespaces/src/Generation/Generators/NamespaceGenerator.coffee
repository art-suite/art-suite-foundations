{
  generatedByString
  neptuneBaseClass
} = require '../Helper'

module.exports = class NamespaceGenerator
  @generate: (namespace) ->
    {parent, path, namespaceName} = namespace
    parentNamespaceName = parent.namespaceName
    parentNamespacePath = if parent.parent
      "../namespace"
    else
      parent.path

    """
    #{generatedByString}
    # file: #{path}/namespace.coffee

    #{parentNamespaceName} = require '#{parentNamespacePath}'
    module.exports = #{parentNamespaceName}.#{namespaceName} ||
    #{parentNamespaceName}.addNamespace '#{namespaceName}', class #{namespaceName} extends #{neptuneBaseClass}
      ;
    """
