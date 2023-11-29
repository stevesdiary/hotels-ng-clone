'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hotel.init({
    hotel_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.INTEGER,
    allowNull: false
  },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'hotel',
    modelName: 'Hotel',
    paranoid: true,
    pluralize: false,
  });
  return Hotel;
};