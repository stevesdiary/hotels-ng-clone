const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const saltRounds = bcrypt.genSaltSync(11);
const registerController = {
  registerUser: async (req, res) => {
    try{
      const { firstName, lastName, phoneNumber, gender, email, password, confirmPassword, type } = req.body;
      const id = uuidv4();
      console.log(email, "EMAIL", firstName);
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(409).json({ Message: `User ${firstName} already exists, you can login with your password.` });
      }
      if (password !== confirmPassword) {
        res.status(409).send({message: 'Password do not match, check and try again.'})
      }
      if(password == confirmPassword) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const userRecord = await User.create({ id, firstName, lastName, phoneNumber,gender, email, password: hashedPassword, type });
      // console.log("User created", user_record);
      return res.status(201).send({ Message: `User record for ${firstName} has been created successfully`, userRecord });
      }
    }catch(err) {
      console.log(err)
      return res.status(500).send({message: "An error occoured!", err});
    }
  }
}

module.exports = registerController;