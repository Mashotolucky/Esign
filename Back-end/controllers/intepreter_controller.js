const {  getAllIntepretersDb, setOnilineDb, updateIntepreterDb} = require('../db/intepreter.db');
const { roles } = require('../helpers/constants');
const {fileUpload} = require('../helpers/fileUpload');

const getAll=async(req,res,next)=>{
    try {
        
        const intepreters=await getAllIntepretersDb();
        if(!intepreters) return res.send(201).send({msg:"could not find any"});
                return res.status(200).send(intepreters);
    } catch (error) {
        next(error);
    }
}
const online_status=async (req,res,next)=>{
    try {
        const id = req.user.id && req.user.role===roles.INTEPRETER ? req.user.id: null;
     
        if (!id) return res.send(401).send({msg:"you are not authorized to access this route"});
        const status=await setOnilineDb(req.body.status,id);
        return res.status(200).send(status);
    } catch (error) {
        next(error);
    }
}
const updateIntepreter=async(req,res,next)=>{
    try {
        const id = req.user.id && req.user.role===roles.INTEPRETER ? req.user.id: null;
     
        if (!id) return res.send(401).send({msg:"you are not authorized to access this route"});

       //upload picture if exists
       if(!req.file) return res.status(404).send({msg:"file missing"});

        const img_url= await fileUpload(req.file.path, "images",'image');
        console.log(img_url);
        const {name,lastname,hourly_rate,bio,tagline}=req.body;

        const status=await updateIntepreterDb({name,lastname,id,hourly_rate,img_url,bio,tagline});
        return res.status(200).send(status);
    } catch (error) {
        next(error);
    }
}
module.exports={
    getAll,
    online_status,
    updateIntepreter
}