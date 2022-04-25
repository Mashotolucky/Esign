const {pool} = require('../config/dbconfig');
//bookings
const GetAllBookingsDb=async () => {
    try{
    
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
    
      const { rows: booking } = await pool.query(`
      select booking.id, booking.clientid, booking.intepreterid, booking.date_, booking.time_ ,booking.status,
      users.name, users.lastname 
      FROM booking, client ,users
         WHERE booking.intepreterid = $1 
         AND booking.clientid = client.id
         AND users.id = client.userId
         AND booking.status IS NULL`,[id]);
      return booking;
    } catch (error) {
      console.log("err",error);
      throw error; 
    }
  };

  const getIntepreterStreamDb=async (id) => {
    try {
      
      const { rows: booking } = await pool.query(`
      select booking.id, booking.clientid, booking.intepreterid, booking.date_, booking.time_ ,booking.status,
      users.name, users.lastname 
      FROM booking, client ,users
         WHERE booking.intepreterid = $1 
         AND booking.clientid = client.id
         AND users.id = client.userId
         AND booking.status = true`,[id]);
      return booking;
    } catch (error) {
      console.log("err",error);
      throw error; 
    }
  };

  const getClientStreamDb=async (id) => {
    try {
      
      const { rows: booking } = await pool.query(`
      select booking.id, booking.clientid, booking.intepreterid, booking.date_, booking.time_ ,booking.status,
      users.name, users.lastname 
      FROM booking, intepreter ,users
         WHERE booking.clientid = $1 
         AND booking.intepreterid = intepreter.id
         AND users.id = intepreter.userId
         AND booking.status = true`,[id]);
      return booking;
    } catch (error) {
      console.log("err",error);
      throw error; 
    }
  };

  const getClientBookingDb=async (id) => {
    try {
      
      const { rows: booking } = await pool.query(`
      select * FROM booking,client,users  
         WHERE booking.clientid = $1 
         AND booking.intepreterid = intepreter.id
         AND users.id = client.userId`,[id]);
      return booking;
    } catch (error) {
      console.log("CLIENTerr",error);
      throw error; 
    }
  };


  const createBookingDb = async ({clientID, intepreterID, date_, time_, status}) => {
    console.log({clientID, intepreterID, date_, time_, status});
    try {
      
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
  
  const getAllClientBookingDb = async (id) => {
  
    try {
      
      const {rows:booking}= await pool.query(
        `select * FROM booking,intepreter,users  
         WHERE booking.clientid = $1 
         AND booking.intepreterid = intepreter.id
         AND users.id = intepreter.userId`,
        [id]
      )
     return {bookings:booking};
  
     } catch (error) {
       console.log(error.detail);
       throw new Error(error||"failed to get bookings");
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

  const setBookingStatusdb = async(data)=>{
    try {
      const {rows:booking}= await pool.query(
        `UPDATE booking SET status = $1 WHERE id = $2
        RETURNING id, status, date_, time_, created_at, updated_at`,
        [data.status, data.id]
      )
     return {bookings:booking[0]};
  
     } catch (error) {
       console.log(error.detail);
       throw new Error(error||"failed to update booking status");
     }
  }
  module.exports={
    createBookingDb,
    GetAllBookingsDb,
    getIntepreterBookingDb,
    getIntepreterStreamDb,
    getClientStreamDb,
    getBookingDb,
    getAllClientBookingDb,
    getClientBookingDb,
    deleteBookingDb,
    setBookingStatusdb
  }