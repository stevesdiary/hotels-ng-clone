const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const authentication = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log("No auth header here!");
      return res.status(401).send("Provide correct token first!")
  }
  const token = authHeader.split(' ')[1];
  if(token == null){ 
    return res.status(401).json({message: 'Unauthorized or wrong token!'})
  }
  try{
    const decoded = jwt.verify(token, secret);
    if(decoded){
      req.email = decoded.email;
      req.type = decoded.type;
      next();
    }
    else{
      return res.status(403).send({
        message: 'Invalid or expired token, or some error occurred'
      });
    }
  }
  catch(err){
    console.log(err, err.message);
    return res.status(500).send({Message: 'An error occoured', Error: err.message})
  }
}

module.exports = { authentication };