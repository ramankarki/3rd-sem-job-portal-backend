const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 9000

app.all('/*', (req, res) => {
	res.json({ status: '400', message: `${req.originalUrl} not found` })
})

mongoose.connect()

app.listen(9000, () => console.log(`Server is running on port ${PORT}`))
