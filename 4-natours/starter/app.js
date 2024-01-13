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
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
