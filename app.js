const  express = require ("express");
const  Sequelize = require("sequelize");
const cloudinary = require("cloudinary").v2;
const mysql = require('mysql2');
const fs = require('fs/promises');
const fileUpload = require('express-fileupload');
const cors = require ("cors");
const app = express();
const path = require("path");
const multer = require("multer");
const bodyParser = require('body-parser');
// const { storage } = require("googleapis/build/src/apis/storage");
const port = process.env.LOCAL_PORT || 3000 ;
require('dotenv').config();
const connection = mysql.createConnection({
   host: process.env.HOST,
   port: process.env.PORT,
   user: process.env.USERNAME,
   password: process.env.PASSWORD,
   database: process.env.DATABASE
})
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   secure: true,
});
connection.connect((err) => {
   if (err)throw err;
   console.log('Connected to MYSQL server')
})
const options = {
   use_filename: true,
   unique_filename: false,
   overwrite: false,
};
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));  
   }
});

let upload = multer({
   storage: storage,
   // dest: './uploads/',
   // limits: {fileSize: 1000000},
})
app.get('/', (req, res) => {
   res.send("Description.")
})
app.post('/upload', upload.single('image'), async(req, res) => {
   try {
      let imagePath = "./uploads/" + req.file.filename;
      
      console.log('Upload status', imagePath)
      const result = await cloudinary.uploader.upload(imagePath, options);
      return res.status(200).send({message: "Upload Successful", result: result});
   }
   catch(err) {
      console.log(err)
   }
});

app.listen(port, async() => {
   console.log('App running on port: ' + port)
})