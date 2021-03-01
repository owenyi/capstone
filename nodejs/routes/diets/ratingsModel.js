const mongoose = require('mongoose');

var ratingsSchema = new mongoose.Schema({
    users_idx: {
        type: Number,
        required: true
    },
    diets_idx: {
        type: Number,
        requird: true
    },
    rating: {
        type: Number,
        requird: true
    },
    registedDate: {
        type: Date,
        requird: true
    }},{ versionKey : false 
});

module.exports = mongoose.model('ratings', ratingsSchema);
