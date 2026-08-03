// @ts-check

export default (app) => {
  app
    .get('/', { name: 'root' }, (_req, reply) => {
      reply.render('welcome/index');
    })
    .get('/protected', { name: 'protected', preValidation: app.authenticate }, (_req, reply) => {
      reply.render('welcome/index');
    });
};
