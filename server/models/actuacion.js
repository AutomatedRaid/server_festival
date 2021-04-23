const mongoose = require('mongoose');
const {Schema} = mongoose;

const ActuacionSchema = new Schema({
    nombre: String,
    horario: String,
    artistas: [String],
    descripcion: String,
    img: String,
    img_mapa: String,
    ubicacion: String
});

module.exports = mongoose.model('Actuacion', ActuacionSchema);
