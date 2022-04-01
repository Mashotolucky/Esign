const {
  deleteClientDb,
  updateClientDb,
  getAllClientDb,
  createClientDb
  } = require("./client.db");


const createClient = async (user) => {
    try {
      const usr= await createClientDb(user);
     // console.log("client service",usr);
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

module.exports={
    getAllClients,
    UpdateClient,
    deleteClient,
    createClient
}
  

  