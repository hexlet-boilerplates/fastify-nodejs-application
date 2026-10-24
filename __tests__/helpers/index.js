// @ts-check

import { URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { users } from '../../server/db/schema.js';

const getFixturePath = (filename) => path.join('..', '..', '__fixtures__', filename);
const readFixture = (filename) =>
  fs.readFileSync(new URL(getFixturePath(filename), import.meta.url), 'utf-8').trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

export const getTestData = () => getFixtureData('testData.json');

export const prepareData = (app) => {
  // получаем данные из фикстур и заполняем БД
  app.db.insert(users).values(getFixtureData('users.json')).run();
};
