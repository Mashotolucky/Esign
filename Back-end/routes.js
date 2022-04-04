const router = require("express").Router();

const users = require("./users/index");
const auth = require("./auth/index");
const { uploader } = require("./helpers/uploader");

router.use("/auth",uploader("certificates"), auth);
router.use("/users", users);

module.exports = router;
