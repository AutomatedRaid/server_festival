const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authjwt');

const authCtrl = require('../controllers/auth.controller');

router.post('/singup', verifyToken,  async (req, res) => {await authCtrl.singup(req, res);});
router.post('/signin',  async (req, res) => {await authCtrl.singin(req, res);});

module.exports = router;
