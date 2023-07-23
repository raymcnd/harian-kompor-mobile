const express = require('express')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})