const  express = require ("express");
const  Sequelize = require("sequelize");
const mysql = require('mysql2');
const cors = require ("cors");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.LOCAL_PORT || 3000 ;

require('dotenv').config();

const connection = mysql.createConnection({
   host: process.env.HOST,
   port: process.env.PORT,
   user: process.env.USERNAME,
   password: process.env.PASSWORD,
   database: process.env.DATABASE
})

connection.connect((err) => {
   if (err)throw err;
   console.log('Connected to MYSQL server')
})

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send("Description.")
})




app.listen(port, async() => {
   console.log('App running on port: '+ port)
})