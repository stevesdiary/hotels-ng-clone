const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const tokenExpiry = process.env.TOKEN_EXPIRY || '5hours';
const loginController = {
  login: async (req, res) => {
    try{
      const sessions = {}
      const session_id = uuidv4();
      const {email, password } = req.body;
      const userData = await User.findOne({ where: { email: email } });
      if (!userData) {
        return res.status(404).send({ Message: "Email is not correct or not found!" });
      }
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!passwordMatch) {
        return res.status(401).send({ Message: "Password is not correct, please provide the correct password." });
      } 
      const user = await User.findOne({ where: { email }});
      const id = user.id;
      const first_name = user.first_name;
      const last_name = user.last_name;
      const type = user.type;
      const UserInfo = {
        id: id,
        email: userData.email,
        type: user.type
      }
      const accessToken = jwt.sign(UserInfo, process.env.JWT_SECRET, {expiresIn: tokenExpiry});
      sessions[session_id] = { email, user_id: id }
      res.set('Set-Cookie', `session=${session_id}`);
      return res.status(200).json({
        statusCode: 200,
        id,
        email: sessions.email,
        first_name,
        last_name,
        type,
        token: accessToken,
      });

    }
    catch(err){
      console.log('error occured' , err);
      return res.status(500).send({Message: `User ${email}unable to login`, Error: err})
    }
  },

  logout: async (req, res) => {
    try {
      const session_id = req.headers.cookie;
      if (session_id) {
        await redisClient.del(session_id);
        res.clearCookie('session');
      }
      return res.status(200).send('Bye 👋, you have successfully logged out')
    } catch (error) {
      return res.status(500).send({ message: 'An error occoured', error })
    }
  }
  
}

module.exports = loginController;
