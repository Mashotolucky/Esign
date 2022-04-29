const UserService = require('../services/user.service');
const { roles } = require('../helpers/constants');
const { cloudinary } = require('../cloudinary/cloudinary');
const uploader = require('../middleware/uploader');
const fs = require('fs');
const mail=require('../helpers/mailer');
const uploadFile = require('../helpers/fileUpload');

const login = async (req, res, next) => {
    try {
        if (!(req.body && req.body.email && req.body.password))
         return res.status(400).json({ message: `fill in all fields`, ...req.body })
        const loggedin = await UserService.login(req.body);
        
        res.setHeader('Authorization','Bearer'+ loggedin.token);
        return res.status(200).send(loggedin);

    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
   
    if(!req.body) return next(new Error("all fields required"));

    const { name, password, email, lastname, role, hourly_rate } = req.body;

    let cert_url = "";
    let data={};
    data = {
        name: name ? String(name).trim() : null,
        password: password ? String(password).trim() : null,
        email: email ? String(email).trim() : null,
        lastname: lastname ? String(lastname).trim() : null,
        role: role ,
        image_url:"https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png",
    }
   

    try {
        if (req.file && String(role).trim() && String(role).trim().toUpperCase() == roles.INTEPRETER) {
       
            if(req.file.size>10485760){
                return res.status(400).send({msg:"size too large"});
            }
            // upload file to cloudinary if req.file exists  use external function await this 
            cert_url =await uploadFile.fileUpload(req.file.path,"certificates",'raw');
            
        
            if(!cert_url) return next(new Error("file upload failed"));
    
            data.cert_url= cert_url ? cert_url : "",
            data.hourly_rate= hourly_rate ? String(hourly_rate).trim() : null;
            
    
        }

        if(!data) return next(new Error("all fields required"));

        if (!data.role || !data.name || !data.password || !data.email || !data.lastname)
            return res.status(400).json({ message: `missing/empty field found`, ...data })

        const user = await UserService.createUser(data);
        
        if (!user) return res.status(500).send("something went wrong");

        if (process.env.NODE_ENV !== "dev") {
            await mail.signupMail({name:user.name, appname:process.env.APP_NAME,url:req.headers.host});
        }
        return res.status(200).send(user);

    } catch (error) {
        next(error)
    }
}

module.exports = {
    login, register
}
