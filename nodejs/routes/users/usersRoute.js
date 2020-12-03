//module dependencies
const express = require('express');
const router = express.Router();
const users = require('./users.js');

router.post('/signup', users.signup);

router.post('/signin', users.signin);

router.post('/updateExpectedDate', users.updateExpectedDate);

module.exports = router;