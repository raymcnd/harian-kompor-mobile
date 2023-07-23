'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Posts', {
        authorMongoId: '64ba12500ddfb4093a526959',
      }, {
        authorId: 1,
      },
    );

    await queryInterface.bulkUpdate('Posts', {
        authorMongoId: '64ba12630ddfb4093a52695a',
      }, {
        authorId: 2,
      },
    );

    await queryInterface.bulkUpdate('Posts', {
        authorMongoId: '64ba12730ddfb4093a52695b',
      }, {
        authorId: 3,
      },
    );

    
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
    await queryInterface.bulkUpdate('Posts', {
      authorMongoId: null,
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
