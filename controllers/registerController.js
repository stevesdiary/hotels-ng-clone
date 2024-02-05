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
      if (userRecord) {
        const sanitizedUser = await User.findByPk(userRecord.id, {
          attributes: { exclude: ['password'] },
        }); 
        return res.status(201).json({ Message: `User ${firstName} created successfully`, User: sanitizedUser });
      }
      

      // return res.status(201).send({ 
      //   Message: `User record for ${firstName} has been created successfully`, 
      //   RESULT: (
      //     userRecord.id, 
      //     userRecord.firstName, 
      //     userRecord.lastName, 
      //     userRecord.gender, 
      //     userRecord.phoneNumber, 
      //     userRecord.email, 
      //     userRecord.type
      //   )
      // });
      }
    }catch(err) {
      console.log(err)
      return res.status(500).send({message: "An error occoured!", Error: ( err.type, err.message ) });
    }
  }
}

module.exports = registerController;