module.exports =
  packageJson:
    description: 'Tools for configuring npm (package.json) and webpack (webpack.config.js)'
    scripts:
      "test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"
