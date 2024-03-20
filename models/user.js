const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    UserId: String,
    UserName: String,
    PassWord: String,
    Credits: { type: Number, default: 0 },
});

mongoose.model('user', userSchema);
