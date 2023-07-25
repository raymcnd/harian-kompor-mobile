const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')
const router = require('./routes')
const {mongoConnect} = require('./config/mongoConnect')
const errorHandler = require('./middlewares/errorHandler')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.use(errorHandler)

mongoConnect()
    .then((db) => {
        // console.log(db, "<<<< db")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    })
