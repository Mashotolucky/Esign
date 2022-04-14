const router = require("express").Router();
const { uploader } = require("../middleware/uploader");

const users = require("./users");
const auth = require("./auth");
const bookings = require('./booking');


router.use("/auth",uploader("certificates"),auth);
router.use("/users", users);
router.use("/bookings",bookings);

module.exports = router;
