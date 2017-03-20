module.exports =
  target:
    node: true

  package:
    dependencies:
      xhr2: "^0.1.4"
      'art-communication-status': '^1.0.0'

    description: "Promise-based rest-client library. Makes HTTP/HTTPS easy."

  webpack:
    targets:
      index: {}
