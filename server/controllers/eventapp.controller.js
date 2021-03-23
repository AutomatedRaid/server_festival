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
module.exports = eventappCtrl;
