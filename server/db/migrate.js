// @ts-check

import { createDb, getFilename, runMigrations } from './index.js';

const db = createDb(getFilename(process.env.NODE_ENV ?? 'development'));
runMigrations(db);
db.$client.close();
