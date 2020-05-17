module.exports =
  target: node: true
  package:
    description: "The Standard Library for JavaScript that aught to be."

    dependencies:
      pluralize: "*"

  webpack:
    targets:
      index:  {}
      Types:  {}
      Core:   {}
