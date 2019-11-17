import fp from 'fastify-plugin';
import _ from 'lodash';

export default fp((app, opts, next) => {
  app.decorate('state', {});
  app.decorate('isSignedIn', () => _.get(app.state, 'authenticated', false));

  app.addHook('preValidation', (req, reply, done) => {
    const authenticated = !_.isUndefined(req.session.userId);
    _.set(app.state, 'authenticated', authenticated);
    done();
  });

  next();
});
