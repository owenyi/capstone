var mongoose = require('mongoose');

var recommendSchema = new mongoose.Schema({
    users_idx: {
        type: Number,
        required: true
    },
    diets_idx: {
        type: Number,
        requird: true
    }},
    { collection: 'cf' }
    ,{ versionKey : false 
});

module.exports = mongoose.model('cf', recommendSchema);