//module dependencies
const express = require('express');
const app = express();

app.use(express.json());

//apiRouter
const apiRouter = require('./routes/route.js');
app.use('/api', apiRouter);

//exports
module.exports = app;

