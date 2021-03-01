//module dependencies
const express = require('express');
const router = express.Router();
const diets = require('./diets.js');

router.post('/postRiceDiets', diets.postRiceDiets);

router.post('/postSoupDiets', diets.postSoupDiets);

router.post('/postSideDiets1', diets.postSideDiets1);

router.post('/postSideDiets2', diets.postSideDiets2);

router.post('/postDietsRatingsInit', diets.postDietsRatingsInit);

router.get('/getAllDiets', diets.getAllDiets);

router.patch('/patchSelectedDietsRatingsInit', diets.patchSelectedDietsRatingsInit);

router.patch('/patchSelectedDietsRatings', diets.patchSelectedDietsRatings);

module.exports = router;