//module dependencies
const express = require('express');
const app = express();
const db = require('./routes/config/dbConnection');

app.use(express.json());

//apiRouter
const apiRouter = require('./routes/route.js');
app.use('/api', apiRouter);

//exports
module.exports = app;
