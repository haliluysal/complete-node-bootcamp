const express = require('express');

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
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser);

module.exports = router;
