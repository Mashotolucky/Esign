const router = require("express").Router();
const {verifyJWT} = require('../middleware/jwt');

const intepreter_controller = require("./intepreter/intepreter_controller");
const {getBookingById, CreateBooking, getAllBookings, deleteBookingById,
    getBookingsByIntepreterId} = require('./Bookings_controller');
const {getlanduages} = require("./client/client_controller");

router.get("/intepreters/getAll", intepreter_controller.getAll);

//bookings
router.get("/booking/intepreter/:id",verifyJWT,getBookingsByIntepreterId);

router.get("/booking/getone/:id",verifyJWT,getBookingsByIntepreterId);

router.get("/booking/getall", getAllBookings);

router.post("/booking/create",verifyJWT, CreateBooking);

router.delete("/booking/delete/:id", deleteBookingById);

router.get("/languages",getlanduages);

module.exports = router;
