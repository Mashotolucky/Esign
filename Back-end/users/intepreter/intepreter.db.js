const {pool} = require('../../config/dbconfig');

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
const getAllIntepretersDb=async () => {
  try {
    const { rows: intepreters } = await pool.query(
      `select * FROM users, intepreter
        WHERE users.id = intepreter.userid`
    );
    console.log("kill",intepreters);
    return intepreters;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
//bookings
const GetAllBookingsDb=async () => {
  try {
    console.log("booking DB");
    const { rows: bookings } = await pool.query(`select * FROM booking`);
  
    return bookings;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

const getBookingDb=async (id) => {
  try {
    const { rows: booking } = await pool.query(`select * FROM bookings WHERE ID = $1`,[id]);
    return booking;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

const getIntepreterBookingDb=async (id) => {
  try {
    const { rows: booking } = await pool.query(`select * FROM booking WHERE intepreterid = $1`,[id]);
    
    return booking;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
const setOnilineDb=async (status,id) => {
  try {
    const { rows: booking } = await pool.query(`update intepreter set online_status = $1 WHERE userID = $2`,[status,id]);
    return booking;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
module.exports={
  deleteInteprterDb,
  updateIntepreterDb,
  getAllIntepretersDb,
  createIntepreterDb,
  GetAllBookingsDb,
  getBookingDb,
  getIntepreterBookingDb
}