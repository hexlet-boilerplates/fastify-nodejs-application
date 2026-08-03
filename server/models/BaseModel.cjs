// @ts-check

const { Model } = require('objection');

module.exports = class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
};
