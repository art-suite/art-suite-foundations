const { readFile } = require('fs/promises')
const { existsSync } = require('fs')
const { join, resolve } = require('path')
const ignore = require('ignore')

/**
 * Finds all .gitignore files from root to the target directory.
 * Returns a Map where keys are gitignore file paths and values are their contents.
 * Only returns gitignore files that apply to the target path.
 * Can optionally write into an existing Map to build up a growing structure.
 */
const findGitignoreFiles = async (targetPath, gitignoreMap = new Map()) => {
  const absolutePath = resolve(targetPath)
  const pathParts = absolutePath.split('/')

  let currentPath = '/'

  for (let i = 1; i < pathParts.length; i++) {
    currentPath = join(currentPath, pathParts[i])
    const gitignorePath = join(currentPath, '.gitignore')

    if (existsSync(gitignorePath) && !gitignoreMap.has(gitignorePath)) {
      try {
        const content = await readFile(gitignorePath, 'utf8')
        gitignoreMap.set(gitignorePath, content)
      } catch (error) {
        console.warn(`Warning: Could not read ${gitignorePath}:`, error)
      }
    }
  }

  return gitignoreMap
}

/**
 * Converts a gitignore Map to an array of objects with path and content,
 * ordered by how they apply to a specific file path (root first, then nested).
 */
const gitignoreMapToArray = (gitignoreMap, filePath) => {
  const absolutePath = resolve(filePath)
  const pathParts = absolutePath.split('/')
  const gitignoreArray = []

  let currentPath = '/'

  for (let i = 1; i < pathParts.length; i++) {
    currentPath = join(currentPath, pathParts[i])
    const gitignorePath = join(currentPath, '.gitignore')

    if (gitignoreMap.has(gitignorePath)) {
      gitignoreArray.push({
        path: gitignorePath,
        content: gitignoreMap.get(gitignorePath)
      })
    }
  }

  return gitignoreArray
}

/**
 * Determines which gitignore file applies to a given file path.
 * Returns the path of the gitignore file that matches, or null if none apply.
 * This is a pure function for testing purposes.
 */
const getMatchingGitignorePath = (gitignoreFiles, filePath) => {
  if (gitignoreFiles.length === 0) return null

  // Test each gitignore file individually to find which one applies
  for (const gitignoreFile of gitignoreFiles) {
    const ig = ignore().add(gitignoreFile.content)
    if (ig.ignores(filePath)) {
      return gitignoreFile.path
    }
  }

  return null
}

const isGitIgnored = async (filePath) => {
  const gitignoreFiles = await findGitignoreFiles(filePath)
  const gitignoreArray = gitignoreMapToArray(gitignoreFiles, filePath)
  return getMatchingGitignorePath(gitignoreArray, filePath)
}

/**
 * Determines which files in an array are ignored by gitignore rules.
 * Efficiently builds up a gitignore map across all files to avoid redundant file system operations.
 *
 * @param {string[]} filePaths - Array of file paths to check
 * @returns {Promise<Array<{filePath: string, isIgnored: boolean}>>} Array of results with file paths and ignore status
 */
const getAllIsIgnored = async (filePaths) => {
  if (filePaths.length === 0) return []

  // Build up gitignore map efficiently across all files in parallel
  const gitignoreMaps = await Promise.all(
    filePaths.map(filePath => findGitignoreFiles(filePath))
  )

  // Merge all gitignore maps into one
  const gitignoreMap = new Map()
  for (const map of gitignoreMaps) {
    for (const [path, content] of map) {
      gitignoreMap.set(path, content)
    }
  }

  // Check which files are ignored in parallel
  return Promise.all(
    filePaths.map(async filePath => {
      const gitignoreArray = gitignoreMapToArray(gitignoreMap, filePath)
      const matchingGitignorePath = getMatchingGitignorePath(gitignoreArray, filePath)
      return { filePath, isIgnored: !!matchingGitignorePath }
    })
  )
}

/**
 * Filters an array of file paths to return only those that are not ignored by gitignore rules.
 * Efficiently builds up a gitignore map across all files to avoid redundant file system operations.
 *
 * @param {string[]} filePaths - Array of file paths to check
 * @returns {Promise<string[]>} Array of file paths that are not ignored
 */
const getAllNonIgnoredFiles = async (filePaths) => {
  const ignoredResults = await getAllIsIgnored(filePaths)

  return ignoredResults
    .filter(result => !result.isIgnored)
    .map(result => result.filePath)
}

module.exports = {
  isGitIgnored,
  getAllIsIgnored,
  getAllNonIgnoredFiles
}