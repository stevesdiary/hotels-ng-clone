const express = require("espress");
const bcrypt = require("bcryptjs");
const saltRounds = 11;
const jwt = require("jsonwebtoken");
const user = require("../models");
const passwordResetController = {
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password: newPassword, email } = req.body;
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

      const user = await Admin.findOne({ where: { email: decodedEmail } });
      if (!user) {
        return res.status(404).send("User not found with " + decodedEmail);
      }

      //Set a new password for the user
      const hashed = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashed;

      try {
        const user = await User.findOne({ where: { email: decodedEmail } });
        console.log({ user});
        if (user) {
          (user.email = email), (user.password = hashed);
          const saveResult = await user.save();
          console.log({ saveResult });

          console.log("Password updated successfully");
          return res.status(200).send("Password updated successfully");
        }

        return res.send("User not found with " + decodedEmail);
      } catch (err) {
        console.log(err.message);
        return res.send(err.message);
      }
      //throw new Error('Something went wrong')
    } catch (err) {
      console.log({ resetPasswordError: err });
      const errorMessage = err?.message;

      return res.send(errorMessage || "Something went wrong");
    }
  },
};
module.exports = passwordResetController;
