//const UserService = require('../users/user.service');
const {  getAllIntepreters, UpdateIntepreter, setOniline} = require('./intepreter.service');

const getAll=async(req,res,next)=>{
    try {
        
        const intepreters=await getAllIntepreters();
        console.log("int",intepreters);
        if(!intepreters) return res.send(201).send({msg:"could not find any"});
        return res.status(200).send(intepreters);
    } catch (error) {
        next(error);
    }
}

const updateStatus = async(req, res, next) => {
    try {
        
        console.log(req);
        const statusOnline = await setOniline(req.body.status,req.body.id);
        
        if(!statusOnline) return res.send(201).send({msg:"offline"});
        return res.status(200).send(statusOnline );
    } catch (error) {
        next(error);
    }
}
// const updateInterpreter= async(req,res,next)=>{
//     try {
//         const id = req.params.id;
//         const newIntepreter=await UpdateIntepreter(id);
//         if(!newIntepreter) return res.status(201).send({msg:"not updated"});
//         return res.status(200).send(newIntepreter);
//     } catch (error) {
//         next(error);
//     }
// }

module.exports={
    getAll,
    updateStatus
   // updateInterpreter
}