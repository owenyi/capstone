//module dependencies
const express = require('express');
const app = express();
const db = require('./routes/configs/dbConnection');

app.use(express.json());

//apiRouter
const apiRouter = require('./routes/route.js');
app.use('/api', apiRouter);

//scheduler
const cron = require('node-cron');
const diets = require('./routes/diets/diets.js')
cron.schedule('0 0 1 * *', () => {
    try{
        console.log("평점을 평탄화 시작...");
        diets.flattenDietsRatings();
    } catch (e) {
        console.error(e);
    }
});

//exports
module.exports = app;