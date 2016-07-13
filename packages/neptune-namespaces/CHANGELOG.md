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
