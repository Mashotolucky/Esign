const router = require("express").Router();

const auth_controller = require("./auth.controller");

router.use("/login", auth_controller.login);
router.use("/register", auth_controller.register);

module.exports = router;
