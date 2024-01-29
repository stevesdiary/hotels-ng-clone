const express = require("express");
// const { admin } = require('../models/admin');
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookie = require('cookie');
const bcrypt = require("bcrypt");
const { authentication } = require("../middleware/authentication");

const loginController = {
  login: async (req, res) => {
    try{
      const {email, password } = req.body;
      const userData = await User.findOne({ where: { email: email } });
      if (!userData) {
        return res.status(404).send({ Message: "Email is not correct or not found!" });
      }
      const passwordMatch = await bcrypt.compare(password, userData.password);
      // console.log(userData.password, passwordMatch, password);
      if (!passwordMatch) {
        return res.status(401).send({ Message: "Password is not correct, please provide the correct password." });
      } 
      const user = await User.findOne({ where: { email }});
      const id = user.id;
      const first_name = user.first_name;
      const last_name = user.last_name;
      const type = user.type;
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: id,
            email: userData.email,
            type: user.type,
          },
        },
        process.env.JWT_SECRET,
        {exiresIn: process.env.LOGIN_EXPIRE},
        // {exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10},
      );
      console.log(`${email} logged in as ${type} user.`);

      return res.status(200).json({
        statusCode: 200,
        id: user.id,
        first_name: first_name,
        last_name: last_name,
        type: type,
        token: accessToken,
      });

    }
    catch(err){
      return res.status(500).send({Message: `User unable to login`, Error: err})
    }
  }
  
}

module.exports = loginController;
