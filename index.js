const express = require('express')
const mongoose = require('mongoose')
const generateImageRoute = require('./routes/generateImageRoute')


const app = express()

// middlewares
app.use(express.json())


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

// routes
// app.use('/', (req, res) => res.send("Hello from API"))
app.use('/api/generate', generateImageRoute)


// run the app
app.listen(4000, () => {
    console.log("The Server is running on Port 4000")
})