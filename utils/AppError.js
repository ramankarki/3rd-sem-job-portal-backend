/** 
@Description Create intentional errors with AppError object and that object will be handled by globalErrorHandler.
*/

class AppError extends Error {
	constructor(statusCode, message) {
		super(message)

		this.statusCode = statusCode
		this.status = `${statusCode}`.startsWith(4) ? 'failed' : 'error'
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

module.exports = AppError
