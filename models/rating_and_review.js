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
      // Rating_and_review.belongsToMany(models.Hotel, {foreignKey: hotel_id, as: 'rating'});
      // RatingAndReview.belongsTo(models.Hotel, { foreignKey: 'hotel_id' });
    }
  }
  RatingAndReview.init(
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
      tableName: "RatingAndReview",
      modelName: "RatingAndReview",
      paranoid: true,
    }
  );
  return RatingAndReview;
};