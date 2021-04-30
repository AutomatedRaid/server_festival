const mongoose = require('mongoose');
const {Schema} = mongoose;

const RestauranteSchema = new Schema({
    nombre: String,
    imagen: [String],
    horario: String,
    localizacion: String
});

module.exports = mongoose.model('Restaurante', RestauranteSchema);
