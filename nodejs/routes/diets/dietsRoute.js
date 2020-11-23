//module dependencies
const express = require('express');
const router = express.Router();
const diets = require('./diets.js');

router.get('/getDiets', diets.getDiets);

module.exports = router;