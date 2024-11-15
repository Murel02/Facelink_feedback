// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users/:id/posts', userController.getUserPosts);
router.get('/login', userController.login);
router.get('/', userController.getAllPosts);

module.exports = router;

