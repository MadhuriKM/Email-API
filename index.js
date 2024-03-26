const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { StatusCodes } = require('http-status-codes')
dotenv.config()
const dbConnect = require('./db/connect')


const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("templates"))

app.use(cors())

app.get(`/`, async (req,res) => {
    return res.status(StatusCodes.OK).json({ success: true, msg: "Welcome to email api"})
})

app.use(`/api/mail`, require('./route/mailRoute'))

app.all(`/*`, async (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: "Requested path not found"})
})

app.listen(PORT, () => {
    dbConnect()
    console.log(`server is started and running @ http://localhost:${PORT}`)
})
