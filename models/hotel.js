/** 
 *
*/

"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Room, { foreignKey: 'hotelId', type: DataTypes.UUID, as: 'rooms' });
      Hotel.hasMany(models.Facility, { foreignKey: 'hotelId', type: DataTypes.UUID, as: 'facilities' });
      // Hotel.hasMany(models.Media_file, { foreignKey: 'hotelId', type: DataTypes.UUID });
      Hotel.hasMany(models.RatingAndReview, { foreignKey: 'hotelId', type: DataTypes.UUID, as: 'ratingAndReview' });
      Hotel.hasMany(models.Reservation, { foreignKey: 'hotelId', type: DataTypes.UUID, as: 'reservation' });
    }
  }

  Hotel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hotelType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numberOfRooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPhone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      termsAndCondition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Hotels",
      modelName: "Hotel",
      paranoid: true,
      
    }
  );

  return Hotel;
};
