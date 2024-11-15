// controllers/postController.js
const Post = require('../models/post');
const User = require('../models/user');

let userLikes = [];

// Tilføjer en ny post til en bruger
exports.createPost = async (req, res) => {
    try {
        const post = new Post({ ...req.body, user_id: req.params.id });
        await post.save();
        await User.findByIdAndUpdate(req.params.id, { $push: { posts: post._id } });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        const userId = req.user.id;

        const likeIndex = post.userLikes.indexOf(userId);

        if (likeIndex === -1) {
            post.userLikes.push(userId);
            post.likes += 1;
        } else {
            post.userLikes.splice(likeIndex, 1);
            post.likes -= 1;
        }

        await post.save();

    } catch (error) {
        res.status(500).send('Error liking post: ', error);
        console.error('Error liking post')
    }
};


// Sletter en bestemt post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.post_id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

