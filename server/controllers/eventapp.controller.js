const Actuacion = require('../models/actuacion');
const Taller = require('../models/taller');
const Mapa = require('../models/mapa');
const ComoLlegar = require('../models/comollegar');
const Faq = require('../models/faq');
const Faq = require('../models/restaurante');

const eventappCtrl = {};

//Get lista de actuaciones
eventappCtrl.getActuaciones = async (req, res) => {
    const actuaciones = await Actuacion.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.json(actuaciones);
};

//Get lista de talleres
eventappCtrl.getTalleres = async (req, res) => {
    const talleres = await Taller.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.json(talleres);
};

//Get una actuacion por id
eventappCtrl.getActuacion = async (req, res) => {
    try{
        const actuacion = await Actuacion.findById(req.params.id);
        if (actuacion == null){
            res.status(404).json({message: 'Actuacion not found'});
        }
        res.status(201).json(actuacion);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

//Get un taller por id
eventappCtrl.getTaller = async (req, res) => {
    try{
        const taller = await Taller.findById(req.params.id);
        if (taller == null){
            res.status(404).json({message: 'Taller not found'});
        }
        res.status(201).json(taller);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

//Get un mapa
eventappCtrl.getMapa = async (req, res) => {
    const mapa = await Mapa.findOne().catch((err) => {
        res.status(500).json({message: err.message})
    });
    res.json(mapa);
};


//Get comollegar
eventappCtrl.getComoLlegar = async (req, res) => {
    const comoLlegar = await ComoLlegar.findOne().catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.json(comoLlegar);
};

//Get FAQS
eventappCtrl.getFAQs = async (req, res) => {
    const faqs = await Faq.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.status(201).json(faqs);
};

//Get FAQ
eventappCtrl.getFAQ = async (req, res) => {
    const faq = await Faq.findById(req.params.id).catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.status(201).json(faq);
};

//Get Restaurantes
eventappCtrl.getRestaurantes = async (req, res) => {
    const restaurante = await Restaurante.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.status(201).json(restaurante);
};

//Get Restaurante
eventappCtrl.getRestaurante = async (req, res) => {
    const restaurante = await Restaurante.findById(req.params.id).catch((err) => {
        res.status(500).json({message: err.message})
    });
    await res.status(201).json(restaurante);
};

module.exports = eventappCtrl;
