const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

exports.signup = catchAsync(async (req, res) => {
	const user = new User(req.body)
	await user.save()
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
	res.setHeader(
		'Set-Cookie',
		`token=${token}; path=/; domain=localhost; httpOnly=true`
	)
	res.json({ token, user })
})

exports.login = catchAsync(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email, password }).select('+password')
	if (!user) throw new AppError(401, 'Wrong email or password!')
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
	res.setHeader(
		'Set-Cookie',
		`token=${token}; path=/; domain=localhost; httpOnly=true`
	)
	res.json({ token, user })
})

exports.me = catchAsync(async (req, res) => {
	const decoded = jwt.decode(req.token)
	if (!decoded) throw new AppError(401, 'Unauthorized')
	const user = await User.findById(decoded.id)
	res.json(user)
})

exports.update = catchAsync(async (req, res) => {
	const decoded = jwt.decode(req.token)
	if (!decoded) throw new AppError(401, 'Unauthorized')
	const user = await User.findByIdAndUpdate(decoded.id, req.body, { new: true })
	res.json({ user })
})
