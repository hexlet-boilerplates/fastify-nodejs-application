// @ts-check

import { validate } from 'class-validator';
import _ from 'lodash';
import encrypt from '../lib/secure.js';
import User from '../entity/User.js';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.orm.getRepository(User).find();
      return reply.render('users/index', { users });
    })
    .get('/users/new', { name: 'newUser' }, async (req, reply) => {
    //     const params = buildFromModel(User.rawAttributes);
      const user = new User();
      return reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = User.create(req.body.user);
      user.password = req.body.user.password;
      user.passwordDigest = encrypt(user.password);

      const errors = await validate(user);
      if (!_.isEmpty(errors)) {
        req.flash('error', 'messages.createUserError');
        return reply.render('users/new', { user, errors });
      }
      await user.save();
      req.flash('info', 'messages.createUserSuccess');
      return reply.redirect(app.reverse('root'));
    });
};
