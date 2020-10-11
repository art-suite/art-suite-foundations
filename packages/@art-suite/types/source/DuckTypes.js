let {isNonNegativeInt} = require('./MiscTypes');

let isArrayIterable = (source) => source != null && isNonNegativeInt(source.length);

module.exports = {isArrayIterable};