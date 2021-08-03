const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
// Require the createUserToken method
const { createUserToken } = require('../middleware/auth');

const router = express.Router();

// Register Route
// POST /api/register
router.post('/register', async (req, res, next) => {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ email: req.body.email, password });
      res.status(201).json(user);
    } catch (error) {
      // return the next callback and pass it the error from catch
      return next(error);
    }
  });

// Log In Route
// POST /api/login
router.post('/login', async (req, res, next) => {
    try {
	    const user = await User.findOne({ email: req.body.email })

        // Pass the user and the request to createUserToken
		const token = createUserToken(req, user);
    
		// createUserToken will either throw an error that will be caught by our error handler or 
        // will send back a token that we'll in turn send to the client.
		res.json({ token });
    } catch(error) {
        next(error);
    }
});

module.exports = router;