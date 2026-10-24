// @ts-check

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/db/schema.js',
  out: './drizzle',
});
