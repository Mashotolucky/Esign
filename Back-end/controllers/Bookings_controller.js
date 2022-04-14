//const UserService = require('../users/user.service');
const {getClientDb} = require('../db/client.db');
const {
    createBookingDb,
    GetAllBookingsDb,
    getIntepreterBookingDb,
    getBookingDb,
    getAllClientBookingDb,
    deleteBookingDb
} =require('../db/booking.db');

const { roles } = require('../helpers/constants');

const { getIntepreterDb } = require('../db/intepreter.db');


//get all on system 
const getAllBookings=async(req,res,next)=>{
    try {
    
        console.log("booking control");
        const Bookings=await GetAllBookingsDb();

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
//get intepreter bookings by intepreter
const GetIntepreterBooking=async (req,res,next)=>{
    
    try {
        
         //check that user is authorized and is intepreter
         const id = req.user.id && req.user.role===roles.INTEPRETER ? req.user.id: null;

        console.log("Inter",id);
        if (!id) return res.send(401).send({msg:"you are not authorized to access this route"});

          //get intepreter by user id 
        const intepreterId = await getIntepreterDb(id); 
  
        if(!intepreterId) return res.status(404).send("user not found");



        const Bookings=await getIntepreterBookingDb(intepreterId);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        console.log(error);
        next(error);
    }
}
//get individual booking by booking id
const getBookingById= async (req,res,next)=>{
    
    try {
        const id = req.params.id;

        const Bookings= await getBookingDb(id);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}

const CreateBooking= async(req,res,next)=>{
    try {
        const { intepreterID, date_, time_, status} = req.body;
       const  userId = req.user.id && req.user.role===roles.CLIENT ? req.user.id: null;
    
       if(!userId) return res.status(403).send("forbidden");

       const clientID = await getClientDb(userId);
        
       console.log("client token", req.user);

       const data = {
            clientID: clientID? clientID: null,
            intepreterID: intepreterID ? intepreterID : null,
            date_: date_ ? date_ : null,
            time_: time_ ? time_ : null,
            status: status ? status : false
        }
          if(!clientID || !intepreterID) return res.status(403).send("booking failed missing field");
        const newBooking = await createBookingDb(data);

        if(!newBooking) return res.status(201).send({msg:"booking not created try again"});

        return res.status(200).send(newBooking);

    } catch (error) {
        console.log("control book err");
        console.log(error);
        next(error);
    }
}

const DeleteBooking=async (req,res,next)=>{
    
    try {
        const id = req.params.id;
        if(!id) return res.status(403).send("id must be supplied");
        
        const Bookings=await deleteBookingDb(id);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
//get  booking by client id 
const getClientBooking=async (req,res,next)=>{
    
    try {
        const id = req.user.id && req.user.role===roles.CLIENT ? req.user.id: null;
        console.log("userid",id);

        //get client by user id 
        if(!id) return res.status(403).send("unauthorized");

        const clientID = await getClientDb(id); 

        if(!clientID) return res.status(404).send("user not found");

        //get booking by client id
        const Bookings=await getAllClientBookingDb(clientID);

        if(!Bookings) return res.status(404).send({msg:"not found"});

        return res.status(200).send(Bookings);

    } catch (error) {
        
        next(error);
    }
}
module.exports={
    getBookingById,
    CreateBooking,
    getAllBookings,
    DeleteBooking,
    getClientBooking,
    GetIntepreterBooking
}