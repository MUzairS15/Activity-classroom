const express = require('express');

const router = express.Router();

const { validateBody } = require('../middleware/validator');
const { SignUp, LogIn } = require('../controller/auth_controller');
const { handleAsyncError } = require('../middleware/error');

// router.use('/createUser', validateBody);
router.post('/createUser', handleAsyncError (SignUp));

router.post('/login', handleAsyncError (LogIn));
module.exports = router;