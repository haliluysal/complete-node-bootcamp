const fs = require('fs');
const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour);
router.route('/:id?').delete(tourController.deleteTour);

module.exports = router;
