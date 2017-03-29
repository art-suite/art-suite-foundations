module.exports =
  target:
    ###
    configures for standard node-targeted library
    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.
      They just can't be used *directly* in the browser
    ###
    node: true

  npm:
    description: 'TODO'

  webpack:
    # common properties are merged into each target's properties
    common: {}

    # each target's individual properties
    targets: index: {}
