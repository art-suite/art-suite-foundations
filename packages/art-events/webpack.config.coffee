module.exports = (require "art-foundation/configure_webpack")
  entries: "index, test"
  dirname: __dirname
  package:
    dependencies:
      "art-foundation": "git://github.com/imikimi/art-foundation.git"
