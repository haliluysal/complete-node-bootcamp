const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); // middleware, between request and response
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server side!',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.send('You can pos to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// app.get('/api/v1/tours', (req, resp) => {
//   resp.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// });

app.get('/api/v1/tours/:id?', (req, resp) => {
  let tour = tours;
  if (req.params.id) {
    const id = req.params.id * 1;
    tour = tours.find((el) => el.id === id);
  }
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
});

app.post('/api/v1/tours', (req, resp) => {
  //   console.log(req.body);
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
});

app.patch('/api/v1/tours/:id?', (req, resp) => {
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
});

app.delete('/api/v1/tours/:id', (req, resp) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
