'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      email: {
        field: 'email',
        allowNull: false,
        unique: true,
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
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Password is required',
          },
          notEmpty: {
            args: true,
            msg: 'Password is empty',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
      socialId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
