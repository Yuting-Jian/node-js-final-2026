const express = require('express')
const cors = require('cors')
const skillRouter = require('./routes/skill')
const creditPackageRouter = require('./routes/creditPackage')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', skillRouter)
app.use('/api', creditPackageRouter)

app.get('/healthcheck', (req,res)=>{
    res.status(200).send('OK')
})

module.exports = app