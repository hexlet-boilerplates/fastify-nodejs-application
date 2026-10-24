// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { drizzle } from 'drizzle-orm/node-sqlite';
import { migrate } from 'drizzle-orm/node-sqlite/migrator';
import * as schema from './schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const migrationsFolder = path.join(root, 'drizzle');

const filenames = {
  development: path.join(root, 'database.sqlite'),
  test: ':memory:',
  production: path.join(root, 'database.sqlite'),
};

/**
 * @param {string} mode
 */
export const getFilename = (mode) => filenames[mode] ?? filenames.development;

/**
 * @param {string} filename
 */
export const createDb = (filename) => drizzle({ client: new DatabaseSync(filename), schema });

/**
 * @param {ReturnType<typeof createDb>} db
 */
export const runMigrations = (db) => migrate(db, { migrationsFolder });
