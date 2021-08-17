const express = require('express');
const app = express();
const cors = require('cors');
const { NaryNode, NaryTree } = require('./utility/NaryTree');

const PORT = process.env.PORT || 4000;

/**
 * An express error handler for handling invalid JSON requests submitted to the API
 */
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

// Listen on the process environment designated port or the  default port
app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
});


