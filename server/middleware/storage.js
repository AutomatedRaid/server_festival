const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        let name = `${file.fieldname}-${Date.now()}.${file.originalname.split(".")[1]}`;
        cb(null, name);
    }
});

const fileFilter = function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.originalname.split('.')[1]);
    if (mimetype) {
        return cb(null, true);
    }
    return cb(null, false);
};

const upload = multer({ storage, limits: {fileSize: 2000000}, fileFilter});

module.exports = upload;
