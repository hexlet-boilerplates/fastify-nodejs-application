// @ts-check

import i18next from 'i18next';
import { validate } from 'class-validator';
import _ from 'lodash';
import encrypt from '../lib/secure.js';
import User from '../entity/User.js';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.orm.getRepository(User).find();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, async (req, reply) => {
    //     const params = buildFromModel(User.rawAttributes);
      const user = new User();
      reply.render('users/new', { user });
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = User.create(req.body.user);
      user.password = req.body.user.password;
      user.passwordDigest = encrypt(user.password);

      const errors = await validate(user);
      if (!_.isEmpty(errors)) {
        req.flash('error', i18next.t('flash.users.create.error'));
        return reply.render('users/new', { user, errors });
      }
      await user.save();
      req.flash('info', i18next.t('flash.users.create.success'));
      return reply.redirect(app.reverse('root'));
    });
};
