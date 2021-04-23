const Actuacion = require('../models/actuacion');
const Taller = require('../models/taller');
const Mapa = require('../models/mapa');
const ComoLlegar = require('../models/comollegar');

const adminappCtrl = {};

adminappCtrl.createActuacion = async (req, res) => {
    try{
        const actuacion = new Actuacion({
            nombre: req.body.nombre,
            horario: req.body.horario,
            artistas: req.body.artistas,
            descripcion: req.body.descripcion,
            zona: req.body.zona,
            img: req.body.img,
            img_mapa: req.body.img_mapa
        });
        await actuacion.save();
        res.status(201).json({message: 'Actuacion creada'})
    }catch (e) {
        res.send(400).json({message: e.message});
    }
};

adminappCtrl.editActuacion = async (req, res) => {
    try{
        const actuacion = {
            nombre: req.body.nombre,
            horario: req.body.horario,
            artistas: req.body.artistas,
            descripcion: req.body.descripcion,
            zona: req.body.zona,
            img: req.body.img,
            img_mapa: req.body.img_mapa
        };
        await Actuacion.findByIdAndUpdate(req.params.id,{$set: actuacion}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Actuacion updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.deleteActuacion = async (req, res) => {
    try{
        await Actuacion.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Actuacion deleted'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.createTaller = async (req, res) => {
    try{
        const taller = new Taller({
            nombre: req.body.nombre,
            horario: req.body.horario,
            descripcion: req.body.descripcion,
            zona: req.body.zona,
            img: req.body.img,
            img_mapa: req.body.img_mapa
        });
        await taller.save();
        res.status(201).json({message: 'Taller creado'})
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.editTaller = async (req, res) => {
    try{
        const taller = {
            nombre: req.body.nombre,
            horario: req.body.horario,
            descripcion: req.body.descripcion,
            zona: req.body.zona,
            img: req.body.img,
            img_mapa: req.body.img_mapa
        };
        await Taller.findByIdAndUpdate(req.params.id,{$set: taller}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Taller updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.deleteTaller = async (req, res) => {
    try{
        await Taller.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Taller deleted'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.editMapa = async (req, res) => {
    try{
        const mapa = {
            imagen: req.body.imagen,
            puntos: req.body.puntos,
        };
        await Mapa.findByIdAndUpdate(req.params.id,{$set: mapa}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Mapa updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.createMapa = async (req, res) => {
    try{
        const mapaex = await Mapa.find();
        const mapa = new Mapa({
            imagen: req.body.imagen,
        });
        console.log(mapa);
        await Mapa.findByIdAndUpdate(mapa._id, mapa, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Mapa guardado'})
        if (mapaex == null) {
            await mapa.save();
            res.status(201).json({message: 'Mapa creado'})
        }else {
            await Mapa.findByIdAndUpdate(mapaex._id, mapa);
            res.status(201).json({message: 'Ya había un mapa, se ha sustituido'})
        }
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.createComoLlegar = async (req, res) => {
    try{
        const comollegar = new ComoLlegar({
            nombre: req.body.nombre,
            ubicompleta: req.body.ubicompleta,
            urlmapa: req.body.urlmapa,
            img: req.body.img
        });
        await comollegar.save();
        res.status(201).json({message: 'ubicacion creada'})
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

module.exports = adminappCtrl;
