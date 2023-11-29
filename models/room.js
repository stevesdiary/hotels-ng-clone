'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      room_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      hotel_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("regular", "vip", "luxury", "conference", "hall"),
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