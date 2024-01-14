const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

const getTour = (val) => {
  // this does not need to be exported
  const id = val * 1;
  return tours.find((el) => el.id === id);
};

exports.checkID = (req, resp, next, val) => {
  const tour = getTour(val);
  if (!tour) {
    return resp.status(404).json({
      // returns on this middleware!
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, resp, next) => {
  let msg = '';
  if (!req.body.name && !req.body.price) {
    msg = 'missing properties: name, price';
  } else if (!req.body.name) {
    msg = 'missing property: name';
  } else if (!req.body.price) {
    msg = 'missing property: price';
  }
  if (msg !== '') {
    return resp.status(400).json({
      status: 'fail',
      message: msg,
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
  const tour = getTour(req.params.id);
  resp.status(200).json({
    status: 'success',
    data: { tours: tour },
  });
};

exports.createTour = (req, resp) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      resp.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    data: { tour: '<updated tour>' },
  });
};

exports.deleteTour = (req, resp) => {
  resp.status(204).json({
    status: 'success',
    data: null,
  });
};
