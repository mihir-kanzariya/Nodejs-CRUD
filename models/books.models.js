const mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
	title: {
		type: String,
		default: "",
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	pages: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type:Date,
		default:function() {
			return new Date();
		}
	},
	deletedAt: {
		type: Date,
		default: "",
	},
	updatedAt: {
		type:Date,
		default:function() {
			return new Date();
		},
	},
});

var Book = module.exports = mongoose.model('books', BookSchema);

// Insert Boook
module.exports.insertBook = (data) => {
	return new Promise ((resolve, reject) => {
		new Book(data).save((err, Data) => {
			if(err) {
				reject(err);
			} else {
				resolve(Data)
			}
		});
	});
}

