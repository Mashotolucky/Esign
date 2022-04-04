const UserService = require('../users/user.service');
const {roles} = require('../helpers/constants');

const login =async (req, res, next) =>{
 try {
     if(!(req.body && req.body.email && req.body.password)) return res.status(400).json({message:`missing field found`,...req.body})
  const loggedin=await UserService.login(req.body);
  console.log("login",loggedin);
  res.setHeader('authorization', loggedin.token);
  return res.status(200).send(loggedin);
    
} catch (error) {
    next(error)
 }
} 

const register = async(req, res, next) =>{
    const {name, password, email, lastname , cellno ,role,hourly_rate,langID}=req.body;
    
    let cert_url ="";
       console.log(req.file);
   
    if(req.file && role && role == roles.INTEPRETER){
        console.log("test cert");
        cert_url = req.file.path ? req.file.path : "";
        console.log("certificate url:",cert_url);
      // upload file to cloudinary if req.file exists  use external function await this 
      //take cloudinary response and get url set cert_url to cloudinary url
    }
    
    

      
    const data={
            name: name ? String(name).trim() : null,
            password:password? String(password).trim(): null,
            email: email? String(email).trim(): null,
            lastname: lastname? String(lastname).trim() : null,
            cellno: cellno? String(cellno).trim(): null,
            role: role? String(role).trim(): null,
            cert_url: cert_url? cert_url : null,
            langID: langID ? langID : null,
            hourly_rate: cert_url? String(hourly_rate).trim(): null
    }

    try {
        
        if(!data.role || !data.name || !data.password || !data.email || !data.lastname || !data.cellno)
         return res.status(400).json({message:`missing/empty field found`,...data})
    
      const user = await UserService.createUser(data);
       //console.log("controller:",user);
      if(!user) return res.status(500).send("something went wrong");
    
      return res.status(200).send(user);
    
      } catch (error) {
          next(error)
      } 
}

module.exports={
    login,register
}
