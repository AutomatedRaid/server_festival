const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authjwt');
const upload = require('../middleware/storage');

const adminAppCtrl = require('../controllers/adminapp.controller');

//Routes
router.post('/actuacion', verifyToken,  async (req, res) => {await adminAppCtrl.createActuacion(req, res);});
router.put('/actuacion/:id', verifyToken,  async (req, res) => {await adminAppCtrl.editActuacion(req, res);});
router.delete('/actuacion/:id', verifyToken,   async (req, res) => {await adminAppCtrl.deleteActuacion(req, res);});
router.post('/taller', verifyToken,  async (req, res) => {await adminAppCtrl.createTaller(req, res);});
router.put('/taller/:id', verifyToken,  async (req, res) => {await adminAppCtrl.editTaller(req, res);});
router.delete('/taller/:id', verifyToken,  async (req, res) => {await adminAppCtrl.deleteTaller(req, res);});
router.post('/mapa', verifyToken, async (req, res) => {await adminAppCtrl.createMapa(req, res);});
router.post('/comollegar', verifyToken, async (req, res) => {await adminAppCtrl.createComoLlegar(req, res);});
router.put('/comollegar/:id', verifyToken, async (req, res) => {await adminAppCtrl.editComoLlegar(req, res);});
router.post('/faq', verifyToken, async (req, res) => {await adminAppCtrl.createFAQ(req, res);});
router.put('/faq/:id', verifyToken, async (req, res) => {await adminAppCtrl.editFAQ(req, res);});
router.delete('/faq/:id', verifyToken, async (req, res) => {await adminAppCtrl.deleteFAQ(req, res);});
router.post('/restaurante', verifyToken, async (req, res) => {await adminAppCtrl.createRestaurante(req, res);});
router.put('/restaurante/:id', verifyToken, async (req, res) => {await adminAppCtrl.editRestaurante(req, res);});
router.delete('/restaurante/:id', verifyToken, async (req, res) => {await adminAppCtrl.deleteRestaurante(req, res);});
router.get('/private', verifyToken, async (req, res) => {res.status(200).json({ message: "Okey... Hi!" })});
router.post('/image', upload.single('image'), async (file, res) => {await adminAppCtrl.image(file, res);});
//router.post('/image', upload.single('image'), async (req, res) => {res.status(201).json({ message: ":/" })});
module.exports = router;
