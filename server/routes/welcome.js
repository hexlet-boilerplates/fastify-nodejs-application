// @ts-check

import fp from 'fastify-passport';

export default (app) => {
  app
    .get('/', { name: 'root', preValidation: fp.authenticate('session') }, (req, reply) => {
      reply.render('welcome/index');
    });
};
