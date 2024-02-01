const Tour = require('../models/tourModel');

exports.aliasTop5Tours = (req, resp, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) filtering
    const queryObj = { ...this.queryString }; // deep copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2B) advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 3) field limiting
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 4) pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// ROUTE HANDLES
exports.getAllTours = async (req, resp) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const tours = await query;
    const tours = await features.query;

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
      message: error.message,
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
