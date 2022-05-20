// @ts-check

import {
  describe, beforeAll, it, expect,
} from '@jest/globals';

import { buildApp } from './helpers/index.js';

describe('requests', () => {
  let app;

  beforeAll(async () => {
    app = await buildApp();
  });

  it('GET 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('root'),
    });
    expect(res.statusCode).toBe(200);
  });

  it('GET 404', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/wrong-path',
    });
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
