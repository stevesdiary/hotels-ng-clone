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
      Reservation.hasMany(models.Hotel, {foreignKey: 'id', type: DataTypes.UUID, });
      Reservation.hasMany(models.User, {foreignKey: 'id', type: DataTypes.UUID });
      Reservation.hasMany(models.Room, {foreignKey: 'id', type: DataTypes.UUID });
    }
  }
  Reservation.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    hotel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Hotel must not be empty"
        }
      }
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Room must not be empty"
        }
      }
    },
    date: DataTypes.DATE,
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