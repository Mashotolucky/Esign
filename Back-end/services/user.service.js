require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto=require('crypto');
const moment= require('moment');

const {roles} = require("../helpers/constants");
const {hashPassword,comparePassword}=require('../helpers/password');
const {generateToken}=require('../middleware/jwt');
const mail=require('../helpers/mailer');

const {getUserByEmailDb,createUserDb, setTokenStatusDb, createResetTokenDb, changeUserPasswordDb, getUserByIdDb, getAllUsersDb}=require('../db/user.db')
const { createClientDb, deleteClientDb } = require('../db/client.db');
const { createIntepreterDb, updateIntepreterDb, deleteInteprterDb } = require('../db/intepreter.db');





  class UserService {

    createUser = async (my_user) => {
      try {

        //check if user exists
        const existing_user= await getUserByEmailDb(my_user.email);

        //if exists 
        if (existing_user) { throw Error("email taken");}

        //encrypt/hash password
        const hashedPassword_= await hashPassword(my_user.password);
       

        const user={
          ...my_user,
          passwordhash: hashedPassword_
        };
        //create user
        const newuser=await createUserDb(user)

        //check user role and create intepreter or client
        if(newuser.role && newuser.role.toUpperCase() == roles.CLIENT){

            const usr = await createClientDb({userID:newuser.id});
            return usr;
        }else
        if(newuser.role && newuser.role.toUpperCase() == roles.INTEPRETER){

            return await createIntepreterDb({userID:newuser.id,cert_url:user.cert_url,hourly_rate:user.hourly_rate,bio:user.bio, tagline:user.tagline});

        }else{
          throw Error("role is empty or not defined");
        }
     
      } catch (error) {
        console.log(error);
        throw  error;
      }
    };

    login= async ({email,password})=>{
      

      //find user if exists
      const user= await getUserByEmailDb(email);
     
      //if user not found
      if (!user) { throw Error("user not found check email of password");}
      
      //call function to compare hash with plain user input(password)
      const result =  await comparePassword(password,user.passwordhash);

      if(result){
        //create token
        const token= await generateToken({ userId: user.id, userRole: user.role });
        return {user:user,token};
      }else{
        throw new Error("Password do not match");
      }

    }
    async forgotPassword(email) {
  
      const user= await getUserByEmailDb(email);
  
      if (user) {
        try {

          //inavildate reset token
          await setTokenStatusDb(email);
  
          //Create a random reset token
          var fpSalt = crypto.randomBytes(64).toString("base64");
  
          //token expires after one hour
          var expireDate = moment().add(1,'h').format();
  
          await createResetTokenDb({ email, expireDate, fpSalt });
  
          await mail.forgotPasswordMail(fpSalt, email);

        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error("Email not found");
      }
    }
   
  
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

        if(user.role && user.role.toUpperCase() == roles.CLIENT){

            return await UpdateClient(id);
        }

        if(user.role && user.role.toUpperCase() == roles.INTEPRETER){

            return await updateIntepreterDb(id);

        }
      } catch (error) {
        throw error;
      }
    };  
    deleteUser = async (id) => {
      try {

        const user= await getUserByIdDb(id);

        if(!user) throw Error(404,"user doest exist");

        if(user.role && user.role.toUpperCase() == roles.CLIENT){

            return await deleteClientDb(id);

        }else if(user.role && user.role.toUpperCase() ==roles.INTEPRETER){

            return await deleteInteprterDb(id);

        }else{
          throw Error(404,"user doest exist");
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
     
    // getAllLanguages = async () => {
    //   try {
    //     return await getLanguagesdb();
    //   } catch (error) {
    //     throw error;
    //   }
    // };

  }
  
  module.exports = new UserService();
  