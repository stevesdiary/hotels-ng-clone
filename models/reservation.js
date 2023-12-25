'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.Hotel, {foreignKey: 'hotel_id', type: DataTypes.UUID });
      Reservation.belongsTo(models.User, {foreignKey: 'user_id', type: DataTypes.UUID });
      Reservation.belongsTo(models.Room, {foreignKey: 'room_id', type: DataTypes.UUID });
    }
  }
  Reservation.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    hotel_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Hotel must not be empty"
        }
      }
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Room must not be empty"
        }
      }
    },
    date_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_out: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    payment_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: "Reservation",
    modelName: 'Reservation',
    pluralize: false,
    paranoid: true,
  });
  return Reservation;
};