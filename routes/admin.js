const express = require('express');
const router = express.Router();

const auth = require('../services/auth.service.js')

router.get('/*', auth.validateToken, auth.isAdmin, (req, res) => {
	res.status(200).json({ message: "Hello from Admin side."})
});

module.exports = router;