'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hotelId: {
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      hotelType: {
        type: Sequelize.STRING
      },
      numberOfRooms: {
        type: Sequelize.INTEGER
      },
      contactEmail: {
        type: Sequelize.STRING
      },
      contactPhone: {
        type: Sequelize.INTEGER
      },
      termsAndConditions: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hotels');
  }
};