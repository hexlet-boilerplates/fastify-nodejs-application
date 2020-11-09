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
    const { data } = request.body;
    const { models } = this.app.objection;
    const user = await models.user.query().findOne({ email: data.email });
    if (user && user.verifyPassword(data.password)) {
      return this.success(user);
    }
    return this.fail();
  }
}
