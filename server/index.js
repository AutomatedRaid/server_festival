const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');
const config = require('./config');
const path = require('path');

//settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//app.use(cors({origin: ['http://45.84.0.19:8100','http://45.84.0.19:4200']}));
app.use(cors({origin: ['http://localhost:8100','http://localhost:4200']}));
app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
}));
//Routes
app.use('/api/eventapp', require('./routes/eventapp.routes'));
app.use('/api/adminapp', require('./routes/adminapp.routes'));
app.use('/api/userauth', require('./routes/auth.routes'));
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
