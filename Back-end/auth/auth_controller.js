const UserService = require('../users/user.service');
const { roles } = require('../helpers/constants');
const { cloudinary } = require('../cloudinary/cloudinary');
const uploader = require('../helpers/uploader');
const fs = require('fs');
const mail=require('../helpers/mailer');
const uploadFile = require('../helpers/fileUpload');

const login = async (req, res, next) => {
    try {
        if (!(req.body && req.body.email && req.body.password)) return res.status(400).json({ message: `missing field found`, ...req.body })
        const loggedin = await UserService.login(req.body);
        
        res.setHeader('Authorization','Bearer'+ loggedin.token);
        return res.status(200).send(loggedin);

    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    //console.log("req",req.file);
    const { name, password, email, lastname, cellno, role, hourly_rate, langID } = req.body;

    let cert_url = "";
  //console.log(role);
    if (req.file && role && role.toUpperCase() == roles.INTEPRETER) {
        console.log("req",req.file);
        cert_url = req.file.path ? req.file.path : "";
        // upload file to cloudinary if req.file exists  use external function await this 
        cert_url = await uploadFile.fileUpload(cert_url,"certificates");
        console.log("after filed",cert_url);
    }

    const data = {
        name: name ? String(name).trim() : null,
        password: password ? String(password).trim() : null,
        email: email ? String(email).trim() : null,
        lastname: lastname ? String(lastname).trim() : null,
        cellno: cellno ? String(cellno).trim() : null,
        role: role ? String(role).trim() : null,
        cert_url: cert_url ? cert_url : "",
        langID: langID ? langID : null,
        hourly_rate: cert_url ? String(hourly_rate).trim() : null
    }

    try {

        if (!data.role || !data.name || !data.password || !data.email || !data.lastname)
            return res.status(400).json({ message: `missing/empty field found`, ...data })
        const user = await UserService.createUser(data);
        
        if (!user) return res.status(500).send("something went wrong");

        if (process.env.NODE_ENV !== "dev") {
            await mail.signupMail(user.email, user.lastname);
          }
        return res.status(200).send(user);

    } catch (error) {
        next(error)
    }
}

module.exports = {
    login, register
}
