// @ts-check

import _ from 'lodash';
import i18next from 'i18next';
import { users } from '../db/schema.js';
import { create, validate } from '../lib/users.js';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (_req, reply) => {
      const allUsers = app.db.select().from(users).all();
      reply.render('users/index', { users: allUsers });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (_req, reply) => {
      reply.render('users/new', { user: {} });
    })
    .post('/users', async (req, reply) => {
      const data = req.body.data;
      const errors = validate(app.db, data);

      if (!_.isEmpty(errors)) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: data, errors });
        return reply;
      }

      create(app.db, data);
      req.flash('info', i18next.t('flash.users.create.success'));
      reply.redirect(app.reverse('root'));
      return reply;
    });
};
