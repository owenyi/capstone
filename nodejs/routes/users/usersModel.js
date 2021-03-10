const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = require('../configs/dbConnection')
const connection = mongoose.createConnection(db.url, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

mongoose.set('useCreateIndex', true);
autoIncrement.initialize(connection);

var usersSchema = new mongoose.Schema({
    idx: {
        type: Number,
        required: false
    },
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

usersSchema.plugin(autoIncrement.plugin,{
    model : 'users',
    field : 'idx',
    startAt : 1,
    increment : 1
});
/*
users_idx 초기화
var user = connection.model('user', usersSchema),
use = new user();

use.save(function(err){
    use.idx === 0;
    use.nextCount(function(err, idx){
        idx === 1;
        use.resetCount(function(err, nextCount){
            nextCount === 0;
        });
    });
});
*/

module.exports = mongoose.model('users', usersSchema);
