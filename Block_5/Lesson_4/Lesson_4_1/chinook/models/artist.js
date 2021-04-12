const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

module.exports = sequelize.define(
  "artist",
  {
    id: {
      field: "ArtistId",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      field: "Name",
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        //in case you want to customize the error message
        /* notNull: {
          args: true,
          msg: "Name is missing"
        }, */
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        isAlpha: {
          agrs: true,
          msg: "Name must only contain letters"
        },
        len: {
          args: [2, 10],
          msg: "Name must be between 2 and 10 characters"
        }
      }
    }
  },
  {
    timestamps: false
  }
);
