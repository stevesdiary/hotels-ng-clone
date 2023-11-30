'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facility_id: {
        type: Sequelize.UUIDV4
      },
      hotel_id: {
        type: Sequelize.UUIDV4
      },
      restaurant: {
        type: Sequelize.STRING
      },
      bar_launge: {
        type: Sequelize.BOOLEAN
      },
      security: {
        type: Sequelize.BOOLEAN
      },
      wifi_internet: {
        type: Sequelize.BOOLEAN
      },
      swimming_pool: {
        type: Sequelize.BOOLEAN
      },
      dstv: {
        type: Sequelize.BOOLEAN
      },
      gym: {
        type: Sequelize.BOOLEAN
      },
      cctv: {
        type: Sequelize.BOOLEAN
      },
      car_hire: {
        type: Sequelize.BOOLEAN
      },
      room_service: {
        type: Sequelize.BOOLEAN
      },
      front_desk_24h: {
        type: Sequelize.BOOLEAN
      },
      electricity_24h: {
        type: Sequelize.BOOLEAN
      },
      car_park: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Facilities');
  }
};