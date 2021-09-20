const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const path = require('path')
const HttpErrors = require('./config/errors.config')
const UserRoutes = require('./routes/users.routes')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(compression())
app.use(cors())
app.use(helmet())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/users', UserRoutes)

app.get('*', (req, res) => {
  res.status(200).send('Server is running.');
})

app.use(() => {
  throw new HttpErrors('Could not find this route.', 404)
})

const uri = process.env.ATLAS_URI
const port = process.env.PORT
const dbName = process.env.DATABASE

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: dbName
}

mongoose.connect(uri, options).then(() => {
  app.listen(port)
  console.log(`Server is running on port: ${port}`)
}).catch((error) => {
  console.error(error)
})
