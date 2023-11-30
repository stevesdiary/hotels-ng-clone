'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Facilities.init({
    facility_id: DataTypes.UUIDV4,
    hotel_id: DataTypes.UUIDV4,
    restaurant: DataTypes.STRING,
    bar_launge: DataTypes.BOOLEAN,
    security: DataTypes.BOOLEAN,
    wifi_internet: DataTypes.BOOLEAN,
    swimming_pool: DataTypes.BOOLEAN,
    dstv: DataTypes.BOOLEAN,
    gym: DataTypes.BOOLEAN,
    cctv: DataTypes.BOOLEAN,
    car_hire: DataTypes.BOOLEAN,
    room_service: DataTypes.BOOLEAN,
    front_desk_24h: DataTypes.BOOLEAN,
    electricity_24h: DataTypes.BOOLEAN,
    car_park: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Facilities',
  });
  return Facilities;
};