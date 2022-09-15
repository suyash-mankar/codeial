const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id  
                
            });  
            
            post.comments.push(comment); 
            post.save();

            await comment.populate('user');

            if(req.xhr){

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created!"
                });
            }



            req.flash('success', 'Comment published!');

            return res.redirect('/');   
        }
        
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }       
}


module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();
            // pull-out/delete the comment id from the list of comments (inbuilt function given by mongoose)0
            let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});


            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }


            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
            
        }else{

            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    

}