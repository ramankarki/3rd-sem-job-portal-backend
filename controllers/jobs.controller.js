const catchAsync = require('../utils/catchAsync')
const Job = require('../models/job.model')
const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')

exports.create = catchAsync(async (req, res) => {
	const decoded = jwt.decode(req.token)
	if (!decoded) throw new AppError(401, 'Unauthorized')
	const body = {
		...req.body,
		companyId: new Types.ObjectId(decoded.id),
	}
	const job = new Job(body)
	await job.save()
	res.json(job)
})

exports.read = catchAsync(async (req, res) => {
	const job = await Job.findById(req.params.jobId).populate('companyId')
	res.json(job)
})

exports.readAll = catchAsync(async (req, res) => {
	let { page, limit, ...filter } = req.query
	page = ((+page || 1) - 1).toFixed(1)
	const skip = Math.trunc(+limit * +page) + 0
	const jobs = await Job.find(filter)
		.sort({ updatedAt: -1 })
		.skip(skip)
		.limit(limit)
		.populate('companyId')
	res.json(jobs)
})

exports.update = catchAsync(async (req, res) => {
	const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
		new: true,
	})
	res.json(job)
})

exports.delete = catchAsync(async (req, res) => {
	await Job.findByIdAndDelete(req.params.jobId)
	res.status(204).json()
})
