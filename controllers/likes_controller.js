const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try{

        // the post req which will come will be like this - likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type=='Post'){

            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
           
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            // user = user who is logged in
            user: req.user._id
        })

        // if a like already exists then delete it
        if(existingLike){

            // delete it from the likeable(Post or Comment) array also
            likeable.likes.pull(existingLike._id);
            likeable.save();
           
            existingLike.remove();
            deleted = true;

        }else{

            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            
            // push the newly created like into the likeable(Post or Comment) array
            likeable.likes.push(newLike._id);
            likeable.save();

        }

        // send this json response to toggle_likes.js
        return res.json(200,{
            message: "Request Successfull!",
            data: {
                deleted: deleted
            }
        });



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}