const mongoose = require('mongoose');
const {Schema} = mongoose;

const TallerSchema = new Schema({
    nombre: String,
    horario: String,
    fecha: String,
    descripcion: String,
    img: String,
    img_mapa: String,
    ubicacion: String
});

module.exports = mongoose.model('Taller', TallerSchema);
