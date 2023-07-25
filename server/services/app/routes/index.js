const express = require('express')
const router = express.Router()
const Controller = require("../controllers")
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routing CMS
router.post("/register", authentication, Controller.registerAdmin);
router.post("/login", Controller.loginAdmin);

router.get("/posts", authentication, Controller.readPosts);
router.post("/posts", authentication, Controller.addPost);
router.get("/posts/:id", authentication, Controller.readPostById);
router.put("/posts/:id", authentication, Controller.editPost);
router.delete("/posts/:id", authentication, Controller.deletePost);
router.get("/categories", authentication, Controller.readCategories);
router.post("/categories", authentication, Controller.addCategory);
router.get("/categories/:id", authentication, Controller.readCategoryById);
router.put("/categories/:id", authentication, Controller.editCategory);
router.delete("/categories/:id", authentication, Controller.deleteCategory);

// Routing Client User
router.get("/pub/posts", Controller.readPosts);
router.get("/pub/posts/:id", Controller.readPostById);
router.post("/pub/posts", Controller.addPost);
router.put("/pub/posts/:id", Controller.editPost);
router.delete("/pub/posts/:id", Controller.deletePost);

module.exports = router