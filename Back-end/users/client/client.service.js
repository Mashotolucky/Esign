const {
    createClientDb,
    deleteClientDb,
    updateClientDb,
    getAllClientDb
  } = require("./client.db");


const createClient = async (user) => {
    try {
      return await createClientDb(user);
    } catch (error) {
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
  

  