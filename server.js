const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const jsonOnlyErrorHandler = async (err, req, res, next) => {
    res.status(500).send({ "ErrorMessage": "An invalid request was submitted.  Please check your input and try again.", "error": err });
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(jsonOnlyErrorHandler);

// User model controller and routes
const userController = require('./controllers/user');
app.use('/api', userController);

// Project model controller and routes
const projectController = require('./controllers/project');
app.use('/project', projectController);

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
})
