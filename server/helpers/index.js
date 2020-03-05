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
  isSignedIn() {

  }
});
