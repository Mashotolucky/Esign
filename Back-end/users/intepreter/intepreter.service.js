const {
  deleteInteprterDb,
  updateIntepreterDb,
  getAllIntepretersDb,
  createIntepreterDb,
 
  GetAllBookingsDb,
  getBookingDb,
  getIntepreterBookingDb
} = require('./intepreter.db');

const deleteIntepreter = async (id) => {
    try {
      return await deleteInteprterDb(id);
    } catch (error) {
      throw error;
    }
};

 const createIntepreter = async (user) => {
    try {
      
     return await createIntepreterDb(user);
    } catch (error) {
      throw error;
    }
};

const UpdateIntepreter=async(id)=>{
  try {
    return await updateIntepreterDb(id);
  } catch (error) {
    throw error;
  }
}
const getAllIntepreters = async () => {
      try {
        console.log("kil");
        return await getAllIntepretersDb();
      } catch (error) {
        throw error;
      }
};

//bookings
const GetAllBookings = async () => {
  try {
    console.log("kil");
    return await GetAllBookingsDb();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getBooking = async (id) => {
  try {
    console.log("kil");
    return await getBookingDb(id);
  } catch (error) {
    throw error;
  }
};
const getIntepreterBooking = async (id) => {
  try {
    console.log("kil");
    return await getIntepreterBookingDb(id);
  } catch (error) {
    throw error;
  }
};
module.exports={
  getAllIntepreters,
  UpdateIntepreter,
  createIntepreter,
  deleteIntepreter,
  GetAllBookings,
  getBooking,
  getIntepreterBooking
}