var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    age:  {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    expectedDate: {
        type: Date,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    signupDatetime: {
        type: Date,
        required: true
    },
    lstSigninDatetime: {
        type: Date,
        require: true
    }},{ versionKey : false 
});

module.exports = mongoose.model('users', usersSchema);