// Model file
const mongoose = require('mongoose');

let posts = [];


const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', postSchema);

module.exports = {
    getAllPosts: () => posts
}