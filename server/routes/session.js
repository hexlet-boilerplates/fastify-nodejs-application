// @ts-check

import i18next from 'i18next';
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
        req.flash('error', i18next.t('flash.session.create.error'));
        return reply.render('session/new', { signInForm });
      }

      req.session.set('userId', user.id);
      req.flash('info', i18next.t('flash.session.create.success'));
      return reply.redirect(app.reverse('root'));
    })
    .delete('/session', (req, reply) => {
      req.session.set('userId', null);
      req.flash('info', i18next.t('flash.session.delete.success'));
      return reply.redirect(app.reverse('root'));
    });
};
