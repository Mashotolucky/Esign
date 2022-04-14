const router = require("express").Router();

const {verifyJWT} = require('../middleware/jwt');

const {
    getAllBookings,
    CreateBooking,
    getClientBooking,
    getBookingById,
    DeleteBooking,
    GetIntepreterBooking
}=require('../controllers/Bookings_controller');

router.get("/booking/getall", getAllBookings);

router.post("/booking/create",verifyJWT, CreateBooking);

router.get("/booking/client/",verifyJWT,getClientBooking);

router.get("/booking/intepreter/",verifyJWT,GetIntepreterBooking);

router.delete("/booking/delete/:id", DeleteBooking);

module.exports = router;
