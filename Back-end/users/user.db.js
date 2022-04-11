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
const getLanguagesDb = async () => {
  const {rows : languages} =await pool.query(
    "select language.* from language",
  )
  return languages;
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
const createIntepreterDb=async({userID,cert_url,hourly_rate})=>{
  try {

      const intepreter= await pool.query(
        `INSERT INTO intepreter(cert_url,hourly_rate,userID)
        VALUES($1,$2,$3) 
        returning cert_url,hourly_rate,userID,ID `,[cert_url,hourly_rate,userID]);
      const myintepreter=intepreter.rows[0];
      
      return {myintepreter}

  } catch (error) {
    throw error;
  }
};
const updateIntepreterDb = async ({name,email,lastname,id,cert_url,hourly_rate,active_status}) => {
  try {
   const { rows: user } = await pool.query(
     `UPDATE users set name = $1, email = $2, lastname = $3 
       where ID = $5 returning name, email, lastname, ID`,
     [name, email, lastname, id]
   );
   const myuser=user[0];

   const {rows:intepreter} = await pool.query(
       `UPDATE intepreter set cert_url=$1, hourly_rate=$2, active_status=$3 WHERE userID=$4 `,
   [cert_url,hourly_rate,active_status, myuser.ID]);

   return {myuser,intepreter:intepreter[0]}
  } catch (error) {
    throw error;
  }

};

const deleteInteprterDb = async (id) => {
 try {
       const { rows: user } = await pool.query(
         "DELETE FROM users where ID = $1 returning *",
         [id]
       );
       const {rows:intepreter} = await pool.query(
           `DELETE FROM intepreter WHERE userID=$1 `,
       [user[0].ID]);

     return user[0];
 } catch (error) {
   throw error;
 }

};
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
  getLanguagesDb,
  createIntepreterDb,
  updateIntepreterDb,
  deleteInteprterDb
};
