require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  process.env.PORT || 3306,
  {
    dialect: process.env.DIALECT || "mysql",
    host: process.env.HOST,
    // operatorAliases: false,
  }
);
try {
  sequelize.authenticate();
  console.log("Connection has been established.");
} catch (error) {
  console.log("Unable to connect to the database", error);
}

module.exports = sequelize;
