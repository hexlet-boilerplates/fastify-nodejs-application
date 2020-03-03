// @ts-check

import fp from 'fastify-plugin';
import _ from 'lodash';

export default fp((fastify, _opts, next) => {
  fastify.decorate('state', {});
  fastify.decorate('isSignedIn', () => _.get(fastify, 'state.authenticated', false));

  fastify.addHook('preValidation', (req, _reply, done) => {
    const authenticated = !_.isUndefined(req.session.userId);
    _.set(fastify, 'state.authenticated', authenticated);
    done();
  });

  next();
});
