require('dotenv').config();
const constants = require("../helpers/constants");
const jwt = require('jsonwebtoken');
const {
    getUserByEmailDb,
    changeUserPasswordDb,
    getUserByIdDb,
    getAllUsersDb,
    createUserDb,
    createResetTokenDb,
    setTokenStatusDb,
    getLanguagesDb
  } = require("./user.db");
const {createClient,UpdateClient,deleteClient} = require('./client/client.service');
const {createIntepreter,UpdateIntepreter,deleteIntepreter}= require('./intepreter/intepreter.service');
const {hashPassword,comparePassword}=require('../helpers/password');
const {generateToken}=require('../middleware/jwt');
const mail=require('../helpers/mailer');

  class UserService {

    createUser = async (my_user) => {
      try {
        const existing_user= await this.getUserByEmail(my_user.email);

        if (existing_user) { throw Error("email taken");}
        
        const hashedPassword_= await hashPassword(my_user.password);
        console.log(typeof hashedPassword_);
        const user={
          ...my_user,
          passwordhash: hashedPassword_
        };
       // console.log(user);

        const newuser=await createUserDb(user)
        if(newuser.role && newuser.role.toUpperCase() == constants.roles.CLIENT){

            const usr = await createClient({userID:newuser.id,langID:user.langID});
            return usr;
        }else
        if(newuser.role && newuser.role.toUpperCase() == constants.roles.INTEPRETER){

            return await createIntepreter({userID:newuser.id,cert_url:user.cert_url,hourly_rate:user.hourly_rate});

        }else{
          throw Error("role is empty or not defined");
        }
     
      } catch (error) {
        console.log(error);
        throw  error;
      }
    };

    login= async ({email,password})=>{
      
      const user= await this.getUserByEmail(email);
      console.log("found",user);
      if (!user) { throw Error("user not found check email of password");}
      
      console.log("user obj",user);
      const result =  await comparePassword(password,user.passwordhash);

      if(result){

      //create token
      const token= await generateToken({ userId: user.id, userRole: user.role });
      const refreshToken = jwt.sign({ userId: user.id, userRole: user.role }, process.env.REFRESH_TOKEN_SECRET)
      //store refresh token
      return {user:user,refreshToken,token};
      }else{
        throw new Error("Password do not match");
      }

    }
    async forgotPassword(email) {
      //const user = await getUserByEmailDb(email);
      const user= await this.getUserByEmail(email);
  
      if (user) {
        try {

          //inavildate reset token
          await setTokenStatusDb(email);
  
          //Create a random reset token
          var fpSalt = crypto.randomBytes(64).toString("base64");
  
          //token expires after one hour
          var expireDate = moment().add(1, "h").format();
  
          await createResetTokenDb({ email, expireDate, fpSalt });
  
          await mail.forgotPasswordMail(fpSalt, email);

        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error("Email not found");
      }
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
     
    getAllLanguages = async () => {
      try {
        return await getLanguagesDb();
      } catch (error) {
        throw error;
      }
    };
    
 


  }
  
  module.exports = new UserService();
  