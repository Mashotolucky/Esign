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
const getuserByIntepreterIdDb = async (id) => {
  const { rows: user } = await pool.query(
    `select users.* intepreter.* from intepreter,users
     where users.ID = intepreter.userID 
     AND  intepreter.id=$1`,
    [id]
  );
  return user[0];
};
const getUserByClientIdDb = async (id) => {
  const { rows: user } = await pool.query(
    `select users.* client.* from client,users
     where users.ID = client.userID 
     AND  client.id=$1`,
    [id]
  );
  return user[0];
};

// const getLanguagesDb = async () => {
//   const {rows : languages} =await pool.query(
//     "select language.* from language",
//   )
//   return languages;
// };

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
const createUserDb=async({ name, passwordhash, email, lastname,role, image_url})=>{
  try {
    const usr= await pool.query(
      `INSERT INTO users(name, passwordhash, email, lastname, role,image_url)
       VALUES($1, $2, $3, $4, $5,$6) 
       returning ID, name, email,image_url, lastname, role, created_at`,
   [name, passwordhash, email, lastname,role,image_url]);
    const myuser=usr.rows[0];
     return myuser;
    }catch(err){
      console.log(err);
      throw new Error(err);
    }
}

const createResetTokenDb = async ({ email, expireDate, fpSalt }) => {
  await pool.query(
    "insert into public.\"resetTokens\" (email, expiration, token) values ($1, $2, $3)",
    [email, expireDate, fpSalt]
  );

  return true;
};
const setTokenStatusDb = async (email) => {
  await pool.query(
    "update public.\"resetTokens\" set used = $1 where email = $2",
    [true, email]
  );

  return true;
};
const deleteResetTokenDb = async (curDate) => {
  await pool.query("delete from public.\"resetTokens\" where expiration <= $1", [
    curDate,
  ]);
  return true;
};
module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  changeUserPasswordDb,
  createUserDb,
  createResetTokenDb,
  setTokenStatusDb,
  deleteResetTokenDb,
  // getLanguagesDb,
  getuserByIntepreterIdDb,
  getUserByClientIdDb
};
