// @ts-check

import _ from 'lodash';
import { Strategy } from 'fastify-passport';

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
    const { models } = this.app.objection;
    const user = await models.user.query().findOne({ email });
    if (user && user.verifyPassword(password)) {
      return this.success(user);
    }

    return this.fail();
  }
}
