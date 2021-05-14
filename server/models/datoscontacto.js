const mongoose = require('mongoose');
const {Schema} = mongoose;

const DatosContactoSchema = new Schema({
    numero: String,
    correo: String,
});

module.exports = mongoose.model('DatosContacto', DatosContactoSchema);
