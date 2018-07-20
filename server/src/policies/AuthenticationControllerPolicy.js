const Joi = require('joi')

module.exports = {
	register(req, res, next) {
		const schema = {
			email: Joi.string().email(),
			password: Joi.string().regex(
				new RegExp('^[a-zA-Z0-9]{3,32}$')
			)
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
 			switch (error.details[0].context.key) {
 				case 'email':
 					res.status(400).send({
 						message: 'Enter correct email (example@example.com)'
 					})
 					break
 				case 'password':
 					res.status(400).send({
 						message: 'password must be between 8 and 32 symbols and contains letters or digits'
 					})
 					break
 				default:
 					res.status(400).send({
 						message: req.body
 					})
 			}

		} else {
			next()
		}
	}
}