//module dependencies
const express = require('express');
const router = express.Router();
const calendars = require('./calendars.js');

router.get('/getCalendars', calendars.getCalendars);

router.post('/postCalendars', calendars.postCalendars);

module.exports = router;