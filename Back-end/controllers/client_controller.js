// const {getLanguagesdb} = require('../db/client.db');
// const { roles } = require('../helpers/constants');

// const getlanduages=async (req,res,next)=>{
//     console.log('lang contr');
//     try {
//         const languages=await getLanguagesdb();
//         if(!languages) return res.status(404).send("not found");
//         return res.status(200).send(languages);
//     } catch (error) {
//         next(error);
//     }
// }

// module.exports={
//     getlanduages
// }