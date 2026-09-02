const express = require('express')
const cors = require('cors')
const skillRouter = require('./routes/skill')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', skillRouter)

app.get('/healthcheck', (req,res)=>{
    res.status(200).send('OK')
})

module.exports = app