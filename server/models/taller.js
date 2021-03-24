const mongoose = require('mongoose');
const {Schema} = mongoose;

const TallerSchema = new Schema({
    nombre: String,
    horario: String,
    descripcion: String,
    img: String,
    img_mapa: String
});

module.exports = mongoose.model('Taller', TallerSchema);
