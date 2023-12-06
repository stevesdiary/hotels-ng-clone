'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Media_files', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      file_id: {
        type: Sequelize.UUID
      },
      hotel_id: {
        type: Sequelize.UUID
      },
      room_id: {
        type: Sequelize.UUID
      },
      file_url: {
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
    await queryInterface.dropTable('Media_files');
  }
};