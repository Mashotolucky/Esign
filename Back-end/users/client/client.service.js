const {
  deleteClientDb,
  updateClientDb,
  getAllClientDb,
  getClientById,
  createClientDb,
  createBookingDb,
  deleteBookingDb
  } = require("./client.db");


const createClient = async (user) => {
    try {
      const usr= await createClientDb(user);
      return usr;

    } catch (error) {
      console.log(error);
      throw  error;
    }
};

const deleteClient = async (id) => {
      try {
        return await deleteClientDb(id);
      } catch (error) {
        throw error;
      }
};
const UpdateClient=async(client)=>{
  try {
    return await updateClientDb(id);
  } catch (error) {
    throw error;
  }
}
const getAllClients = async () => {
      try {
        return await getAllClientDb();
      } catch (error) {
        throw error;
      }
};

const getClient = async (id) =>{
  console.log("service id: ",id);
  try {
    return await getClientById(id);
  } catch (error) {
    throw error;
  }
}
//bookings
const createBooking = async (data) => {
  try {
    console.log("booking data",data);
    return await createBookingDb(data);

  } catch (error) {
    throw error;
  }
};
const deleteBooking = async (id) => {
  try {

    return await deleteBookingDb(id);

  } catch (error) {
    throw error;
  }
};


module.exports={
    getAllClients,
    UpdateClient,
    deleteClient,
    createClient,
    createBooking,
    deleteBooking,
    getClient
}
  

  