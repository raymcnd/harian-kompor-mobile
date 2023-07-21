const Controller = require('../controllers')
const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('Hello World!')
  })

router.get("/users", Controller.readUsers)
router.get("/users/:id", Controller.readUserById)
router.post("/users", Controller.createUser)
router.delete("/users/:id", Controller.deleteUser)


module.exports = router