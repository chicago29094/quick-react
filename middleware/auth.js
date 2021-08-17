/*
 * Require the needed npm packages for JWT request authorization and authentication
 */
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
 * Create a secret to be used to encrypt/decrypt the token
 */
const secret = process.env.JWT_SECRET || 'SHJHJG2367tj267ghjg1';

/*
 * Require the specific `strategy` we'll use to authenticate
 * Require the method that will handle extracting the token from client requests
 */
const { Strategy, ExtractJwt } = require('passport-jwt');


/*
 * Minimum required options for passport-jwt
 */
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: secret,
};

/*
 * Require the user model
 */
const User = require('../models/user');

/*
 * We're configuring the strategy using the constructor from passport
 * so we call new and pass in the options we set in the `opts` variable.
 * The callback will be passed the data that was extracted and decrypted 
 * by passport from the token that we get from the client request!  
 * This data (jwt_payload) will include the user's id!
 */
const strategy = new Strategy(opts, async function (jwt_payload, done) {

	/*
	 *  In the callback we run our custom code. With the data extracted from
	 *  the token that we're passed as jwt_payload we'll have the user's id.
	 *  Using Mongoose's `.findOneById()` method, we find the user in our database
	 */
    try {
        const user = await User.findById(jwt_payload.id);
	    done(null, user);
    } catch(error) {
        done(err);
    }
});

/*
 * 'register' the defined strategy fo that passport uses it when we 
 * call the passport.authenticate() method in our routes
 */
passport.use(strategy);

/*
 * Initialize the passport middleware based on the above configuration
 */
passport.initialize();

/*
 * Create a variable that holds the authenticate method so we can
 * export it for use in our routes
 */
const requireToken = passport.authenticate('jwt', { session: false } );

/*
 * Create a function that takes the request and a user document
 * and uses them to create a token to send back to the user
 */
const createUserToken = (req, user) => {

	if ( !user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password) ) {
		const err = new Error('The provided username or password is incorrect');
		err.statusCode = 422;
		throw err;
	}
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

/*
 * Export token methods
 */
module.exports = {
	requireToken,
	createUserToken,
};

