const express = require('express');
const router = express.Router();

const eventAppCtrl = require('../controllers/eventapp.controller');

//Routes
router.get('/actuaciones', async (req, res) => {await eventAppCtrl.getActuaciones(req, res);});
router.get('/actuacion/:id', async (req, res) => {await eventAppCtrl.getActuacion(req, res);});
router.get('/talleres',  async (req, res) => {await eventAppCtrl.getTalleres(req, res);});
router.get('/taller/:id',  async (req, res) => {await eventAppCtrl.getTaller(req, res);});
router.get('/mapa',  async (req, res) => {await eventAppCtrl.getMapa(req, res);});

module.exports = router;
