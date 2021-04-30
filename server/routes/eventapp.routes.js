const express = require('express');
const router = express.Router();

const eventAppCtrl = require('../controllers/eventapp.controller');

//Routes
router.get('/actuaciones', async (req, res) => {eventAppCtrl.getActuaciones(req,res);});
router.get('/actuacion/:id', async (req, res) => {eventAppCtrl.getActuacion(req,res);});
router.get('/talleres', async (req, res) => {eventAppCtrl.getTalleres(req,res);});
router.get('/taller/:id', async (req, res) => {eventAppCtrl.getTaller(req,res);});
router.get('/mapa', async (req, res) => {eventAppCtrl.getMapa(req,res);});
router.get('/faq', async (req, res) => {eventAppCtrl.getFAQs(req,res);});
router.get('/faq/:id', async (req, res) => {eventAppCtrl.getFAQ(req,res);});
router.get('/comollegar', async (req, res) => {eventAppCtrl.getComoLlegar(req,res);});
router.get('/restaurante/:id', async (req, res) => {eventAppCtrl.getRestaurante(req,res);});
router.get('/restaurante', async (req, res) => {eventAppCtrl.getRestaurantes(req,res);});

module.exports = router;
