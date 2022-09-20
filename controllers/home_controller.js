const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const Friendship = require('../models/friendship');
const { post } = require('../routes');

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


        if(req.user){

            let signedIn_user = await req.user.populate('friendships');

            for(let friendship of signedIn_user.friendships){
                await friendship.populate('to_user')
                await friendship.populate('from_user')
            }

            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users,
                signedIn_user: signedIn_user
            });
        }


        else{
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users,
            });
        }
        

    }catch(err){
        console.log('Error', err);
        return;
    }

}





