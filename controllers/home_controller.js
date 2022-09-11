const Post = require('../models/post');

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
    Post.find({}).populate('user').exec(function(err, posts){
        if(err){
            console.log('error in finding posts from db');
            return;
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    })

}





