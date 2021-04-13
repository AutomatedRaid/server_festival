const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authjwt');

const adminAppCtrl = require('../controllers/adminapp.controller');

//Routes
router.post('/actuacion', verifyToken, async (req, res) => {await adminAppCtrl.createActuacion(req, res);});
router.put('/actuacion/:id', verifyToken, async (req, res) => {await adminAppCtrl.editActuacion(req, res);});
router.delete('/actuacion/:id', verifyToken,  async (req, res) => {await adminAppCtrl.deleteActuacion(req, res);});
router.post('/taller', verifyToken, async (req, res) => {await adminAppCtrl.createTaller(req, res);});
router.put('/taller/:id', verifyToken, async (req, res) => {await adminAppCtrl.editTaller(req, res);});
router.delete('/taller/:id', verifyToken, async (req, res) => {await adminAppCtrl.deleteTaller(req, res);});
router.put('/mapa/:id', verifyToken, async (req, res) => {await adminAppCtrl.editMapa(req, res);});
router.post('/mapa', verifyToken, async (req, res) => {await adminAppCtrl.createMapa(req, res);});
router.get('/private', verifyToken, async (req, res) => {res.status(200).json({ message: "Okey... Hi!" })});

module.exports = router;
