//module dependencies
const express = require('express');
const app = express();
const db = require('./routes/configs/dbConnection');
// const cf = require('./python/cf.js');
const cron = require('node-cron');

app.use(express.json());

//apiRouter
const apiRouter = require('./routes/route.js');
app.use('/api', apiRouter);

cron.schedule('0 0 * * *?', async() => {
    try{
        await cf.pythonCf();
    } catch(e) {
    console.error(e);
    next(createError(404, e));
}
    console.log('reset cf');
});



//exports
module.exports = app;
