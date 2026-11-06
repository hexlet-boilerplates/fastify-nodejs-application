// @ts-check

import { closeDb, createDb, runMigrations } from './index.js';

const db = createDb(process.env.NODE_ENV ?? 'development');
await runMigrations(db);
await closeDb(db);
