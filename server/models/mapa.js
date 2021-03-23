const mongoose = require('mongoose');
const {Schema} = mongoose;

const MapaSchema = new Schema({
    imagen: String,
    puntos: [String]
});

module.exports = mongoose.model('Mapa', MapaSchema);
