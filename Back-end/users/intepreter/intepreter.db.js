import { pool } from "../../config/dbconfig";

const createIntepreterDb=async({ name, passwordhash, email, lastname , cellno,role,cert_url,hourly_rate})=>{
    const usr= await pool.query(
        `INSERT INTO users(name, passwordhash, email, lastname, cellno, role)
         VALUES($1, $2, $3, $4, $5,$6) 
         returning ID, name, email, lastname, cellno, role, created_at`,
     [name, passwordhash, email, lastname, cellno,role]);
      const myuser=usr.rows[0];

     const intepreter= await pool.query(
      `INSERT INTO intepreter(cert_url,hourly_rate,userID)
       VALUES($1,$2,$3) 
       returning cert_url,hourly_rate,userID `,
   [cert_url,hourly_rate,myuser.ID]);
   const myintepreter=intepreter.rows[0];
   return {myuser,myintepreter}
};
const updateIntepreterDb = async ({
    name,
    email,
    lastname,
    id,cellno,
    cert_url,hourly_rate,active_status
    
  }) => {
    const { rows: user } = await pool.query(
      `UPDATE users set name = $1, email = $2, lastname = $3 , cellno= $4
        where ID = $5 returning name, email, lastname, ID`,
      [name, email, lastname, cellno, id]
    );
    const myuser=user[0];

    const {rows:intepreter} = await pool.query(
        `UPDATE intepreter set cert_url=$1, hourly_rate=$2, active_status=$3 WHERE userID=$4 `,
    [cert_url,hourly_rate,active_status, myuser.ID]);

    return {myuser,intepreter:intepreter[0]}

};
const deleteInteprterDb = async (id) => {
    const { rows: user } = await pool.query(
      "DELETE FROM users where ID = $1 returning *",
      [id]
    );
    const {rows:intepreter} = await pool.query(
        `DELETE FROM intepreter WHERE userID=$1 `,
    [user[0].ID]);

  return user[0];

};
const getAllIntepretersDb=async () => {
    const { rows: intepreters } = await pool.query(
      `select users.* intepreter.* FROM intepreter
      join users 
      on users.ID = intepreter.ID`
    );
    return intepreters;
};


module.exports={
  deleteInteprterDb,
  updateIntepreterDb,
  getAllIntepretersDb,
  createIntepreterDb
}