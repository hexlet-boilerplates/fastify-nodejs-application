// @ts-check

export default (app) => {
  app
    .get('/', { name: 'root' }, (req, reply) => {
      const msg = reply.flash();
      reply.render('welcome/index', { flash: msg });
    });
};
