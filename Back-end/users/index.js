const router = require("express").Router();

const intepreter_controller = require("./intepreter/intepreter_controller");

router.get("/getAllintepreters", intepreter_controller.getAll);

module.exports = router;
