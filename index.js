const env = require('./config/env');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(`mongodb+srv://test:${env.mongo_ps}@test.wgiswft.mongodb.net/`);

const app = express();

// enable cross-origin dnt remove
app.use(cors());

app.use(bodyParser.json());

// models
require('./models/user');

//routes
require('./routes/authRoutes')(app);

console.log('running', env.mongo_ps);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
