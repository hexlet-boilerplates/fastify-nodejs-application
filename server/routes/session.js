// @ts-check

// import { InternalServerError } from 'http-errors';
// import { User } from '../models';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';
// import encrypt from '../lib/secure';
import User from '../entity/User.js';

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, async (req, reply) => {
      const user = new User(); // buildFromModel(User.rawAttributes);
      // console.log(params);
      // req.log.info('user', params);
      reply.render('session/new', { user });
      return reply;
      // reply.send(204);
    })
    .post('/session', { name: 'session' }, async (req, reply) => {
      // const { body: { form } } = req;
      // const { email, password } = form;

      // const user = await User.findOne({
      //   where: {
      //     email,
      //   },
      // });

      // if (user !== null && user.passwordDigest === encrypt(password)) {
      //   req.session.userId = user.id;
      //   reply.redirect(app.reverse('root'));
      //   return;
      // }

      // const params = {
      //   ...buildFromObj({ email }),
      //   init: true,
      //   flash: {
      //     info: [req.i18n.t('messages.authFailed')],
      //   },
      // };
      // reply.view('session/new', params);
    })
    .delete('/session', (req, reply) => {
      // if (app.isSignedIn()) {
      //   req.destroySession((err) => {
      //     if (err) {
      //       throw new InternalServerError();
      //     }
      //   });
      // }
      // reply.redirect('/');
    });
};
