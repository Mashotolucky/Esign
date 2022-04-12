const router = require("express").Router();

const {verifyJWT} = require('../middleware/jwt');

const {
    getAllBookings,
    CreateBooking,
    getClientBooking,
    getIntepreterBooking,
    deleteBooking
}=require('../controllers/Bookings_controller');

router.get("/booking/getall", getAllBookings);

router.post("/booking/create",verifyJWT, CreateBooking);

router.get("/booking/client/",verifyJWT,getClientBooking);

router.get("/booking/intepreter/",verifyJWT,getIntepreterBooking);

router.delete("/booking/delete/:id", deleteBooking);

module.exports = router;
