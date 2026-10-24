// @ts-check

import _ from 'lodash';
import { Strategy } from '@fastify/passport';
import { findByEmail, verifyPassword } from '../users.js';

export default class FormStrategy extends Strategy {
  constructor(name, app) {
    super(name);
    this.app = app;
  }

  async authenticate(request) {
    if (request.isAuthenticated()) {
      return this.pass();
    }

    const email = _.get(request, 'body.data.email', null);
    const password = _.get(request, 'body.data.password', null);
    const user = findByEmail(this.app.db, email);
    if (user && verifyPassword(user, password)) {
      return this.success(user);
    }

    return this.fail();
  }
}
