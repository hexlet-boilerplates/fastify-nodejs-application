import * as path from 'path';
import {
  Builder, fixturesIterator, Loader, Parser, Resolver,
} from 'typeorm-fixtures-cli/dist';
import { getConnection, getRepository } from 'typeorm';
import getConfig from '../server/config';
import getApp from '../server';

const clearDb = async () => {
  const connection = getConnection('default');
  if (connection.isConnected) {
    await connection.dropDatabase();
    await connection.close();
  }
};

const loadFixtures = async (connection) => {
  try {
    const fixturesPath = path.resolve(__dirname, './__fixtures__');
    await connection.synchronize(true);
    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture);
      await getRepository(entity.constructor.name).save(entity);
    }
  } catch (err) {
    console.log(`error!!! ${err}, Load fixtures error, clear database`);
  }
};

const createTestApp = async () => {
  const config = getConfig();
  const app = await getApp(config);
  const dbConnection = getConnection();
  await loadFixtures(dbConnection);
  await app.listen();
  return app;
};

export { loadFixtures, clearDb, createTestApp };
