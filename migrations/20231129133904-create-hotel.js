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
      hotel_id: {
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
      hotel_type: {
        type: Sequelize.STRING
      },
      number_of_rooms: {
        type: Sequelize.INTEGER
      },
      contact_email: {
        type: Sequelize.STRING
      },
      contact_phone: {
        type: Sequelize.INTEGER
      },
      terms_and_condition: {
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