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
const whitelist = [
    'http://localhost',
    'http://localhost:3000',
    'https://portfolio-f01.pages.dev/',
    'https://blog.portfolio-f01.pages.dev/',
    'portfolio-backend-production-0477.up.railway.app',
    'http://localhost:3000/login'
]
app.use(cors({origin: whitelist}))


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