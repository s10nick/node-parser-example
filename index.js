const 
  express = require('express'),
  app = express(),
  parser = require('body-parser'),
  logger = require('morgan'),
  router = require('./router'),
  config = require('./config')

app.listen(config.port)
console.log(`running on ${config.port} port`)

app.use(express.static(__dirname + '/public'))
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(logger('dev'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost')
  res.header('Access-Control-Allow-Methods', 'GET, POST')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

router(app)
