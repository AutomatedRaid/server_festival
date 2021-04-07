const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller');

router.post('/singup',  async (req, res) => {await authCtrl.singup(req, res);});
router.post('/singin',  async (req, res) => {await authCtrl.singin(req, res);});

module.exports = router;
