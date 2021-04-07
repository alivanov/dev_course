const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

module.exports = sequelize.define(
  "playlist",
  {
    id: {
      field: "PlaylistId",
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      field: "Name",
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
