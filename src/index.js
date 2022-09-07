const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/login')
dotenv.config()
const PORT = process.env.PORT || 80

const bodyParser = require('body-parser')
const whiteList = ['http://localhost:3000/', 'https://blog.portfolio-f01.pages.dev/', 'https://portfolio-f01.pages.dev/']
const app = express()
app.use(bodyParser.json())

app.use(cors({origin: '*'}))


app.use(postsRouter)
app.use(authRouter)

app.get('/', (_req, res) => {
  console.log(_req.get('host'))
    res.send('Hola Mundo')
})

app.post('/test', (req, _res) =>{
  console.log(req.get('host'))
  console.log(req.get('origin'))
  _res.end()
})


app.get('/', postsRouter)
app.post('/', cors(), authRouter)
app.listen(PORT, (_req, _res)=>{
    console.log('Server Started')
})