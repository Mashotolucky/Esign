const UserService = require('../user.service');


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

module.exports={
    getlanduages
}