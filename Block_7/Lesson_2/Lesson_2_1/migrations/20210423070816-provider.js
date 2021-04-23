'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'provider', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'local',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'provider');
  },
};
