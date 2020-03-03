// @ts-check

import _ from 'lodash';

/**
 * @param {Object} object
 * @param {Object} errors
 */
export const buildFromObj = (object, errors = {}) => ({
  init: false,
  name: 'form',
  form: object,
  errors: _.groupBy(errors, 'path'),
});

/**
 * @param {Object} object
 * @param {Object} errors
 */
export const buildFromModel = (object, errors = {}) => ({
  init: true,
  name: 'form',
  form: Object.keys(object).reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
  errors,
});
