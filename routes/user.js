const express = require('express');
const router = express.Router();

// Actions 
const usersAction = require('../actions/users.action.js')

// Authentication
const auth = require('../services/auth.service.js')

// User Routes.
router.get('/list', auth.validateToken, usersAction.getUsers); // Get all users

router.post('/new', auth.validateToken, usersAction.createUser); // Insert new user

router.put('/:userName', auth.validateToken, usersAction.updateUser); // Update user by username which is unique

router.delete('/:userName', auth.validateToken, usersAction.deleteUser); // Delete user by username which is unique

router.get('/*', auth.validateToken, (req, res) => {
	res.json({
		message: "User routes",
	})
});

module.exports = router;