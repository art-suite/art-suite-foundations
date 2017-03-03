ConfigureWebpack = require './ConfigureWebpack'
module.exports =
  getWebpackConfig: ConfigureWebpack.get
  getPackageJson:   ConfigureWebpack.get