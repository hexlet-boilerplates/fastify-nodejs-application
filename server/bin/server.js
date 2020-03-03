#! /usr/bin/env node

import _ from 'lodash';
import getApp from '../index.js';

const port = _.get(process, 'env.PORT', 4000);
const address = '0.0.0.0';

getApp().listen(port, address, () => {
  console.log(`Server is running on port: ${port}`);
});
