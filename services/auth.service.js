const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

const User = require('../models/users.models.js')

// SECRET - We can define in .env file in development
const secret   = "Mihir@123"

// Login
exports.login    = async (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {

		if (err) return res.status(500).send('Error on the server.');
		
		if (!user) return res.status(404).send('No user found.');
	 
		// Check if the password is valid
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

		// If user is found and password is valid
		// Create a token
		var token = jwt.sign({ user }, secret, {
			expiresIn: 86400 // expires in 24 hours
		});

		// Return the information including token as JSON
		res.status(200).send({ auth: true, token: token });
	});

};

// Middleware to check if user is logged in or not.
exports.validateToken = async (req, res, next) => {
	// check header for token
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.status(500).json({Error: err})
			}
			// set user
			req.user = decoded.user;
			// if everything is good, save to request for use in other routes
			return next();
		});
	} else {
		return res.status(400).json(req, res, 'No token provided', 401);
	}
};

// Middleware to check requesting user is admin or not
exports.isAdmin = async (req, res, next) => {
		try {
			// Check logged in user in DB
			let user = await User.findOne({
				_id: req.user._id
			})

			// Check Role if admin or not
			if(user.role == "admin") {
				next();
			} else {
				return res.status(401).json({
					Error: true,
					message: 'You are not authorized to perform this action.',
				})				
			}
		} catch(err) {
			return res.status(500).json({
			Error: true,
				message: 'You are not authorized to perform this action.',
			})
		}
};

