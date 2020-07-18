// @ts-check

import { Model, ValidationError } from 'objection';
import encrypt from '../lib/secure.js';

export default class User extends Model {
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

  async hashPassword() {
    this.passwordDigest = encrypt(this.password);
    this.$omit('password');
  }

  async $beforeSave(isInserting = false) {
    const user = await this.constructor.query().findOne({ email: this.email });
    if (user) {
      if (isInserting || user.id !== this.id) {
        throw new ValidationError({
          type: 'ModelValidation',
          data: {
            email: [
              {
                message: 'must be unique',
              },
            ],
          },
        });
      }
    }
    await this.hashPassword();
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    await this.$beforeSave(true);
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    await this.$beforeSave();
  }
}
