const mongoose = require('mongoose');
const {Schema} = mongoose;

const RestauranteSchema = new Schema({
    nombre: String,
    imagen: String,
    imagenes_carta: [String],
    horario: String,
    img_mapa: String,
    localizacion: String
});

module.exports = mongoose.model('Restaurante', RestauranteSchema);
