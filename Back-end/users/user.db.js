const {pool} = require("../config/dbconfig");

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("select * from users");
  return users;
};

const getUserByIdDb = async (id) => {
  const { rows: user } = await pool.query(
    "select users.* from users where users.ID = $1",
    [id]
  );
  return user[0];
};

const getUserByEmailDb = async (email) => {
  const {rows : exists} =await pool.query(
    "select users.* from users where lower(email) = lower($1) ",
    [email]
  )
  return exists? exists[0]: false;
};

const changeUserPasswordDb = async (hashedPassword, email) => {
  return await pool.query("update users set password = $1 where email = $2", [
    hashedPassword,
    email,
  ]);
};

const createUserDb=async({ name, passwordhash, email, lastname,role})=>{
  try {
    const usr= await pool.query(
      `INSERT INTO users(name, passwordhash, email, lastname, role)
       VALUES($1, $2, $3, $4, $5) 
       returning ID, name, email, lastname, role, created_at`,
   [name, passwordhash, email, lastname,role]);
    const myuser=usr.rows[0];
     return myuser;
    }catch(err){
      console.log(err);
      throw new Error(err);
    }
}
module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  changeUserPasswordDb,
  createUserDb
};
