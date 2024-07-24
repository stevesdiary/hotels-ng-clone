const express = require("express");
const router = express.Router();
const saltRounds = 11;
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

router.post("/forgot", async (req, res, next) => {
  try {
    let { email } = req.body;
    const token = uuidv4();
    const options = { expiresIn: "12m" };
    const payload = {
      email,
    };
    const signedToken = jwt.sign(payload, process.env.JWT_SECRET, options);
    const url = process.env.PUBLIC_URL
    console.log("Signed token at forgot password: ", signedToken);
    console.log("UUID at forgot password: ", token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const link = `${url}/resetPassword/${signedToken}`;
    console.log(link);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: `Click <a href="${link}">here</a> to reset your password. or open this link in your browser ${link}`,
    };
    await transporter.sendMail(mailOptions);
    console.log(
      "Password reset link has ben sent to " +
        email +
        ", the link will expire in 10 minutes"
    );
    return res
      .status(200)
      .send("User: Password reset link has been sent to " + email);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
