const Actuacion = require('../models/actuacion');
const Taller = require('../models/taller');

const adminappCtrl = {};

adminappCtrl.createActuacion = async (req, res) => {
    try{
        const actuacion = new Actuacion({
            nombre: req.body.nombre,
            horario: req.body.horario,
            artistas: req.body.artistas,
            descripcion: req.body.descripcion,
            img: req.body.img
        });
        await actuacion.save();
        res.status(201).json({message: 'Actuacion creada'})
    }catch (e) {
        res.send(400).json({message: e.message});
    }
};

adminappCtrl.createTaller = async (req, res) => {
    try{
        const taller = new Taller({
            nombre: req.body.nombre,
            horario: req.body.horario,
            descripcion: req.body.descripcion,
            img: req.body.img
        });
        await taller.save();
        res.status(201).json({message: 'Actuacion creada'})
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

module.exports = adminappCtrl;
