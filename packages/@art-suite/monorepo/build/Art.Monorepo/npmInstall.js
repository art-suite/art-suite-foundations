const { spawn } = require('child_process')

/**
 * Runs `npm install` inside an explicit shell
 * @param {string} cwd
 * @returns {Promise<void>}
 */
const npmInstall = async () =>
  require('child_process').execSync('npm install', { stdio: 'inherit' })

module.exports = { npmInstall }