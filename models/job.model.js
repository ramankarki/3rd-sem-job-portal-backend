const { Schema, model } = require('mongoose')

const jobSchema = new Schema(
	{
		companyId: { type: Schema.Types.ObjectId, required: true },
		title: { type: String, required: true },
		description: { type: String },
		location: { type: String },
		skills: { type: [String] },
	},
	{ timestamps: true }
)

module.exports = model('jobs', jobSchema)
