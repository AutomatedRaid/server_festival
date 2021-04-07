const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    }
});

UserSchema.static('encryptPassword', async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
});


UserSchema.static('checkPassword', async function (password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
});

module.exports = mongoose.model('User', UserSchema);
