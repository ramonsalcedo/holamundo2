var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
        
    },
    name: {
        type: String,
        default: ''
    },
    fcm: {
        type: String,
        default: ''
    },
    celphone: String,
});
var user = new mongoose.model('User', schema);
module.exports = user;