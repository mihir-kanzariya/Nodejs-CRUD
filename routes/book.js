const express = require('express');
const router = express.Router();

// Actions
const booksAction = require('../actions/books.action.js')

// Routes
router.post('/new', booksAction.insertBook);
router.delete('/:bookId', booksAction.deleteBook);
router.get('/*', (req, res) => {
	res.status(200).json({ message: "It is accesible to all."})
});

module.exports = router;