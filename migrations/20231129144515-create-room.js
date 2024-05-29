'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      hotelId: {
        type: Sequelize.UUID
      },
      category: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      checkIn: {
        type: Sequelize.TIME
      },
      checkOut: {
        type: Sequelize.TIME
      },
      description: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.BOOLEAN
      },
      discount :{
        type: Sequelize.FLOAT
      },
      discountCode :{
        type: Sequelize.STRING
      },
      deals: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      condition: {
        type: Sequelize.STRING
      },
      additionalRequest: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};