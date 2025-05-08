import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  gt,
  lt,
  gte,
  lte,
  eq,
  neq,
  fastEq,
  fastNeq,
  compare,
  plainObjectsDeepEqArray,
  plainObjectsDeepEqObject,
  plainObjectsDeepEq,
  propsEq,
  plainObjectsDeepDiffArray,
  plainObjectsDeepDiffObject,
  plainObjectsDeepDiff,
  diff,
  shallowEq,
} = require('./build');

