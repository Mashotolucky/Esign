const { errorCodes, roles } = require('./constants');

const isAdmin = (req, res, next) => {
  const role = req.user.role;
  if (role && role === roles.ADMIN) next();
  else
    res.status(403).json({
      errorCode: errorCodes.NOT_ADMIN,
      message: 'User is not an ADMIN',
    });
};
const isIntepreter = (req, res, next) => {
    const role = req.user.role;
    if (role && role === roles.INTEPRETER) next();
    else
      res.status(403).json({
        errorCode: errorCodes.NOT_INTEPRETER,
        message: 'User is not an interpreter',
      });
  };
const isClient = (req, res, next) => {
  const role = req.user.role;
  if (role && (role === roles.ADMIN || role === roles.CLIENT)) next();
  else
    res.status(403).json({
      errorCode: errorCodes.NOT_CLIENT,
      message: 'User is not an client',
    });
};

const isUserAuthorized = (req, res, next) => {
  const id = req.params.userId || req.body.userId;
  if (req.user.role === roles.ADMIN || id === req.user.id) next();
  else
    res.status(403).json({
      errorCode: errorCodes.NOT_AUTHORIZED,
      message: 'User is not an auhtorized',
    });
};

module.exports = { isAdmin, isClient, isUserAuthorized ,isIntepreter};