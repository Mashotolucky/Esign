const router = require("express").Router();

const users = require("./users/index");
const auth = require("./auth/index");



router.use("/auth", auth);
router.use("/users", users);



module.exports = router;
