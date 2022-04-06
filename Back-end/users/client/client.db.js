const  {pool} =require("../../config/dbconfig");

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

const getClientById = async (id) => {
  try {
    const { rows: clients } = await pool.query(
      `select id FROM client 
      WHERE userid = $1`,
      [id]
    );

    console.log("db id: ",clients);
    return clients[0].id;
  } catch (error) {
    throw error;
  }
}

const getLanguages = async () =>{
  console.log('lang DB');
  try {
    const {rows: language} = await pool.query(
      `SELECT * FROM language`
    )
  } catch (error) {
    throw error
  }
}

// clientID integer,
// 	intepreterID integer,
// 	date_ date,
// 	time_ time,
// 	status boolean,

const createBookingDb = async ({clientID, intepreterID, date_, time_, status}) => {
  try {
    console.log("DB booking");
    const {rows:booking}= await pool.query(
     `INSERT INTO booking(clientID, intepreterID, date_, time_, status)
      VALUES($1,$2,$3,$4,$5) 
      returning id, clientID, intepreterID, date_, time_, status, created_at, updated_at`,
      [clientID, intepreterID, date_, time_, status]);

   return booking[0];

   } catch (error) {
    console.log("Error DB booking");
     console.log(error);
     throw new Error(error.detail||"failed to book");
   }
}

const deleteBookingDb = async (id) => {
  try {
    const {rows:booking}= await pool.query(
      `DELETE FROM booking WHERE id=$1 `,
      [booking.id]
    )
   return {bookings:booking[0]};

   } catch (error) {
     console.log(error.detail);
     throw new Error(error||"failed to delete booking");
   }
}
module.exports={
    deleteClientDb,
    updateClientDb,
    getAllClientDb,
    getClientById,
    createClientDb,
    deleteBookingDb,
    createBookingDb,
    getLanguages
}