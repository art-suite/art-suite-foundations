### v1.1 (2016-09-06)

Runtime - each namespaces has:

  @namespacePath: string: full path of the namespace. (can 'eval' it and get back the namespace)
  @namespace:     parent namespace (unless it is Neptune, in which case, null)

  @namespaces:    map from name to sub-namespace
  @modules:       map from name to sub-modules

  @getNamespaceNames() - returns sorted list of names
  @getModuleNames() - returns sorted list of names

Generation -

  Generated files are signed with Neptune-Namespaces MAJOR version only.
  (If the major version changes, you should regenerate your NN files.)

  dirs starting with "." are considered "optional sub-namespaces"
    They, and their subdirs, still get namespace and index files generated.
    They are not automatically 'required' when requiring their parent namespace.
    HOWEVER, if you manually 'require' them, they will link themselves into the parent namespace.

### v0.5

- dog-fooding - Neptune Namespaces' source code now uses NN

### v0.4.2 (2016-07-12)

- major refactor
- real tests!

New semantics:

  files/dirs starting with "." are ignored
  files/dirs starting with "-" 'required', but not 'namespaced'
  namespace/module name generation is now much more flexible:
    take all words in the filename:
      allWords: filename.match /[a-zA-Z][a-zA-Z0-9]*/g
    then capitalize and concat them

### v0.2.1 (2016-05-18)

doc updates

### v0.2.0 (2016-05-18)

added "fource" and "silent" options

### v0.1.0 (2016-05-18)

added Neptune.isNamespace
