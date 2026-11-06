// @ts-check

import { eq } from 'drizzle-orm';
import i18next from 'i18next';
import { users } from '../db/schema.js';
import encrypt from './secure.js';

const minPasswordLength = 3;

export const findByEmail = async (db, email) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
};

export const findById = async (db, id) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
};

export const verifyPassword = (user, password) => encrypt(password) === user.passwordDigest;

export const create = (db, { email, password }) =>
  db.insert(users).values({ email, passwordDigest: encrypt(password) });

/**
 * Возвращает ошибки в виде { поле: [{ message }] }, пустой объект означает валидные данные.
 */
export const validate = async (db, data) => {
  const errors = {};
  const email = data?.email ?? '';
  const password = data?.password ?? '';

  if (email.length === 0) {
    errors.email = [{ message: i18next.t('validation.required') }];
  } else if (await findByEmail(db, email)) {
    errors.email = [{ message: i18next.t('validation.users.emailTaken') }];
  }

  if (password.length < minPasswordLength) {
    errors.password = [{ message: i18next.t('validation.users.passwordLength') }];
  }

  return errors;
};
