'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      // non unique because a user may use thje same email across all his social networks!
      email: {
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Email is required',
          },
          notEmpty: {
            args: true,
            msg: 'Email is empty',
          },
        },
      },
      password: {
        field: 'password',
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
      socialId: {
        type: DataTypes.STRING,
      },
      provider: {
        type: DataTypes.STRING,
        defaultValue: 'local',
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
