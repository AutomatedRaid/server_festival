const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


//Routes
router.post('/singup', userCtrl.signUp);
router.post('/singin', userCtrl.signIn);

module.exports = router;
