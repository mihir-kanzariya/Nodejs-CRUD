const express = require('express');
const router = express.Router();

// Actions
const usersAction = require('../actions/users.action.js')

// Auth services
const authService = require('../services/auth.service.js')

// Routes
router.post('/login', authService.login);
router.post('/signup',  usersAction.createUser);

module.exports = router;