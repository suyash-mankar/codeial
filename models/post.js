const { json } = require('express');
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        reuired: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;