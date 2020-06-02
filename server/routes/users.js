// @ts-check

import i18next from 'i18next';
import { User } from '../entity/index.js';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await User.findAll();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, async (req, reply) => {
      // const params = buildFromModel(User.rawAttributes);
      const user = User.build();
      reply.render('users/new', { user });
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = User.build(req.body.user);

      try {
        await user.save();
        req.flash('info', i18next.t('flash.users.create.success'));
        return reply.redirect(app.reverse('root'));
      } catch ({ errors }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        return reply.render('users/new', { user, errors });
      }
    });
};
