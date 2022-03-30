const pool = require("../config");

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("select * from users");
  return users;
};

const getUserByIdDb = async (id) => {
  const { rows: user } = await pool.query(
    "select users.* from users where users.ID = $1",
    [id]
  );//0581
  return user[0];
};

const getUserByEmailDb = async (email) => {
 
  const exists =await pool.query(
    "select users.* from users where lower(email) = lower($1) ",
    [email]
  );

  return exists.rows[0]? exists.rows[0]: false;
};

const changeUserPasswordDb = async (hashedPassword, email) => {
  return await pool.query("update users set password = $1 where email = $2", [
    hashedPassword,
    email,
  ]);
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  changeUserPasswordDb,
};
