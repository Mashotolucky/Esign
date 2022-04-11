const UserService = require('../user.service');
const {setOnilineDb} = require('../intepreter/intepreter.db');
const { roles } = require('../../helpers/constants');
const getlanduages=async (req,res,next)=>{
    console.log('lang contr');
    try {
        const languages=await UserService.getAllLanguages();
        if(!languages) return res.status(404).send("not found");

        return res.status(200).send(languages);
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
    getlanduages,
    online_status
}