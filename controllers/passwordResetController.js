const express = require("express");
const bcrypt = require("bcryptjs");
const saltRounds = 11;
const jwt = require("jsonwebtoken");
const {User} = require("../models");
const passwordResetController = {
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password: newPassword, confirmPassword, email } = req.body;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ tokenDecoded: decoded });

      const decodedEmail = decoded?.email;
      console.log(
        "Here are the decoded details ",
        decodedEmail,
        decoded,
        token
      );

      if (!decodedEmail) {
        return res.status(400).send({
          statusCode: 400,
          message:
            "Oops!, email not found for the specified token, Invalid or expired token.",
        });
      }

      if (email !== decodedEmail) {
        return res.status(401).send("Invalid email");
      }

      if (!newPassword) {
        return res.status(401).send("Password is required");
      }
      if (newPassword !== confirmPassword) {
        res.status(409).send({message: 'Password do not match, check and try again.'});
      }
      
      const hashed = await bcrypt.hash(newPassword, saltRounds);
      User.password = hashed;

      try {
        const user = await User.findOne({ where: { email: decodedEmail } });
        console.log({ user});
        if (!user) {
          return res.status(404).send(`User not found with ${decodedEmail}. You need to register first.`);
        }
        if (user) {
          (user.email = email), (user.password = hashed);
          const saveResult = await user.save();
          console.log({ saveResult });

          console.log("Password updated successfully");
          return res.status(200).send({Message: "Password updated successfully, you can now login with your new password."});
        }

        return res.send({Message: `User not found with ${decodedEmail}`});
      } catch (err) {
        console.error(err);
        return res.send(err.message);
      }
    } catch (err) {
      console.log({ resetPasswordError: err });
      const errorMessage = err?.message;
      return res.send(errorMessage || "Something went wrong", err );
    }
  },
};
module.exports = passwordResetController;
