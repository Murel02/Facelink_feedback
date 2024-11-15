// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/new', userController.createUser);
router.get('/users/:id/posts', userController.getUserPosts);
router.post('/login', userController.login);


module.exports = router;

