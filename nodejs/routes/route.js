//module dependencies
const express = require('express');
const router = express.Router();

//diet
const dietsRoute = require('./diets/dietsRoute.js');
router.use('/diets', dietsRoute);

const usersRoute = require('./users/usersRoute.js');
router.use('/users', usersRoute);

const calendarsRoute = require('./calendars/calendarsRoute.js');
router.use('/calendars', calendarsRoute);


//exports
module.exports = router;