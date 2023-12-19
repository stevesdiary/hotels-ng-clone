const RoomEntity = require('./roomEntity');

const { DataTypes } = require('sequelize');
const dbConfig = require('sequelize');
const { Sequelize } = require('../models');

class RoomEntity {
    /** @type {import('sequelize').Model} */

    roomModel = {};
    constructor() {
      /** @type {import('sequelize').Model} */

      const Room =  dbConfig.define('Room', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        hotel_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        category: {
          type: DataTypes.ENUM("regular", "luxury", "conference", "hall"),
          allowNull: false,
          defaultValue: "regular",
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        check_in: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        check_out: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        availability: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        condition: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'room',
        modelName: "Room",
        paranoid: true,
        pluralize: false,
      }
    );
    return Room;
  };
}
