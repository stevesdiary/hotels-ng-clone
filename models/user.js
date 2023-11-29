'use strict';
const {
    Model,UUID
} = require('sequelize');
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
            user_id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
                type
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