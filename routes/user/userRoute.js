//module dependencies
const express = require('express');
const router = express.Router();
const user = require('./user.js');

//router.post('/signup', user.signup);

//router.post('/signin', user.signin);

router.get('/getUser', user.getUser);

module.exports = router;