const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
	const TWO_WEEK = 60 * 60 * 24 * 7 * 2
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: TWO_WEEK
	})
}

module.exports = {
	async register (req, res) {
		try {
		const user = await User.create(req.body)
		res.send(user.toJSON())
		} catch (err) {
			res.status(400).send({
				error: 'This email already in use'
			})
		}

	},

	async login (req, res) {
		try {
		const user = await User.findOne({
			where: {
			email: req.body.email
		}})
		if (!user) {
			res.send({
				message: "User not found"
			})
		}

		const isPasswordValid = await user.comparePassword(req.body.password)

		if (!isPasswordValid) {
			res.send({
				message: "Password is incorrect"
			})
		}

		const userJson = user.toJSON()

		res.send({
			user: userJson,
			token: jwtSignUser(userJson)
		})

	} catch (err) {
		res.status(400).send({
			message: "Server error"
		})
	}
}
}