const { Router } = require("express");
const controller = require("../controllers/sessionController");
const { verifyToken, verifyTokenAdmin } = require('../config/verifyToken');
const router = Router();


router.post("/", controller.logIn);

router.post("/new", controller.signUp);

router.get('/verify', verifyToken);

router.get('/admin', verifyTokenAdmin)

module.exports = router;
