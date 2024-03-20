const AppError = require('./../utils/AppError')

module.exports = async (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'
	console.error(err)

	if (process.env.NODE_ENV !== 'production') {
		if (err.body?.error === 'invalid_grant') {
			req.user.spotify = {}
			await req.user.save()
			err.message = 'Spotify access revoked'
		}

		res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		})
	} else if (process.env.NODE_ENV === 'production') {
		/**
		 * @desc error detecting pipeline
		 *  */

		if (`${err.reason}`.startsWith('Error'))
			err.message = `Invalid ${err.path}: ${err.value}`

		if (err.code === 11000)
			err.message = `${Object.keys(err.keyValue)[0]} already used.`

		if (err.errors) {
			const errors = Object.values(err.errors).map((el) => el.message)
			err.message = `Invalid input data. ${errors.join('. ')}`
		}

		if (err.name && err.name === 'JsonWebTokenError')
			err.message = 'Invalid token. Please login again!'

		if (err.name && err.name === 'TokenExpiredError')
			err.message = 'Token expired! Please login again!'

		if (err.code === 'LIMIT_FILE_SIZE')
			err = new AppError(400, 'File too large. Max limit is 5MB.')

		if (err.body?.error === 'invalid_grant') {
			req.user.spotify = {}
			await req.user.save()
			err.message = 'Spotify access revoked'
		}

		res.status(err.statusCode).json({
			status: err.status,
			message: err.message || 'Something went wrong !',
		})
	}
}
