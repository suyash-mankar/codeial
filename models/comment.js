const { text } = require('express');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }

}, {
    timestamps: true
});

// Tell mongoose this is a model/ this is going to be a collection
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;