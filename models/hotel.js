/** 
 *
*/

"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Room, { foreignKey: 'hotel_id', type: DataTypes.UUID, as: 'rooms' });
      Hotel.hasMany(models.Facilities, { foreignKey: 'hotel_id', type: DataTypes.UUID, as: 'facilities' });
      // Hotel.hasMany(models.Media_file, { foreignKey: 'hotel_id', type: DataTypes.UUID });
      Hotel.hasMany(models.RatingAndReview, { foreignKey: 'hotel_id', type: DataTypes.UUID, as: 'ratingAndReview' });
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
      hotel_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_of_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      terms_and_condition: {
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
