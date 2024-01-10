const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getTour = (val) => {
  // this does not need to be exported
  const id = val * 1;
  return tours.find((el) => el.id === id);
};

exports.checkID = (req, resp, next, val) => {
  tour = getTour(val);
  if (!tour) {
    return resp.status(404).json({
      // returns on this middleware!
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

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
  tour = getTour(req.params.id);
  resp.status(200).json({
    status: 'success',
    data: { tours: tour },
  });
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
  tour = getTour(req.params.id);
  resp.status(200).json({
    status: 'success',
    data: { tour: '<updated tour>' },
  });
};

exports.deleteTour = (req, resp) => {
  tour = getTour(req.params.id);
  resp.status(204).json({
    status: 'success',
    data: null,
  });
};
