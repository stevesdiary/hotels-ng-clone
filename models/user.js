"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Reservation, {
        foreignKey: "user_id",
        type: DataTypes.UUID,
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name cannot be empty.",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name cannot be empty.",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isPhoneNumber(value) {
            // Implement your custom phone number validation logic
            const phoneRegex = /^\d{11}$/; // Example: Allow only 10-digit numbers
            if (!phoneRegex.test(value)) {
              throw new Error('Invalid phone number format, include the country code');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email format',
        },
      },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty',
          },
          isStrongPassword: (value) => {
            // Custom validation function for a strong password
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value)) {
              throw new Error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.');
            }
          },
        },
      },
      type: {
        type: DataTypes.ENUM("guest", "regular", "premium", "admin"),
        allowNull: true,
        defaultValue: "regular",
      },
    },
    {
      sequelize,
      tableName: "user",
      modelName: "User",
      paranoid: true,
      pluralize: false,
    }
  );
  return User;
};
