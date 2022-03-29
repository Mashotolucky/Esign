import constants from "../helpers/constants";

const {
    getUserByEmailDb,
    changeUserPasswordDb,
    getUserByIdDb,
    getAllUsersDb
  } = require("./user.db");
const {createClient} = require('./client/client.service');
const {createIntepreter}= require('./intepreter/intepreter.service');

  class UserService {

    createUser = async (my_user) => {
      try {
        const user= await this.getUserByEmail(my_user.email);

        if (user) { throw Error("email taken");}

        user=my_user;

        if(user.role && user.role == constants.roles.CLIENT){

            return await createClient(id);
        }

        if(user.role && user.role == constants.roles.INTEPRETER){

            return await createIntepreter(id);

        }
      } catch (error) {
        throw  error;
      }
    };
  
    getUserByEmail = async (email) => {
      try {
        const user = await getUserByEmailDb(email);
        return user;
      } catch (error) {
        throw error;
      }
    };
  
    getUserById = async (id) => {
      try {
        const user = await getUserByIdDb(id);
        user.password = undefined;
        return user;
      } catch (error) {
        throw error;
      }
    };
  
    changeUserPassword = async (password, email) => {
      try {
        return await changeUserPasswordDb(password, email);
      } catch (error) {
        throw error;
      }
    };
    
    updateUser = async (user) => {
      const { email, id } = user;
      const errors = {};
      try {
        const getUser = await getUserByIdDb(id);
        
        const findUserByEmail = await getUserByEmailDb(email);
        
        const emailChanged =
          email && getUser.email.toLowerCase() !== email.toLowerCase();
   
        if (emailChanged && typeof findUserByEmail === "object") {
          errors["email"] = "Email is already taken";
        }
      
        if (Object.keys(errors).length > 0) {
          throw new Error(403, errors);
        }
        if(!user) throw Error(404,"user doest exist");

        if(user.role && user.role == constants.roles.CLIENT){

            return await UpdateClient(id);
        }

        if(user.role && user.role == constants.roles.INTEPRETER){

            return await UpdateIntepreter(id);

        }

        return await updateUserDb(user);
      } catch (error) {
        throw error;
      }
    };
  
    
    deleteUser = async (id) => {
      try {

        const user= await this.getUserById(id);

        if(!user) throw Error(404,"user doest exist");

        if(user.role && user.role == constants.roles.CLIENT){

            return await deleteClient(id);
        }

        if(user.role && user.role == constants.roles.INTEPRETER){

            return await deleteIntepreter(id);

        }

        
      } catch (error) {
        throw error;
      }
    };
  
    getAllUsers = async () => {
      try {
        return await getAllUsersDb();
      } catch (error) {
        throw error;
      }
    };
  }
  
  module.exports = new UserService();
  