const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTE HANDLES
exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, resp) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    resp.status(200).json({
      status: 'success',
      data: { tours: tour },
    });
  } else {
    resp.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};

exports.createTour = (req, resp) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      resp.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, resp) => {
  if (req.params.id) {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    if (tour) {
      resp.status(200).json({
        status: 'success',
        data: { tour: '<updated tour>' },
      });
    } else {
      resp.status(404).json({
        status: 'fail',
        message: 'invalid id',
      });
    }
  } else {
    resp.status(404).json({
      status: 'fail',
      message: 'missing id',
    });
  }
};

exports.deleteTour = (req, resp) => {
  if (req.params.id) {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    if (tour) {
      resp.status(204).json({
        status: 'success',
        data: null,
      });
    } else {
      resp.status(404).json({
        status: 'fail',
        message: 'invalid id',
      });
    }
  } else {
    resp.status(404).json({
      status: 'fail',
      message: 'missing id',
    });
  }
};
