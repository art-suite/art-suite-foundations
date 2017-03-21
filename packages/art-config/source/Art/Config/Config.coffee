module.exports = [
  Config: require './Configuration'
  [require('./ConfigRegistry'), "configure"]
]