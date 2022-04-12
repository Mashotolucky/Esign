const router = require("express").Router();
const { uploader } = require("./helpers/uploader");

const users = require("./users/index");
const auth = require("./auth/index");



router.use("/auth",uploader("certificates"), auth);
router.use("/users", users);

module.exports = router;
