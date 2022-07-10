const express = require('express')
const dotenv = require('dotenv')
const postsRouter = require('./routes/posts')
dotenv.config()
const connectionUrl = process.env.CONNECTION_URL

const bodyParser = require('body-parser')
const app = express()
app.use(postsRouter)

app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/', (_req, res) => {
    res.send('Hola Mundo')
})
app.get('/', postsRouter)

app.listen(80, (_req, _res)=>{
    console.log('Server Started')
})