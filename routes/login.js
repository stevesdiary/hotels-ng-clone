const express = require("express");
// const { admin } = require('../models/admin');
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { authentication } = require("../middleware/authentication");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ where: { email: email } }).catch(
    (err) => {
      console.log("Errror: ", err);
    }
  );

  if (!userData)
    // console.log('User not found: ', userEmail);
    return res.status(404).send({ Message: "Email not found!" });

  const match = await bcrypt.compare(password, userData.password);
  console.log(userData.password, match, password);
  if (!match) {
    return res.status(401).send({ Message: "Password is not correct!" });
  }

  const user = await User.findOne({ where: { email } });
  const id = user.id;
  const first_name = user.first_name;
  const last_name = user.last_name;
  const type = user.type;
  const accessToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10,
      UserInfo: {
        admin_id: admin_id,
        email: userData.email,
        role: user.type,
      },
    },
    process.env.JWT_SECRET
  );
  console.log(email + " logged in as " + role);

  return res.status(200).json({
    statusCode: 200,
    visitor_id: admin.visitor_id,
    first_name: first_name,
    last_name: last_name,
    type: type,
    token: accessToken,
  });
});

module.exports = router;
