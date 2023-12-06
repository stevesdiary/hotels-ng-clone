'use strict';
const {
    Model, DataTypes
} = require('sequelize');
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
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull:false,
            },
            phone_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('guest', 'regular', 'premium'),
                allowNull: true,
            }
    }, {
        sequelize,
        tableName: 'user',
        modelName: 'User',
        paranoid: true,
        pluralize: false
    });
    return User;
};