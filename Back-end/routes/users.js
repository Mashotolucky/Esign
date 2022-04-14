const router = require("express").Router();
const {verifyJWT} = require('../middleware/jwt');
const {getAll, online_status}=require('../controllers/intepreter_controller');
const {getlanduages}=require('../controllers/client_controller');

router.get("/intepreters/getAll", getAll);
router.put("/intepreter/online",verifyJWT,online_status);



router.get("/languages",getlanduages);

module.exports = router;
