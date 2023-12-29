const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const authentication = async (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  let token = req.headers.authorization
  if (!token) {
      return res.send("Provide correct token first!")
  }
  token = authHeader && authHeader.split(' ')[1];
  if(token == null || token !== token){ 
    return res.status(401).json({message: 'Unauthorized or wrong token!'})
  }
  try{
    const decoded = jwt.verify(token, secret, (err, user));
    console.log("DECODED USER DATA ", decoded);
    if(decoded.UserInfo){
      req.email = decoded.UserInfo.email;
      req.type = decoded.UserInfo.type;
      next();
    }
    else{
      return res.status(403).send({
        message: 'Invalid or expired token, or some error occurred'
      });
    }
  }
  catch(err){
    return res.status(500).send({Message: 'An error occoured', Error: err})
  }
}

module.exports = {authentication};