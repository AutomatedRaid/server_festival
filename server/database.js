const mongoose = require('mongoose');
const config = require('./config');


mongoose.set('useFindAndModify', false);
mongoose.connect(config.db).then(db => console.log('DB is connected')).catch(err => console.error(err));

module.exports = mongoose;
