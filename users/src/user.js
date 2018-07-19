const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String
});

const User = mongoose.model('user', UserSchema); // the user here means the whole collection

module.exports = User;