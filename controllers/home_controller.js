const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.home = async function(req, res){
       
    try{
        // Populate the user of each post
        let posts = await Post.find({})
        // to display the latest post at top after refreshing
        .sort('-createdAt')
        .populate('user')
        // Also populate the likes of each post and comment
        .populate({
            path: 'comments',
            // further populate
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        for(let post of posts){
            post.comments.sort(function (a, b) {
                return b.createdAt - a.createdAt;
            })
        }

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }

}





