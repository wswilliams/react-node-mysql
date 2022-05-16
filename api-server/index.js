const http = require('http')
const cors = require('cors')
const express = require('express')
const createDB = require('./create_data_base');
const status = require('http-status')
const sequelize = require('./src/database/database')
const app = express()
const routes = require('./src/routes/routes')

app.use(cors());

app.use(express.json())

app.use('/api', routes)

app.use((req, res, next) => {
  res.status.apply(status.NOT_FOUND).send("Page Not Found")
})

app.use((req, res, next) => {
  res.status.apply(status.INTERNAL_SERVER_ERROR).json({error})
})

sequelize.sync({force: true}).then(() => {
  const port = 3003
  app.set("port", port)
  const server = http.createServer(app)
  server.listen(port)
})
