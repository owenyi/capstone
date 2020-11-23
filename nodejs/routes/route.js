//module dependencies
const express = require('express');
const router = express.Router();

//diet
const dietsRoute = require('./diets/dietsRoute.js');
router.use('/diets', dietsRoute);

//exports
module.exports = router;