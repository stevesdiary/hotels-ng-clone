const HotelEntity = require("./hotelEntity");

const { DataTypes } = require("sequelize");
const dbConfig = require("sequelize");
const { Sequelize } = require("../models");

class HotelEntity {
  
  /** @type {import('sequelize').Model} */

  hotelModel = {};

  constructor() {
    /** @type {import('sequelize').Model} */

    const Hotel = dbConfig.define('Hotel', {

      id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          unique: true,
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
        pluralize: false,
        underscored: true,
      }
    );
  
    return Hotel;
    }

}

module.exports = HotelEntity.hotelModel;
