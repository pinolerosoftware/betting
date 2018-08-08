const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Creamos el objeto
const UserSchema = Schema({
    username: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    email: { type: String, unique: true, lowercase: true },
    phone: String,
    firstname: String,
    lastname: String,
    dateregistration: { type: Date, default: Date.now() },
    confirmated: Boolean,
    codeconfirmated: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
