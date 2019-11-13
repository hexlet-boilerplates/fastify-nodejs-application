export default (app) => {
  app
    .get('/', (req, reply) => {
      const msg = reply.flash();
      reply.view('welcome/index', { flash: msg });
    });
};
