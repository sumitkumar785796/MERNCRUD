require('dotenv').config()
const route = require('./routers/routers')
const express = require('express')
const app = express()
const PORT = process.env.PORT||5000
const connDB = require('./database/db')
const user = require('./models/user-model')
const cors = require('cors')
const path = require('path')
// Enable CORS
app.use(cors())
// Middleware to parse JSON
app.use(express.json())
// API routes
app.use("",route)
// Serve static files to react
app.use(express.static(path.resolve(__dirname,"client","build")))

// connect database and server running
connDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at http://localhost:${PORT}`)
    })
})