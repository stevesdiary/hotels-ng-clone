// const { UUID, UUIDV4 } = require('sequelize');
const { v4: uuidv4 } = require("uuid");
const { User } = require('../models');

exports.createUser = async (req, res) => {
    try{
        const { first_name, last_name, phone_number, email, address, type } = req.body;
        const id = uuidv4();
        
        console.log(id, first_name, last_name, phone_number, email, type);
        const user_record = await User.create({ id, first_name, last_name, phone_number, email, address, type });
        console.log("User created", user_record);
        return res.status(201).send({message: `User record for ${first_name} has been created successfully`, user_record})

    }catch(err) {
        console.log(err)
        return res.status(500).send({message: "An error occoured!", err});
    }
}
