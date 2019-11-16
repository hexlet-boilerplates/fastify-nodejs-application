import { User } from '../models';
import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await User.findAll();
      reply.view('users/index', { users });
    })
    .get('/users/new', { name: 'newUser' }, async (req, reply) => {
      const params = buildFromModel(User.rawAttributes);
      reply.view('users/new', params);
    })
    .post('/users', async (req, reply) => {
      const { body: { form } } = req;
      const user = User.build(form);

      try {
        await user.save();
        req.flash('info', 'User has been created');
        reply.redirect(app.reverse('root'));
      } catch (e) {
        const params = buildFromObj(user.dataValues, e.errors);
        reply.view('users/new', params);
      }
    });
};
