var mongoose = require('mongoose');

var ratingsSchema = new mongoose.Schema(
    {
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
            required: true
        }
    }, { versionKey : false 
    }
);

module.exports = mongoose.model('ratings', ratingsSchema);