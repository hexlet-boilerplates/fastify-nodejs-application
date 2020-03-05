// @ts-check

import 'reflect-metadata';
import path from 'path';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyTypeORM from 'fastify-typeorm';
import fastifyErrorPage from 'fastify-error-page';
import pointOfView from 'point-of-view';
import fastifyFormbody from 'fastify-formbody';
import fastifySession from 'fastify-session';
import fastifyCookie from 'fastify-cookie';
import fastifyFlash from 'fastify-flash';
import fastifyReverseRoutes from 'fastify-reverse-routes';
import Pug from 'pug';
// import _ from 'lodash';
import i18next from 'i18next';
import ru from './locales/ru.js';
// import i18nextBackend from 'i18next-node-fs-backend';

import addRoutes from './routes/index.js';
import getHelpers from './helpers/index.js';
// import auth from './plugins/auth';
// import fastifyMethodOverride from './plugins/fastifyMethodOverride';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  const domain = isDevelopment ? 'http://localhost:8080' : '';
  const helpers = getHelpers(app);
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  app.decorateReply('render', function(path, locals) {
    this.view(path, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const domain = isDevelopment ? 'http://localhost:8080' : '';
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'dist', 'public'),
    prefix: '/assets/',
  });
};

const setupLocalization = (app) => {
  i18next
    .init({
      lng: 'ru',
      fallbackLng: 'en',
      debug: isDevelopment,
      resources: {
        ru,
      },
    });

  // app.decorateRequest('i18n', i18next);
  // app.decorate('i18n', i18next);
};

const registerPlugins = (app) => {
  app.register(fastifyErrorPage);
  app.register(fastifyReverseRoutes);
  app.register(fastifyFormbody);
  app.register(fastifyCookie);
  app.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'a secret with minimum length of 32 characters',
    cookie: { secure: false },
    expires: 7 * 24 * 60 * 60,
  });
  app.register(fastifyFlash);
  // app.register(auth);
  // app.register(fastifyMethodOverride);
  // app.register(fastifyTypeORM, {
  //   type: 'sql.js',
  // });
};

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: isDevelopment,
      timestamp: !isDevelopment,
      base: null,
    },
  });

  registerPlugins(app);

  setupLocalization(app);
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);

  return app;
};
