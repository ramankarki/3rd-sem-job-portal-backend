const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 9000
require('dotenv').config()
require('morgan')('dev')

const userController = require('./controllers/users.controller.js')
const errorController = require('./controllers/error.controller.js')

app.post('/users/signup', userController.signup)
app.route('/jobs')
app.route('/jobs/submissions')

app.all('/*', (req, res) => {
	res.json({ status: '400', message: `${req.originalUrl} not found` })
})

app.use(errorController)

mongoose
	.connect(process.env.MONGODB_URI)
	.then((value) => {
		console.log(`DB connected`)
		app.listen(9000, () => console.log(`Server is running on port ${PORT}`))
	})
	.catch((e) => console.error(e))
