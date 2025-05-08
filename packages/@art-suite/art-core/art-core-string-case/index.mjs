import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  getCodeWords,
  codeWords,
  lowerCase,
  upperCase,
  capitalize,
  decapitalize,
  getLowerCaseCodeWords,
  getUpperCaseCodeWords,
  getCapitalizedCodeWords,
  upperCamelCase,
  lowerCamelCase,
  snakeCase,
  upperSnakeCase,
  dashCase,
  capitalizedDashCase
} = require('./build');