// import i18next from 'i18next';

export default (app) => ({
  route(name) {
    return app.reverse(name);
  },
  t(key) {
    return key;
  },
  isSignedIn() {

  }
});
