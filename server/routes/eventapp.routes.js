const express = require('express');
const router = express.Router();

const eventAppCtrl = require('../controllers/eventapp.controller');

//Routes
router.get('/actuaciones', async (req, res) => {eventAppCtrl.getActuaciones(req,res);});
router.get('/talleres',  async (req, res) => {eventAppCtrl.getTalleres(req,res);});

module.exports = router;
