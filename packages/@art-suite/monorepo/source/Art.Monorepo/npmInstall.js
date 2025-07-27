const { log } = require('art-standard-lib')
const { yellow } = require('./ColorsLib')

/**
 * Runs `npm install` inside an explicit shell
 * @param {string} cwd
 * @returns {Promise<void>}
 */
const npmInstall = async () => {
  log(yellow("Running `npm install` in the root..."))
  return require('child_process').execSync('npm install', { stdio: 'inherit' })
}

module.exports = { npmInstall }