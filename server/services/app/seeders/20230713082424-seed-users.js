'use strict';
const { hashPassword } = require("../helpers/bcryptHelper")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../db.json").users.map(e => {
      delete e.id
      e.password = hashPassword(e.password)
      return e
    })

    await queryInterface.bulkInsert("Users", data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users")
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
