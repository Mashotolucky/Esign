const router = require("express").Router();
const {verifyJWT} = require('../middleware/jwt');

const intepreter_service = require("../users/intepreter/intepreter.service")

router.get("/intepreters/getAll", getAll);
router.put("/intepreter/online",verifyJWT,online_status);



router.get("/languages",getlanduages);

module.exports = router;
