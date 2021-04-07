const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authCtrl = {};

authCtrl.singup = async (req, res) =>{

    const userfind = await User.findOne({ email: req.body.email });
    if (userfind != null) return res.status(404).json({ message: "Este email ya existe" });

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: await User.encryptPassword(req.body.password),// preguntar a fran sobre el encriptado de la password, se hace el encriptado cuando llega y se envia la contraseña descifrada?
    });

    const savedUser = await user.save();
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {expiresIn: 86400});

    res.status(200).json({ token: token });
};

authCtrl.singin = async (req, res) =>{
    const userfound = await User.findOne({ email: req.body.email });
    if (userfound == null) return res.status(400).json({ message: "Este email no existe" });
    if(!await User.checkPassword(req.body.password, userfound.password)) {
        res.status(400).json({ message: "Error password" });
    }
    const token = jwt.sign({id: userfound._id}, config.SECRET, {
        expiresIn: 864000
    });
    res.status(200).json({ toke: token, message: "Success login" });
};

module.exports = authCtrl;
