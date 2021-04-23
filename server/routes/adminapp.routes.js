const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authjwt');

const adminAppCtrl = require('../controllers/adminapp.controller');

//Routes
router.post('/actuacion',  async (req, res) => {await adminAppCtrl.createActuacion(req, res);});
router.put('/actuacion/:id',  async (req, res) => {await adminAppCtrl.editActuacion(req, res);});
router.delete('/actuacion/:id',   async (req, res) => {await adminAppCtrl.deleteActuacion(req, res);});
router.post('/taller',  async (req, res) => {await adminAppCtrl.createTaller(req, res);});
router.put('/taller/:id',  async (req, res) => {await adminAppCtrl.editTaller(req, res);});
router.delete('/taller/:id',  async (req, res) => {await adminAppCtrl.deleteTaller(req, res);});
router.put('/mapa/:id',  async (req, res) => {await adminAppCtrl.editMapa(req, res);});
router.post('/mapa', async (req, res) => {await adminAppCtrl.createMapa(req, res);});
router.post('/comollegar', async (req, res) => {await adminAppCtrl.createComoLlegar(req, res);});
router.post('/faq', async (req, res) => {await adminAppCtrl.createFAQ(req, res);});
router.put('/faq/:id', async (req, res) => {await adminAppCtrl.editFAQ(req, res);});
router.delete('/faq/:id', async (req, res) => {await adminAppCtrl.deleteFAQ(req, res);});
router.get('/private', verifyToken, async (req, res) => {res.status(200).json({ message: "Okey... Hi!" })});

module.exports = router;
