#! /usr/bin/env node

import getApp from '../index.js';
import getConfig from '../config';

const port = process.env.PORT || 5000;
const address = '0.0.0.0';

const start = async () => {
  const config = getConfig();
  const app = await getApp(config);
  app.listen(port, address, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

start();
