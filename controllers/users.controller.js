const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')

exports.signup = catchAsync(async (req, res) => {
	const user = new User(req.body)
	await user.save()
	res.json(user)
})
