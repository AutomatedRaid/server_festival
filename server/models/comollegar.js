const mongoose = require('mongoose');
const {Schema} = mongoose;

const ComoLlegarSchema = new Schema({
    nombre: String,
    ubicompleta: String,
    urlmapa: String,
    img: String,
});

module.exports = mongoose.model('ComoLlegar', ComoLlegarSchema);
