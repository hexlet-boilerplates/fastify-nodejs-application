const appConfig = {
  db: {
    default: {
      synchronize: false,
      migrationsRun: true,
      // migrations: [`${__dirname}/../db/migrations/**/*.js`],
      entities: [`${__dirname}/../entity/**/*.js`],
      cli: {
        migrationsDir: 'server/modules/db/migrations',
      },
    },
    development: {
      synchronize: true,
      type: 'sqlite',
      database: `${__dirname}/database.sqlite`,
      dialect: 'sqlite',
      logging: 'error',
    },
    test: {
      type: 'sqlite',
      database: ':memory:',
      name: 'default',
      logging: 'all',
    },
    production: {
      username: 'root',
      password: 'null',
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  },
};

const currentEnv = process.env.NODE_ENV || 'development';

const getConfig = (config, env) => Object.keys(config).reduce((acc, key) => {
  return { ...acc, [key]: Object.assign(config[key].default, config[key][env]) };
}, {});

export default () => getConfig(appConfig, currentEnv);
