const express = require('express');
const router = express.Router();

const adminAppCtrl = require('../controllers/adminapp.controller');

//Routes
router.post('/actuacion', async (req, res) => {adminAppCtrl.createActuacion(req, res);});
router.post('/taller', async (req, res) => {adminAppCtrl.createTaller(req, res);});

module.exports = router;
