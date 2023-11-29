'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating_and_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating_and_review.init(
    {
      rate_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      hotel_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      review_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: DataTypes.DATE,
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overall_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cleanliness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comfort: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      security: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "rating_and_review",
      modelName: "Rating_and_review",
      paranoid: true,
      pluralize: false,
    }
  );
  return Rating_and_review;
};