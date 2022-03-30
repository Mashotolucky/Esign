const jwt = require('jsonwebtoken');
const { errorCodes } = require('../helpers/constants');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = {
        id: decodedToken.userId,
        role: decodedToken.userRole,
      };
      next();
    } catch (err) {
      console.log(err);
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

const generateToken = async(data) => jwt.sign({ userId: data.id, userRole: data.role }, process.env.SECRET_KEY);


module.exports = { verifyJWT, generateToken };