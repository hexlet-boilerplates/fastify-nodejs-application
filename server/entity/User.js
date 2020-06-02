// @ts-check

import encrypt from '../lib/secure.js';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      passwordDigest: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.VIRTUAL,
        set(value) {
          const passwordDigest = encrypt(value);
          this.setDataValue('password', value);
          this.setDataValue('passwordDigest', passwordDigest);
        },
        validate: {
          notEmpty: true,
          isLongEnough(value) {
            if (value.length < 3) {
              throw new Error('Password must be at least 3 characters long');
            }
          },
        },
      },
    },
  );

  return User;
};
