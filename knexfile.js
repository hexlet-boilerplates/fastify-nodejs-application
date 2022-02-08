// @ts-check

import path from 'path';

const migrations = {
  directory: path.join('server', 'migrations'),
};

export const development = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
  migrations,
};

export const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  migrations,
};

export const production = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
  migrations,
};
