const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');


//settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(cors({origin: ['http://45.84.0.19:8100','http://45.84.0.19:4200']}));
app.use(cors({origin: ['http://localhost:8100','http://localhost:4200']}));
//Routes
app.use('/api/eventapp', require('./routes/eventapp.routes'));
app.use('/api/adminapp', require('./routes/adminapp.routes'));
app.use('/api/userauth', require('./routes/auth.routes'));
//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});


