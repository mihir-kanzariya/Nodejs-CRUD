const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		default: "",
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type:String,
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
	updatedBy: {
		type:String,
		ref:'User'
	},
});

var User = module.exports = mongoose.model('users', UserSchema);

// Create User
module.exports.createUser = (data) => {
	return new Promise ((resolve, reject) => {
			bcrypt.genSalt(10, function (err, salt) {
				return bcrypt.hash(data.password, salt,  (err, hash) => {
					data.password = hash;          
					new User(data).save((err, Data) => {
						if(err) {
							reject(err);
						} else {
							resolve(Data)
						}
					});
				});
			});
	});
}

// Update existing user
module.exports.updateUser =  (query, condition) => {
	return new Promise((resolve, reject) => {
		User.updateOne(query, condition, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};
