// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require("../controllers/userController");

router.post('/users/:id/posts', postController.createPost);
router.post('/posts/:post_id/like', postController.likePost);
router.delete('/posts/:post_id', postController.deletePost);
router.get('/', postController.getAllPosts);

module.exports = router;

