const Tour = require('../models/tourModel');

// ROUTE HANDLES
exports.getAllTours = async (req, resp) => {
  try {
    const tours = await Tour.find();
    resp.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    resp.status(404).json({
      status: 'fail',
      message: 'No tour to diplay',
    });
  }
};

exports.getTour = async (req, resp) => {
  try {
    const tour = await Tour.findById(req.params.id);
    resp.status(200).json({
      status: 'success',
      data: { tours: tour },
    });
  } catch (error) {
    resp.status(404).json({
      status: 'fail',
      message: 'Tour does not exist',
    });
  }
};

exports.createTour = async (req, resp) => {
  try {
    const newTour = await Tour.create(req.body);
    resp.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: 'fail',
      message: 'Invalid data send',
    });
  }
};

exports.updateTour = async (req, resp) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    resp.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: 'fail',
      message: 'Invalid data send',
    });
  }
};

exports.deleteTour = async (req, resp) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    resp.status(204).json({
      status: 'success',
    });
  } catch (err) {
    resp.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};
