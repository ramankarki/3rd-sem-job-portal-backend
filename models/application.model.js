const { Schema, model } = require('mongoose')

const applicationSchema = new Schema(
	{
		companyId: { type: Schema.Types.ObjectId, required: true },
		jobId: { type: Schema.Types.ObjectId, required: true },
		userId: { type: Schema.Types.ObjectId, required: true },
		resume: { type: String, required: true },
		coverLetter: { type: String },
		status: {
			type: String,
			enum: ['REVIEW', 'ACCEPTED', 'REJECTED'],
			default: 'REVIEW',
		},
	},
	{ timestamps: true }
)

module.exports = model('applications', applicationSchema)
