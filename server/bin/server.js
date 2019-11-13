#! /usr/bin/env node

import getApp from '..';

const port = process.env.PORT || 4000;
const address = '0.0.0.0';

getApp().listen(port, address, () => {
  console.log(`Server is running on port: ${port}`);
});
