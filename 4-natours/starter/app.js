const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// MIDDLEWARE
app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // middleware, between request and response

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
