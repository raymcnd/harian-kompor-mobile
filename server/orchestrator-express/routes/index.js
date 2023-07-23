const router = require('express').Router()
const redis = require('../config/redisConfig')
const Controller = require('../controllers')

router.get('/', async (req, res) => {
    console.log(await redis.keys("*"))
    res.send('Hello World!')
})

router.get("/posts", Controller.readPosts);
router.get("/posts/:id", Controller.readPostById);

router.get("/users", Controller.readUsers);
router.get("/users/:id", Controller.readUserById)
router.post("/users", Controller.createUser)
router.delete("/users/:id", Controller.deleteUser)


module.exports = router