// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => ({
  route(name) {
    return app.reverse(name);
  },
  t(key) {
    return i18next.t(key);
  },
  _,
  getAlertClass(type) {
    switch (type) {
      case 'error':
        return 'border-red-300 bg-red-50 text-red-900';
      case 'success':
        return 'border-green-300 bg-green-50 text-green-900';
      case 'info':
        return 'border-blue-300 bg-blue-50 text-blue-900';
      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },
  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  },
});
