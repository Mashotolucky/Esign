require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorCodes } = require('../helpers/constants');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);  
      req.user = {
        id: decodedToken.userId,
        role: decodedToken.userRole,
      };
      next();
    } catch (err) {
      res.status(401).json({
        message: err || 'Invalid token ',
      });
    }
  } else {
    res.status(401).json({
      message: 'Authorization header missing',
    });
  }
};

const generateToken = async(data) => {
  console.log(process.env.SECRET_KEY);
  return jwt.sign({ userId:data.userId, userRole: data.userRole }, process.env.SECRET_KEY,{ expiresIn: '1h' })
};
module.exports = { verifyJWT, generateToken };