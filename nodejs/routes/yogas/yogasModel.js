var mongoose = require('mongoose');

var yogasSchema = new mongoose.Schema({
    trimester: {
        type: String,
        required: true
    },
    pose: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }},{ versionKey : false 
});

module.exports = mongoose.model('yogas', yogasSchema);