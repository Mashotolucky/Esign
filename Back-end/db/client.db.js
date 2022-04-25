const  {pool} =require("../config/dbconfig");

const createClientDb=async({userID,langID} )=>{
    try {
     const client= await pool.query(
      `INSERT INTO client(langID,userID)
       VALUES($1,$2) 
       returning langID, userID`,[langID,userID]);
      const myclient=client.rows[0];
 
     const { rows : results }= await pool.query("select * from client,users where users.id= client.userid and users.id= $1",[myclient.userid]);
     return results;

    } catch (error) {
      console.log(error.detail);
      throw new Error(error||"client/user already exist");
    }
};
const deleteClientDb = async (id) => {
    try {
      const { rows: user } = await pool.query(
        "DELETE FROM users where ID = $1 returning *",
        [id]
      );
      const {rows:client} = await pool.query(
          `DELETE FROM client WHERE userID=$1 `,
      [user[0].ID]);
  
    
    return {usr:user[0],client:client[0]};
    } catch (error) {
      throw error;
    }

};
const updateClientDb = async ({
    name,
    email,
    lastname,
    id,
    payment_method,
	  langID 
  }) => {
      try {
        const { rows: user } = await pool.query(
          `UPDATE users set name = $1, email = $2, lastname = $3
            where ID = $5 returning name, email, lastname, ID`,
          [name, email, lastname, id]
        );
        const myuser=user[0];
       
        const {rows:client} = await pool.query(
            `UPDATE client set payment_method=$1,langID=$2 WHERE userID=$4 `,
        [payment_method,langID , myuser.ID]);
    
    
        return {myuser,client:client[0]}
      } catch (error) {
          throw error;
      }

};
const getAllClientDb=async () => {
    try {
      const { rows: clients } = await pool.query(
        `select * FROM users, client 
        WHERE users.id = client.id`
      );
      return clients;
    } catch (error) {
      throw error;
    }
}
const getClientDb = async (id) => {
  try {
    const { rows: clients } = await pool.query(
    `select id FROM client 
      WHERE userid = $1`,
      [id]
    );
    return clients[0].id;
  } catch (error) {
    throw error;
  }
}
const getLanguagesdb = async () =>{
  console.log('lang DB');
  try {
    const {rows: language} = await pool.query(
      `SELECT * FROM language`
    )
    return language;
  } catch (error) {
    throw error
  }
}

module.exports={
    deleteClientDb,
    updateClientDb,
    getAllClientDb,
    getClientDb,
    createClientDb,
    getLanguagesdb
}