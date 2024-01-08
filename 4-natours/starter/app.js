const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); // middleware, between request and response

app.use((req, resp, next) => {
  console.log('Hello from the middleware ❤️');
  //   never forget to use "next"
  next();
});

app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, resp) => {
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

const createTour = (req, resp) => {
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

const updateTour = (req, resp) => {
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

const deleteTour = (req, resp) => {
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

app.route('/api/v1/tours').get(getAllTours).post(createTour);
// app.use((req, resp, next) => {
//   // since it is coming after get all tours, it does not respond to get all tours.
//   // ORDER MATTERS FOR THE MIDDLEWARE
//   console.log('Hello from the middleware ❤️');
//   //   never forget to use "next"
//   next();
// });
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour);
app.route('/api/v1/tours/id?').delete(deleteTour);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id?', deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
