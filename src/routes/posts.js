const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const connectionUrl = process.env.CONNECTION_URL
mongoose.connect(connectionUrl, (err) => {
    if(err) throw err
    else console.log('DB Connected')
})

router.get('/posts', (_req, res)=> {
    res.send('Posts')
})

module.exports = router;
