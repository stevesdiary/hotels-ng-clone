'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingAndReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  RatingAndReview.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      hotelId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reviewTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: DataTypes.DATE,
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      overallRating: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      location: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "RatingsAndReviews",
      modelName: "RatingAndReview",
      paranoid: false,
    }
  );
  return RatingAndReview;
};