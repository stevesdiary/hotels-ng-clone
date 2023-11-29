'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Media_file.init(
    {
      file_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      hotel_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      file_url: DataTypes.STRING,
      allowNull: false,
    },
    {
      sequelize,
      tableName: "media_file",
      modelName: "Media_file",
      paranoid: true,
      pluralize: false,
    }
  );
  return Media_file;
};