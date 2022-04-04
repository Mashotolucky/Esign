//const UserService = require('../users/user.service');
const {  getAllIntepreters, UpdateIntepreter} = require('./intepreter.service');

const getAll=async(req,res,next)=>{
    try {
        console.log("meeeeee");
        const intepreters=await getAllIntepreters();
        console.log("int",intepreters);
        if(!intepreters) return res.send(201).send({msg:"could not find any"});
        return res.status(200).send(intepreters);
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
   // updateInterpreter
}