const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("pasword: ",hashedPassword);
  return hashedPassword;
};

const comparePassword = async (password,passwordHash) => {
  return await bcrypt.compare(password, passwordHash)
};

module.exports = { hashPassword, comparePassword };
