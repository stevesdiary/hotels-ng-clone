const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const saltRounds = bcrypt.genSaltSync(11);
const registerController = {
  registerUser: async (req, res) => {
    try{
      const { first_name, last_name, phone_number, email, password, confirm_password, type } = req.body;
      const id = uuidv4();
      console.log(email, "EMAIL", first_name);
      const userExists = await User.findOne({ where: {email} });
      
      if(userExists && userExists.length > 0){
        return res.status(409).json({ message: `User ${first_name} already exists, you can login with your password.`});
      }
      if (password !== confirm_password) {
        res.status(409).send({message: 'Password do not match, check and try again.'})
      }
      if(password == confirm_password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const user_record = await User.create({ id, first_name, last_name, phone_number, email, password: hashedPassword, type });
      // console.log("User created", user_record);
      return res.status(201).send({ message: `User record for ${first_name} has been created successfully`, user_record })
      }
    }catch(err) {
      console.log(err)
      return res.status(500).send({message: "An error occoured!", err});
    }
  }
}

module.exports = registerController;