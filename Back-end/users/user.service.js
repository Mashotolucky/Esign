import constants from "../helpers/constants";
const jwt = require('jsonwebtoken');
const {
    getUserByEmailDb,
    changeUserPasswordDb,
    getUserByIdDb,
    getAllUsersDb
  } = require("./user.db");
const {createClient,UpdateClient,deleteClient} = require('./client/client.service');
const {createIntepreter,UpdateIntepreter,deleteIntepreter}= require('./intepreter/intepreter.service');
const {hashPassword,comparePassword}=require('../helpers/password');
const {generateToken}=require('../middleware/jwt');

  class UserService {

    createUser = async (my_user) => {
      try {
        const user= await this.getUserByEmail(my_user.email);

        if (user) { throw Error("email taken");}
        
        const hashedPassword= hashPassword(my_user.password);

        user={
          ...my_user,
          passwordhash:hashedPassword
        };

        if(user.role && user.role == constants.roles.CLIENT){

            return await createClient(user);
        }

        if(user.role && user.role == constants.roles.INTEPRETER){

            return await createIntepreter(user);

        }
      } catch (error) {
        throw  error;
      }
    };

    login=async ({email,password})=>{
      const user= await this.getUserByEmail(my_user.email);

      if (!user) { throw Error("user not found");}
      
      await comparePassword(my_user.password,user.passwordhash).then(
        (err,result)=>{
          if(err) throw new Error("password dont match")
          if(result){
            //create token
            const token= await generateToken({ userId: user.ID, userRole: user.role });
            const refreshToken = jwt.sign({ userId: user.ID, userRole: user.role }, process.env.REFRESH_TOKEN_SECRET)
            return {user,refreshToken,token};
          }
        }
      ).catch((err)=>{
        throw err;
      })




    }
  
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
  