//module dependencies
const express = require('express');
const router = express.Router();
const diets = require('./diets.js');

router.get('/getSoupDiets', diets.getSoupDiets);

router.get('/getSideDiets', diets.getSideDiets);

module.exports = router;