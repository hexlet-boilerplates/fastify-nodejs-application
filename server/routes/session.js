// @ts-check

// import { InternalServerError } from 'http-errors';
// import { User } from '../models';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';
// import encrypt from '../lib/secure';
import User from '../entity/User.js';
import encrypt from './../lib/secure.js';

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, (req, reply) => {
      const signInForm = {};
      reply.render('session/new', { signInForm });
      return reply;
    })
    .post('/session', { name: 'session' }, async (req, reply) => {
      const signInForm = req.body.object;
      const user = await User.findOne({ where: { email: signInForm.email } });
      if (!user || (user.passwordDigest !== encrypt(signInForm.password))) {
        req.flash('error', 'messages.signInError');
        return reply.render('session/new', { signInForm });
      }

      req.session.set('userId', user.id);
      req.flash('info', 'messages.createUserSuccess');
      return reply.redirect(app.reverse('root'));
    })
    .delete('/session', (req, reply) => {
      req.session.delete();
      return reply.redirect(app.reverse('root'));
    });
};
