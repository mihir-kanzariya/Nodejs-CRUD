const express = require('express');
const router = express.Router();

//Open APIs, any user can access this endpoint without having login
router.get('/*', (req, res) => {
	res.status(200).json({ message: "It is accesible to all."})
});

// *** You can define more open routes here. ***

module.exports = router;