import crypto from 'crypto';

export default (value) => crypto.createHash('sha256')
  .update(value)
  .digest('hex');
