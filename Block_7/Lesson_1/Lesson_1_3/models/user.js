'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
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
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
