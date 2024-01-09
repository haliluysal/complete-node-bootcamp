const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const exp = require('constants');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
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

// ROUTE HANDLES
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

const getAllUsers = (req, resp) => {
  resp.status(500).json({
    staus: 'error',
    message: "This route hasn't implemented yet.",
  });
};

const getUser = (req, resp) => {
  resp.status(500).json({
    staus: 'error',
    message: "This route hasn't implemented yet.",
  });
};

const createUser = (req, resp) => {
  resp.status(500).json({
    staus: 'error',
    message: "This route hasn't implemented yet.",
  });
};

const updateUser = (req, resp) => {
  resp.status(500).json({
    staus: 'error',
    message: "This route hasn't implemented yet.",
  });
};

// ROUTES
const tourRouter = express.Router(); // --> this is actually a middleware
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour);
tourRouter.route('/:id?').delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser);

app.use('/api/v1/tours', tourRouter); // --> mounting new router on top of the previous
app.use('/api/v1/users', userRouter);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id?', deleteTour);

// SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
