const router = require("express").Router();

const {verifyJWT} = require('../middleware/jwt');

const {
    getAllBookings,
    CreateBooking,
    getClientBooking,
    getBookingById,
    setBookingStatus,
    DeleteBooking,
    GetIntepreterBooking,
    GetIntepreterStreams
}=require('../controllers/Bookings_controller');

router.get("/booking/getall", getAllBookings);

router.post("/booking/create",verifyJWT, CreateBooking);

router.get("/booking/client/",verifyJWT,getClientBooking);

router.get("/booking/intepreter/",verifyJWT,GetIntepreterBooking);

router.get("/stream/intepreter/",verifyJWT,GetIntepreterStreams);

router.put("/booking/update/status",setBookingStatus);

router.delete("/booking/delete/:id", DeleteBooking);

module.exports = router;
