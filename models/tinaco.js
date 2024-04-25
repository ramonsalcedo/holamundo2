var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true       
    },
    idTinaco: {
        type: String,
        required: true
        
    },
    name: {
        type: String,
        default: ''
    },
});
var tinaco = new mongoose.model('tinaco', schema);
module.exports = tinaco;