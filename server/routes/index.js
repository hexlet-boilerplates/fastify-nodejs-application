import welcome from './welcome';
import users from './users';
import session from './session';

const controllers = [
  welcome,
  users,
  session,
];

export default (app) => controllers.forEach((f) => f(app));
