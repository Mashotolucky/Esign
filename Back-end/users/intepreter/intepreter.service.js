const {
  deleteInteprterDb,
  updateIntepreterDb,
  getAllIntepretersDb,
  createIntepreterDb
} = require('./intepreter.db')


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
        return await getAllIntepretersDb();
      } catch (error) {
        throw error;
      }
};

module.exports={
  getAllIntepreters,
  UpdateIntepreter,
  createIntepreter,
  deleteIntepreter
}