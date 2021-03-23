const mongoose = require('mongoose');
const {Schema} = mongoose;

const TallerSchema = new Schema({
    nombre: String,
    horario: String,
    descripcion: String,
    img: String
});

module.exports = mongoose.model('Taller', TallerSchema);
