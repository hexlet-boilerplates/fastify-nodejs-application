import fp from 'fastify-plugin';
import _ from 'lodash';
import { NotFound } from 'http-errors';

const getMethod = _.flow(_.get, _.toLower);

const fastifyMethodOverride = (fastify, opts, next) => {
  const routes = {};

  fastify.addHook('onRoute', (routeOptions) => {
    const { method, url, handler } = routeOptions;
    _.set(routes, [url, _.toLower(method)], handler);
  });

  const allowMethods = ['head', 'put', 'delete', 'options', 'patch'];

  fastify.addHook('preHandler', async (req, reply, done) => {
    const url = _.get(req, 'raw.url');
    const originalMethod = getMethod(req, 'raw.method');
    const method = getMethod(req, 'body._method');

    if (originalMethod === 'post' && allowMethods.includes(method)) {
      const handler = _.get(routes, [url, method]);

      if (!handler) {
        const message = `Route ${_.toUpper(method)}:${url} not found`;
        throw new NotFound(message);
      }

      _.set(req, 'raw.method', _.toUpper(method));
      await handler(req, reply);
    }

    done();
  });

  next();
};

export default fp(fastifyMethodOverride);
