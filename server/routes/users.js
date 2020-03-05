// @ts-check

// import { User } from '../models';
// import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';
import User from '../entity/User.js';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = []; // await User.findAll();
      reply.render('users/index', { users });
    })
    .get('/users/new', { name: 'newUser' }, async (req, reply) => {
  //     const params = buildFromModel(User.rawAttributes);
      const user = {};
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      // const { body: { form } } = req;
      // const user = User.build(form);
      const user = {};
      const errors = {};

      // try {
      //   await user.save();
      //   req.flash('info', req.i18n.t('messages.createUserSuccess'));
      //   reply.redirect(app.reverse('root'));
      // } catch (e) {
      //   const params = buildFromObj(user.dataValues, e.errors);
      reply.render('users/new', { user, errors });
      // }
    });
};
