const mongoose = require('mongoose');

const url = "mongodb://developer:rkdgml11@13.125.245.6:27017/capstone"

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})

var db = mongoose.connection;

db.once('open', function() {
    console.log('connected successfully');
});

db.on('error', console.error.bind(console, 'connection error:'));
