import { pool } from "../../config/dbconfig";


const deleteUserDb = async (id) => {
    const { rows: user } = await pool.query(
      "DELETE FROM users where ID = $1 returning *",
      [id]
    );
   ;

     
    const {rows:intepreter} = await pool.query(
        `DELETE FROM intepreter WHERE userID=$1 `,
    [user[0].ID]);

  
  return user[0];

};

const updateUserDb = async ({
    name,
    email,
    lastname,
    id,cellno,
    active_status,
    cert_url,
    hourly_rate
  }) => {
    const { rows: user } = await pool.query(
      `UPDATE users set name = $1, email = $2, lastname = $3 , cellno= $4
        where ID = $5 returning name, email, lastname, ID`,
      [name, email, lastname, cellno, id]
    );
    const myuser=user[0];
   // return myuser;
   
    const {rows:intepreter} = await pool.query(
        `UPDATE intepreter set cert_url=$1 , hourly_rate=$2 , active_status=$3 WHERE userID=$4 `,
    [active_status, cert_url,hourly_rate, myuser.ID]);


    return {myuser,intepreter:intepreter[0]}

};
const getAllIntepretersDb=async () => {
    const { rows: intepreters } = await pool.query(
      `select users.*  intepreter.* FROM intepreter
      join users 
      on users.ID = intepreter.ID`
    );
    return intepreters;
}