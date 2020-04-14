import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import { createTestApp } from './utils';

describe('test root', () => {
  let app = null;

  beforeAll(async () => {
    expect.extend(matchers);
    app = await createTestApp();
  });

  test('users controller', async () => {
    const res = await request(app.server)
      .get('/users');
    expect(res).toHaveHTTPStatus(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
