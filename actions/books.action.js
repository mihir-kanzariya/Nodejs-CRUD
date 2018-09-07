const Book = require('../models/books.models.js')

exports.insertBook = async function (req, res) {
	try {
		req.checkBody('title', 'title is required').notEmpty();
		req.checkBody('author', 'author is required').notEmpty();
		req.checkBody('pages', 'pages is required').notEmpty().isEmail();
		req.checkBody('description', 'description is required').notEmpty();

		const errors = req.validationErrors();

		if(errors) {
			return res.status(400).json({
					Error: true,
					message: errors[0].msg
			});
		}
		const insert = await Book.insertBook({
			title: req.body.title,
			author: req.body.author,
			pages: req.body.pages,
			description: req.body.description,
		})

		res.status(201).json({
			message: "Book inserted.",
			Error: false
		})
	} catch(err) {
		res.status(400).json({
			Error: true,
			message: err._message
		})
	}
}

exports.deleteBook = async function (req, res) {
	try {
		await Book.deleteOne({
			_id: req.params.bookId
		})

		res.status(200).json({
			Error: false,
			message: "Book successfully Deleted."
		})
	} catch(err) {
		res.status(400).json({
			Error: true,
			message: "Operation failed. "+err
		})
	}
}


