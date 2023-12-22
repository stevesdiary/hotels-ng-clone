'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RatingAndReview', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      hotel_id: {
        type: Sequelize.UUID
      },
      user_id: {
        type: Sequelize.UUID
      },
      review_title: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.STRING
      },
      cleanliness: {
        type: Sequelize.INTEGER
      },
      comfort: {
        type: Sequelize.INTEGER
      },
      service: {
        type: Sequelize.INTEGER
      },
      security: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('RatingAndReview');
  }
};