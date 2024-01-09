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
      fileId: {
        type: Sequelize.UUID
      },
      hotelId: {
        type: Sequelize.UUID
      },
      roomId: {
        type: Sequelize.UUID
      },
      fileUrl: {
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