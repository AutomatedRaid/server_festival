const mongoose = require('mongoose');
const {Schema} = mongoose;

const FaqSchema = new Schema({
    question: String,
    answer: String
});

module.exports = mongoose.model('Faq', FaqSchema);
