const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
// Require the createUserToken method
const { createUserToken } = require('../middleware/auth');

const router = express.Router();
let errorFlag=false;
let errorMessage="";

// Register Route
// POST /api/register
router.post('/register', async (req, res) => {
    errorFlag=false;
    // console.log(req.body);
    if ( (req===undefined) || (req.body===undefined) ) {
        errorMessage="An invalid or incomplete request has been made for registration."; 
        errorFlag=true;
    }
    if ( (req.body.password===undefined) || (req.body.password===null) ) {
        errorMessage="Please enter a password for your user account.";  
        errorFlag=true;
    }
    if ( (req.body.first_name===undefined) || (req.body.first_name===null) ) {
        errorMessage="Please enter your first name.";  
        errorFlag=true;
    }
    if ( (req.body.last_name===undefined) || (req.body.last_name===null) ) {
        errorMessage="Please enter your last name.";  
        errorFlag=true;
    }
    if ( (req.body.email===undefined) || (req.body.email===null) ) {
        errorMessage="Please enter your email address.";  
        errorFlag=true;
    }

    if (errorFlag===true) {
        return res.status(400).json({"ErrorMessage": errorMessage})    
    }

    const userRecord = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        title: req.body.title,
        company: req.body.company,
        email: req.body.email,
        password: "",
        status: "Active",
        created: Date.now(),
        last_access: Date.now(),
    };

    try {
      const password = await bcrypt.hash(req.body.password, 10);
      userRecord.password=password;
      const user = await User.create(userRecord);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(503).json({"ErrorMessage": "Your registration could not be processed.  Please check your input and try again."})   
    }
  });

// Log In Route
// POST /api/login
router.post('/login', async (req, res) => {

    errorFlag=false;

    if ( (req===undefined) || (req.body===undefined) ) {
        errorMessage="An invalid or incomplete request has been made for registration."; 
        errorFlag=true;
    }
    if ( (req.body.email===undefined) || (req.body.email===null) ) {
        errorMessage="Please enter your email address to log in.";  
        errorFlag=true;
    }
    if ( (req.body.password===undefined) || (req.body.password===null) ) {
        errorMessage="Please enter your password to log in.";  
        errorFlag=true;
    }

    if (errorFlag===true) {
        return res.status(400).json({"ErrorMessage": errorMessage})    
    }

    try {
	    const user = await User.findOne({ email: req.body.email })

        // Pass the user and the request to createUserToken
		const token = createUserToken(req, user);
    
		// createUserToken will either throw an error that will be caught by our error handler or 
        // will send back a token that we'll in turn send to the client.
		res.json({ token });
    } catch(error) {
        console.log(error);
        return res.status(503).json({"ErrorMessage": "You have not successfully logged in.  Please check your account credentials and try again."})         
    }
});

module.exports = router;