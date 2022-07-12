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
var whitelist = ['https://blog.portfolio-f01.pages.dev/', 'https://portfolio-f01.pages.dev/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))


app.use(postsRouter)
app.use(authRouter)

app.get('/', (_req, res) => {
    res.send('Hola Mundo')
})
app.get('/', postsRouter)
app.post('/', authRouter)
app.listen(PORT, (_req, _res)=>{
    console.log('Server Started')
})