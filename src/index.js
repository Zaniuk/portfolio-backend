const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/login')
dotenv.config()
const PORT = process.env.PORT || 80

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.use(postsRouter)
app.use(authRouter)

app.get('/', (_req, res) => {
    res.send('Hola Mundo')
})
app.get('/', postsRouter)
app.get('/', authRouter)
app.listen(PORT, (_req, _res)=>{
    console.log('Server Started')
})