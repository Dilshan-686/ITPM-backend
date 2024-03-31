const env = require('./config/env');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(env.mongo_url);

const app = express();

// enable cross-origin dnt remove
app.use(
    cors({
        origin: '*',
        allowedHeaders: '*',
    })
);

app.options('*', cors());

app.use(bodyParser.json());

// models
require('./models/user');
require('./models/payment');

//routes
require('./routes/authRoutes')(app);
require('./routes/payment')(app);

console.log('running', env.mongo_ps);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
