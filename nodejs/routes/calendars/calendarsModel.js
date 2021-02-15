var mongoose = require('mongoose');

var calendarsSchema = new mongoose.Schema({
    users_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }},{ versionKey : false 
});

module.exports = mongoose.model('calendars', calendarsSchema);