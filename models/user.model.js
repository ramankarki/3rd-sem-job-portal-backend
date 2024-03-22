const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true, select: false },
		name: String,
		role: { type: String, enum: ['SEEKER', 'EMPLOYER'], required: true },
		skills: { type: [String] },
		company: {
			name: { type: String },
			industry: { type: String },
		},
	},
	{ timestamps: true }
)

module.exports = model('users', userSchema)
