//const UserService = require('../users/user.service');
const {GetAllBookings,getBooking,getIntepreterBooking} = require('./intepreter/intepreter.service');
const {createBooking,deleteBooking,getClient,getAllClientBooking} =require('./client/client.service');
const { roles } = require('../helpers/constants');


//get all on system 
const getAllBookings=async(req,res,next)=>{
    try {
    
        console.log("booking control");
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
        // console.log("get book by id");
        console.log(req.user.id);
         const id = req.user.id && req.user.role===roles.INTEPRETER ? req.user.id: null;

        console.log("Inter",id);
        if (!id) return res.send(401).send({msg:"you are not authorized to access this route"});

        const Bookings=await getIntepreterBooking(id);

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

        const Bookings= await getBooking(id);

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

       const clientID = await getClient(userId);
        
       console.log("client token", req.user);

       const data = {
        clientID: clientID? clientID: null,
        intepreterID: intepreterID ? intepreterID : null,
        date_: date_ ? date_ : null,
        time_: time_ ? time_ : null,
        status: status ? status : null
    }

        const newBooking = await createBooking(data);

        if(!newBooking) return res.status(201).send({msg:"not created"});

        return res.status(200).send(newBooking);

    } catch (error) {
        console.log("control book err");
        console.log(error);
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

const getClientBooking=async (req,res,next)=>{
    
    try {
        const id = req.user.id && req.user.role===roles.CLIENT ? req.user.id: null;
        console.log("clientID",id);

        const Bookings=await getAllClientBooking(id);

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
    deleteBookingById,
    getClientBooking,
    getBookingsByIntepreterId
}