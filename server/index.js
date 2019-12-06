// @ts-check

import path from 'path';
import fastify from 'fastify';
import webpack from 'webpack';
import HMR from 'fastify-webpack-hmr';
import fastifyStatic from 'fastify-static';
import pointOfView from 'point-of-view';
import fastifyFormbody from 'fastify-formbody';
import fastifySession from 'fastify-session';
import fastifyCookie from 'fastify-cookie';
import fastifyFlash from 'fastify-flash';
import fastifyReverseRoutes from 'fastify-reverse-routes';
import Pug from 'pug';
import _ from 'lodash';
import i18next from 'i18next';
import i18nextBackend from 'i18next-node-fs-backend';

import webpackConfig from '../webpack.config.babel';
import addRoutes from './routes';
import auth from './plugins/auth';
import fastifyMethodOverride from './plugins/fastifyMethodOverride';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const setUpWebpackHotReload = (app) => {
  if (isDevelopment) {
    // @ts-ignore
    const compiler = webpack(webpackConfig);
    app.register(HMR, { compiler });
  }
};

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      _,
      getUrl: (name) => app.reverse(name),
      isSignedIn: () => app.isSignedIn(),
      getText: (keys) => app.i18n.t(keys),
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'dist', 'public'),
    prefix: '/assets/',
  });
};

const setupLocalization = (app) => {
  i18next
    .use(i18nextBackend)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      debug: isDevelopment,
      backend: {
        loadPath: path.join(__dirname, '..', 'locales', '{{lng}}.json'),
      },
    });

  app.decorateRequest('i18n', i18next);
  app.decorate('i18n', i18next);
};

const registerPlugins = (app) => {
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
  app.register(auth);
  app.register(fastifyMethodOverride);
};

export default () => {
  const app = fastify({
    logger: isDevelopment,
  });

  registerPlugins(app);

  setUpWebpackHotReload(app);
  setupLocalization(app);
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);

  return app;
};
