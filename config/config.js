require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "port": process.env.PORT,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT || 'mysql'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "port": process.env.PORT || 3306,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}

