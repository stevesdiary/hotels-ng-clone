const Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    dialect: process.env.DIALECT || 'mysql',
    host: process.env.HOST
});
try {
    console.log("Did you get this?")
    sequelize.authenticate();
    console.log('Connection has been established.');
} catch (error) {
    console.log('Unable to connect to the database', error);
}

module.exports = sequelize;