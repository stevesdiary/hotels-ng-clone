'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MediaFile.belongsTo(models.Room, { foreignKey: 'room_id' });
    }
  }
  MediaFile.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      hotel_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      file_url: DataTypes.STRING,
      allowNull: false,
    },
    {
      sequelize,
      tableName: "MediaFile",
      modelName: "MediaFile",
      paranoid: true,
    }
  );
  return MediaFile;
};