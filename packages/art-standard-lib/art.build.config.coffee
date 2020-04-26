module.exports =
  target: node: true
  package:
    description: "The Standard Library for JavaScript that aught to be."

    dependencies:
      pluralize: "^8.0.0"

  webpack:
    targets:
      index:  {}
      Types:  {}
      Core:   {}
