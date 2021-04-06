const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');
const  config = require('./config');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(cors({origin: ['http://45.84.0.19:8100','http://45.84.0.19:4200']}));
app.use(cors({origin: ['http://localhost:8100','http://localhost:4200']}));
//Routes
app.use('/api/eventapp', require('./routes/eventapp.routes'));
app.use('/api/adminapp', require('./routes/adminapp.routes'));
app.use('/api/users', require('./routes/users.routes'));
//Starting the server
app.listen(config.port, () => {
    console.log('Server on port ', config.port);
});


