const mongoose = require('mongoose');

const URI = 'mongodb+srv://root:root@appfestival.9td5d.mongodb.net/festival';
mongoose.set('useFindAndModify', false);
mongoose.connect(URI).then(db => console.log('DB is connected')).catch(err => console.error(err));

module.exports = mongoose;
