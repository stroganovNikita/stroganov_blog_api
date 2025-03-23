const { Router } = require('express');
const controller = require('../controllers/sessionController');
const router = Router();

router.post('/', controller.logIn)
router.post('/new', controller.signUp);

module.exports = router;