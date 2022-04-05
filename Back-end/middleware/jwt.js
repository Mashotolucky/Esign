require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorCodes } = require('../helpers/constants');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    console.log(authHeader);

    console.log("token", token);
    try {
     
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);


      console.log("decode tok",decodedToken);
      req.user = {
        id: decodedToken.userId,
        role: decodedToken.userRole,
      };
      console.log("jwt",req.user);
      next();
    } catch (err) {
      console.log("twt error:",err);
      res.status(401).json({
        errorCode: errorCodes.INVALID_TOKEN,
        message: 'Invalid token',
      });
    }
  } else {
    res.status(401).json({
      errorCode: errorCodes.NO_AUTH_HEADER,
      message: 'Authorization header missing',
    });
  }
};

const generateToken = async(data) => {
  console.log("generate token with :",data);
  console.log(process.env.SECRET_KEY);
  return jwt.sign({ userId:data.userId, userRole: data.userRole }, process.env.SECRET_KEY,{ expiresIn: '1h' })
};


module.exports = { verifyJWT, generateToken };