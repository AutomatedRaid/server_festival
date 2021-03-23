const Actuacion = require('../models/actuacion');
const Taller = require('../models/taller');

const eventappCtrl = {};

//Get lista de actuaciones
eventappCtrl.getActuaciones = async (req, res) => {
    const actuaciones = await Actuacion.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    res.json(actuaciones);
};

//Get lista de talleres
eventappCtrl.getTalleres = async (req, res) => {
    const talleres = await Taller.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    res.json(talleres);
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

module.exports = eventappCtrl;
