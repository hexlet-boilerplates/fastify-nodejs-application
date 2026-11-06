// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import * as schema from './schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const migrationsFolder = path.join(root, 'drizzle');

/**
 * База везде PostgreSQL. Задан DATABASE_URL (Render, свой сервер) — подключаемся к нему.
 * Не задан — работает встроенный PGlite: тот же PostgreSQL внутри процесса,
 * данные в каталоге .pglite. Тесты всегда идут на PGlite в памяти.
 * @param {string} mode
 */
export const createDb = (mode) => {
  const url = process.env.DATABASE_URL;
  if (url && mode !== 'test') {
    return drizzlePg(url, { schema });
  }

  const dataDir = mode === 'test' ? undefined : path.join(root, '.pglite');
  return drizzlePglite({ client: new PGlite(dataDir), schema });
};

/**
 * @param {ReturnType<typeof createDb>} db
 */
const isPglite = (db) => db.$client instanceof PGlite;

/**
 * @param {ReturnType<typeof createDb>} db
 */
export const runMigrations = (db) =>
  isPglite(db)
    ? migratePglite(/** @type {any} */ (db), { migrationsFolder })
    : migratePg(/** @type {any} */ (db), { migrationsFolder });

/**
 * @param {ReturnType<typeof createDb>} db
 */
export const closeDb = (db) =>
  isPglite(db) ? db.$client.close() : /** @type {any} */ (db.$client).end();
