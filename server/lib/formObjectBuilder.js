import _ from 'lodash';

export const buildFromObj = (object, errors = {}) => ({
  init: false,
  name: 'form',
  form: object,
  errors: _.groupBy(errors, 'path'),
});

export const buildFromModel = (object, errors = {}) => ({
  init: true,
  name: 'form',
  form: Object.keys(object).reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
  errors,
});
