export default {
  type: 'sqlite',
  database: `${__dirname}/database.sqlite`,
  synchronize: true,
  logger: 'debug',
  logging: true,
  entities: [
    `${__dirname}/server/entity/**/*.js`,
  ],
  migrations: [
    'server/migration/*.js',
  ],
  subscribers: [
    'server/subscriber/*.js',
  ],
  cli: {
    entitiesDir: 'server/entity',
    migrationsDir: 'server/migration',
    subscribersDir: 'server/subscriber',
  },
};
