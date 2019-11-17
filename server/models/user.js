import encrypt from '../lib/secure';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      passwordDigest: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.VIRTUAL,
        set(value) {
          const passwordDigest = encrypt(value);
          this.setDataValue('password', value);
          this.setDataValue('passwordDigest', passwordDigest);
        },
        validate: {
          isLongEnough(value) {
            if (value.length < 3) {
              throw new Error('Password must be at least 3 characters long');
            }
          },
        },
      },
    },
    {
      getterMethods: {
        fullName() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  );

  return User;
};
