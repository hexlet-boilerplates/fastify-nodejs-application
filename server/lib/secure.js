// @ts-check

import crypto from 'node:crypto';

/**
 * @param {string} value
 */
export default (value) => crypto.createHash('sha256').update(value).digest('hex');
