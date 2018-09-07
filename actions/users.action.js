
const User = require('../models/users.models.js')

exports.createUser = async function (req, res) {

	req.checkBody('name', 'name is required').notEmpty();
	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('email', 'email is required').notEmpty().isEmail();
	req.checkBody('password', 'password is required').notEmpty();

	const errors = req.validationErrors();

	if(errors) {
		return res.status(400).json({
				Error: true,
				message: errors[0].msg
		});
	}

	try{
		await User.createUser({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: 'user',
		})

		res.status(201).json({
			Error: false,
			message: "Account successfully created."
		})
	} catch(err) {
		res.status(400).json({
			Error: true,
			message: err._message
		})
	}
}

exports.updateUser = async function (req, res) {
	try{
		await User.updateOne({
			username: req.params.userName
		},{
			name: req.body.name
		})

		res.status(200).json({
			Error: false,
			message: "User successfully Updated."
		})
	} catch(err) {
		res.status(400).json({
			Error: true,
			message: "Operation failed."
		})
	}
}

exports.deleteUser = async function (req, res) {
	try{
		await User.deleteOne({
			_id: req.params.userName
		})

		console.log("delete", deleteUser)
		res.status(200).json({
			Error: false,
			message: "User successfully Deleted."
		})
	} catch(err) {
		res.status(400).json({
			Error: true,
			message: "Operation failed. "+err
		})
	}
}

exports.getUsers = async function (req, res) {
	try{
		let users = await User.find({})
		console.log(users)
		res.status(200).json({
			Error: false,
			Data: users
		})
	} catch(err) {
		res.status(400).json({
			Error: true,
			message: "Operation failed. "+err
		})
	}
}


