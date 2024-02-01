const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');

router
  .route('/top-5-cheapest')
  .get(tourController.aliasTop5Tours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour);
router.route('/:id').delete(tourController.deleteTour);

module.exports = router;
