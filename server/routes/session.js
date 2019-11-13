import { User } from '../models';
import { buildFromObj, buildFromModel } from '../lib/formObjectBuilder';
import encrypt from '../lib/secure';

export default (app) => {
  app
    .get('/session/new', async (req, reply) => {
      const params = buildFromModel(User.rawAttributes);
      reply.view('session/new', params);
    })
    .post('/session', async (req, reply) => {
      const { body: { form } } = req;
      const { email, password } = form;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user !== null && user.passwordDigest === encrypt(password)) {
        req.session.userId = user.id;
        reply.redirect('/');
        return;
      }

      const params = {
        ...buildFromObj({ email }),
        init: true,
        flash: {
          info: ['email or password were wrong'],
        },
      };
      reply.view('session/new', params);
    });
};
