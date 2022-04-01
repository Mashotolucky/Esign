const userService = require('../users/user.service');
const intepretorService = require('../users/intepreter/intepreter.service');
const clientService = require('../users/client/client.service');

const login =async (req, res, next) =>{
    try {
        if(!(req.body && req.body.email && req.body.password)) return res.status(403).send("missing field")
     const loggedin=await UserService.login(req.body);
     res.setHeader('authorization', loggedin.token);
     return res.status(200).send(loggedin);
       
   } catch (error) {
       next(error)
    }
   } 
   
   const register =async (req, res, next) =>{
       try {
           if(!(req.body && req.body.role)) return res.status(403).send("missing field")
       
         const user=await UserService.createUser(req.body);
       
         if(!user) return res.status(500).send("something went wrong");
       
         return res.status(200).send(user);
       
         } catch (error) {
             next(error)
         } 
   }
   
   module.exports={
       login,register
   }
   