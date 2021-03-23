const express = require('express');
const router = express.Router();

const adminAppCtrl = require('../controllers/adminapp.controller');

//Routes
router.post('/actuacion', async (req, res) => {adminAppCtrl.createActuacion(req, res);});
router.put('/actuacion/:id', async (req, res) => {adminAppCtrl.editActuacion(req, res);});
router.delete('/actuacion/:id', async (req, res) => {adminAppCtrl.deleteActuacion(req, res);});
router.post('/taller', async (req, res) => {adminAppCtrl.createTaller(req, res);});
router.put('/taller/:id', async (req, res) => {adminAppCtrl.editTaller(req, res);});
router.delete('/taller/:id', async (req, res) => {adminAppCtrl.deleteTaller(req, res);});
router.put('/mapa/:id', async (req, res) => {adminAppCtrl.editMapa(req, res);});
router.post('/mapa', async (req, res) => {adminAppCtrl.createMapa(req, res);});

module.exports = router;
