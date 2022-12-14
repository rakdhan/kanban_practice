require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const routes = require('./routes')
// const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
// app.use(errorHandler)

app.listen(port, ()=> {console.log(`HIYAA KANBAN ON PORT ${port}`)})
