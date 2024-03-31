const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    UserId: String,
    UserName: String,
    price: Number,
    date: Date,
});

mongoose.model('payment', paymentSchema);
