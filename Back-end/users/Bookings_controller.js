//const UserService = require('../users/user.service');
const {GetAllBookings,getBooking,getIntepreterBooking} = require('./intepreter/intepreter.service');
const {createBooking,deleteBooking} =require('./client/client.service');
const { roles } = require('../helpers/constants');

//get all on system 
const getAllBookings=async(req,res,next)=>{
    try {
    
        const Bookings=await GetAllBookings();

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
//get intepreter specific bookings
const getBookingsByIntepreterId=async (req,res,next)=>{
    
    try {
        const id = req.user.id && req.user.role===roles.INTEPRETER ? req.user.id: null;
        
        if (id) return res.send(401).send({msg:"you are not authorized to access this route"});

        const Bookings=await getIntepreterBooking(id);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
//get individual booking by booking id
const getBookingById=async (req,res,next)=>{
    
    try {
        const id = req.params.id;

        const Bookings=await getBooking(id);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
const createBooking= async(req,res,next)=>{
    try {
        const data=req.body;

        const newBooking=await createBooking(data);

        if(!newBooking) return res.status(201).send({msg:"not created"});

        return res.status(200).send(newBooking);

    } catch (error) {

        next(error);
    }
}
const deleteBookingById=async (req,res,next)=>{
    
    try {
        const id = req.params.id;

        const Bookings=await deleteBooking(id);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
module.exports={

    createBooking,
    getBookingById,
    createBooking,
    getAllBookings,
    deleteBookingById,
    getBookingsByIntepreterId
}