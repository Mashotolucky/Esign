import { pool } from "../../config/dbconfig";

const createClientDb=async({ name, password, email, lastname , cellno,role})=>{
    const usr= await pool.query(
        `INSERT INTO users(name, password, email, lastname, cellno, role)
         VALUES($1, $2, $3, $4, $5,$6) 
         returning user_id, name, email, lastname, cellno, role, created_at`,
     [name, password, email, lastname, cellno,role]);
      const myuser=usr.rows[0];
     return myuser;
}

const deleteclientDb = async (id) => {
    const { rows: user } = await pool.query(
      "DELETE FROM users where ID = $1 returning *",
      [id]
    );

    const {rows:client} = await pool.query(
        `DELETE FROM client WHERE userID=$1 `,
    [user[0].ID]);

  
  return {usr:user[0],client:client[0]};

};

const updateClientDb = async ({
    name,
    email,
    lastname,
    id,cellno,
    payment_method,
	langID 
  }) => {
    const { rows: user } = await pool.query(
      `UPDATE users set name = $1, email = $2, lastname = $3 , cellno= $4
        where ID = $5 returning name, email, lastname, ID`,
      [name, email, lastname, cellno, id]
    );
    const myuser=user[0];
   // return myuser;
   
    const {rows:intepreter} = await pool.query(
        `UPDATE client set payment_method=$1,langID=$2 WHERE userID=$4 `,
    [payment_method,langID , myuser.ID]);


    return {myuser,intepreter:intepreter[0]}

  };

const getAllClientDb=async () => {
    const { rows: clients } = await pool.query(
      `select users.*  client.* FROM client
      join users 
      on users.ID = client.ID`
    );
    return clients;
}

module.exports={
    deleteclientDb,
    updateClientDb,
    getAllClientDb,
    createClientDb
}