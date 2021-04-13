const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

async function verifyToken(req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        console.log(token);
        if (!token) return res.status(403).json({message: 'No token provided'});
        if(token.split(" ")[0] !== "Bearer") return res.status(400).json({ message: "Token invalid "});
        const decoded = jwt.verify(token.split(" ")[1], config.SECRET);

        req._id = decoded.id;
        const user = await User.findById(req._id, {password: 0});
        if (!user) return res.status(404).json({ message: "No user found "});

        next();
    } catch (e) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports = verifyToken;
