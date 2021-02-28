//module dependencies
const express = require('express');
const router = express.Router();
const yogas = require('./yogas.js');

router.get('/getYogas', yogas.getYogas);

module.exports = router;