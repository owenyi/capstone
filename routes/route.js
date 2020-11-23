//module dependencies
const express = require('express');
const router = express.Router();

//users
const userRoute = require('./user/userRoute.js');
router.use('/user', userRoute);

//exports
module.exports = router;