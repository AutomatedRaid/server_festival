const mongoose = require('mongoose');
const {Schema} = mongoose;

const MapaSchema = new Schema({
    id: String,
    imagen: String
});

module.exports = mongoose.model('Mapa', MapaSchema);
