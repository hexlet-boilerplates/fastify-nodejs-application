// @ts-check

const crypto = require('node:crypto');

/**
 * @param {string} value
 */
module.exports = (value) => crypto.createHash('sha256')
  .update(value)
  .digest('hex');
