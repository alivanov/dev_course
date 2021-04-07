"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@mail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Bob",
          lastName: "Brown",
          email: "bob@mail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "John",
          lastName: "Smith",
          email: "j.smith@mail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  }
};
