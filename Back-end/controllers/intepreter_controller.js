const {  getAllIntepretersDb, setOnilineDb} = require('../db/intepreter.db');
const { roles } = require('../helpers/constants');

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
        const status=await setOnilineDb(req.body.status,id);
        return res.status(200).send(status);
    } catch (error) {
        next(error);
    }
}
module.exports={
    getAll,
    online_status
}