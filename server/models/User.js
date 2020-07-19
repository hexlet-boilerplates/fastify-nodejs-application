// @ts-check

import { Model } from 'objection';
import objectionUnique from 'objection-unique';

import encrypt from '../lib/secure.js';

const unique = objectionUnique({ fields: ['email'] });

export default class User extends unique(Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  hashPassword() {
    this.passwordDigest = encrypt(this.password);
    this.$omit('password');
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.hashPassword();
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.hashPassword();
  }
}
