module.exports = {
    errorCodes: {
      NOT_ADMIN: 1001,
      NOT_USER: 1002,
      NOT_AUTHORIZED: 1003,
      NOT_CLIENT:1004,
      NOT_INTEPRETER:1005,
      NO_AUTH_HEADER: 5001,
      INVALID_TOKEN: 5002,
      DB_ERROR: 2001,
      ALREADY_PROCESSED: 3001,
    },
    roles: {
      USER: 'USER',
      CLIENT:'CLIENT',
      INTEPRETER:'INTEPRETER',
      ADMIN: 'ADMIN',
    },
  };