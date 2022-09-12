const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.home = function(req, res){

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('error in finding posts from db');
    //         return;
    //     }

    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
            
   
    

    // Populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        // further populate
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log('error in finding posts from db');
            return;
        }

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

}





