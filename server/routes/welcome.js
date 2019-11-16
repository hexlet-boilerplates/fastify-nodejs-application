export default (app) => {
  app
    .get('/', { name: 'root' }, (req, reply) => {
      const msg = reply.flash();
      reply.view('welcome/index', { flash: msg });
    });
};
