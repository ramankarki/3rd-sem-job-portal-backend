const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 9000
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userController = require('./controllers/users.controller.js')
const jobController = require('./controllers/jobs.controller.js')
const errorController = require('./controllers/error.controller.js')

require('morgan')('combined')
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use((req, res, next) => {
	req.token = req.headers.authorization?.split(' ').at(1) || req.cookies.token
	next()
})

app.post('/users/signup', userController.signup)
app.post('/users/login', userController.login)
app.get('/users/me', userController.me)
app.patch('/users/update', userController.update)

app.post('/jobs', jobController.create)
app.get('/jobs', jobController.readAll)
app.get('/jobs/:jobId', jobController.read)
app.patch('/jobs/:jobId', jobController.update)
app.delete('/jobs/:jobId', jobController.delete)

app.all('/*', (req, res) => {
	res
		.status(400)
		.json({ status: '400', message: `${req.originalUrl} not found` })
})

app.use(errorController)

mongoose
	.connect(process.env.MONGODB_URI)
	.then((value) => {
		console.log(`DB connected`)
		app.listen(9000, () => console.log(`Server is running on port ${PORT}`))
	})
	.catch((e) => console.error(e))
