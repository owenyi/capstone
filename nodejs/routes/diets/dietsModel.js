var mongoose = require('mongoose');

var dietsSchema = new mongoose.Schema({
    dietName: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    serving: {
        type: Number,
        required: true
    },
    kcal:  {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    calcium: {
        type: Number,
        required: true
    },
    ferrum: {
        type: Number,
        required: true
    },
    phosphorus: {
        type: Number,
        required: true
    },
    zinc: {
        type: Number,
        required: true
    },
    selenium: {
        type: Number,
        required: true
    },
    vitamin_B1: {
        type: Number,
        required: true
    },
    vitamin_B2: {
        type: Number,
        required: true
    },
    folate: {
        type: Number,
        required: true
    },
    vitamin__C: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('tb_diets', dietsSchema);