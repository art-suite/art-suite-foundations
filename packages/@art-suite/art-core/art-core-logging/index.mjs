import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  CallStackLine,
  log,
  showLogging,
  hideLogging,
  logPromise,
  logRejectedPromises,
  errorToString,
  rawCallStack,
  callStack,
  alignTabs,
  failsafeInspect,
  formattedInspect,
  toInspectedObjects,
  inspectedObjectLiteral,
  InspectedObjectLiteral,
  postWhitespaceFormatting
} = require('./build');