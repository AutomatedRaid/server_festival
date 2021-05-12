const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');
const config = require('./config');


//settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: ['http://82.223.151.201:8100','http://82.223.151.201:4200']}));
//app.use(cors({origin: ['http://localhost:8100','http://localhost:4200']}));
app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
}));
//Routes
app.use('/api/eventapp', require('./routes/eventapp.routes'));
app.use('/api/adminapp', require('./routes/adminapp.routes'));
app.use('/api/userauth', require('./routes/auth.routes'));
//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});


